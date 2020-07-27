import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, empty, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WebRequestInterceptorService {

  constructor(private authService: AuthService, private router:Router) {}

  refreshingAccessToken: boolean;

  //Optional cause no issues without it
  accessTokenRefreshed: Subject<any> = new Subject()

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
      // Handle the request ==> When you login , you add the access token to the headers thanks to addAuthHeader
    request = this.addAuthHeader(request);

    // call next() and handle the response
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);

        if (error.status === 401) {
          // 401 error so we are unauthorized

          // refresh the access token
          return this.refreshAccessToken()
            .pipe(
              switchMap(() => {
                request = this.addAuthHeader(request);
                return next.handle(request);
              }),
              catchError((err: any) => {
                console.log(err);
                this.authService.logout();
                return empty();
              })
            )
        }
        if (error.status === 400) {
          this.router.navigate(['/wrong'])
        }
        return throwError(error);
      })
    )
  }

  refreshAccessToken() {
    if (this.refreshingAccessToken) {
      return new Observable(observer => {
        this.accessTokenRefreshed.subscribe(() => {
          // this code will run when the access token has been refreshed
          observer.next();
          observer.complete();
        })
      })
    } else {
      this.refreshingAccessToken = true;
      // we want to call a method in the auth service to send a request to refresh the access token
      return this.authService.getNewAccessToken().pipe(
        tap(() => {
          console.log("Access Token Refreshed!");
          this.refreshingAccessToken = false;
          this.accessTokenRefreshed.next();
        })
      )
    }
    
  }

  addAuthHeader(request: HttpRequest<any>) {
    // Get the access token , if you don't, then you will get the accessToken but won't save them in the headers
    const token = this.authService.getAccessToken();
    if (token) {
      // Append the access token to the request header
      return request.clone({
        setHeaders: {
          'x-access-token': token,
        },
      });
    }
    return request;
  }
}
