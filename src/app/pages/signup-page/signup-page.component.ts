import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { WebRequestInterceptorService } from '../../services/web-request-interceptor.service'

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  constructor(private authService: AuthService, private router:Router, private message : WebRequestInterceptorService) { }

  ngOnInit(): void {
    if (localStorage.getItem("x-access-token")){
      this.router.navigate(['/lists'])
    }
  }

  onSignupButtonClicked(email:string,password:string){
    console.log(this.message.message)
    this.authService.signup(email,password).subscribe((res:HttpResponse<any>) => {
      console.log(res)
      this.router.navigate(['/lists'])
    })

  }
}
