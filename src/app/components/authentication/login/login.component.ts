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
export class LoginComponent implements OnInit {

  title = "Login";

  credentialLogin: CredentialLogin;

  constructor(private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ){
    this.credentialLogin = new CredentialLogin();
  }

  ngOnInit(): void {
    sessionStorage.removeItem("0");
    console.log("Start");
  }

  /*login(): void {
    this.credentialLogin.email.trim();
    this.credentialLogin.password.trim();

    this.authService.loginCredential(this.credentialLogin.email, this.credentialLogin.password).subscribe((result: CredentialLogin) => {
      sessionStorage.setItem("0", JSON.stringify(result));
      this.router.navigate(['map']);
    });
  }*/

  getProtectedData() {  //переход к карте
    this.authService.getProtectedResource().subscribe(
      data => {
        console.log('Protected data:', data);
      },
      error => {
        console.error('Error fetching protected data', error);
      }
    );
  }
  onLogin() {
    this.authService.loginCredential(this.credentialLogin.email, this.credentialLogin.password).subscribe(
      response => {
        console.log('Login successful!', response.token);
        localStorage.setItem('jwt', response.token);
        console.log(localStorage.getItem('jwt'));
        this.authService.getProtectedResource().subscribe(
          response => {
            console.log('response workspaceGet: ' + response);
            this.router.navigate(['map']);
          },
          error => {
            console.error('Login failed', error);
          }
        );
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }

}
