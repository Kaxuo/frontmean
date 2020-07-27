import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';
import { HttpResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private webService: WebRequestService,
    private router: Router,
    private http: HttpClient
  ) {}

  login(email: string, password: string) {
    return this.webService.login(email, password).pipe(
      // We don't want multiple subscribers , we don't want to run the login multiple times
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // The auth token will be in the header of this response
        this.setSession(
          res.body._id,
          res.headers.get('x-access-token'),
          res.headers.get('x-refresh-token')
        );
        console.log('logged in');
      })
    );
  }

  signup(email: string, password: string) {
    return this.webService.signup(email, password).pipe(
      // We don't want multiple subscribers , we don't want to run the login multiple times
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // The auth token will be in the header of this response
        this.setSession(
          res.body._id,
          res.headers.get('x-access-token'),
          res.headers.get('x-refresh-token')
        );
        console.log('Successfully signed up and logged in');
      })
    );
  }

  logout() {
    this.removeSession();
    // call this method when we get the 401 error ( Unauthorized)
    this.router.navigate(['/signup']);
  }

  // Tokens ///
  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  getUserId() {
    return localStorage.getItem('user-id');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken);
  }

  //////////

  private setSession(
    userId: string,
    accessToken: string,
    refreshToken: string
  ) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }

  getNewAccessToken() {
    // Save the user id and the refreshtoken, like in POstman and send to that link below
    return this.http
      .get(`${this.webService.ROOT_URL}/users/me/access-token`, {
        headers: {
          'x-refresh-Token': this.getRefreshToken(),
          _id: this.getUserId(),
        },
        observe: 'response',
      })
      .pipe(
        tap((res: HttpResponse<any>) => {
          this.setAccessToken(res.headers.get('x-access-token'));
        })
      );
  }
}
