import { AuthService } from './../../../services/auth-service/auth-service.service';
import { Component, Injectable, OnInit } from '@angular/core';
import { CredentialLogin } from 'src/app/dto/CredentialLogin';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  title = "Login";

  credentialLogin: CredentialLogin;

  constructor(private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ){
    this.credentialLogin = new CredentialLogin();
  }

  login(): void {
    this.credentialLogin.email.trim();
    this.credentialLogin.password.trim();

    this.authService.loginCredential(this.credentialLogin.email, this.credentialLogin.password).subscribe((result: CredentialLogin) => {
      sessionStorage.setItem("0", JSON.stringify(result));
      this.router.navigate(['map']);
    });
  }

}
