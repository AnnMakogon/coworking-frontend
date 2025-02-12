import { AuthService } from '../../../services/auth-service.service';
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
  ) {
    this.credentialLogin = new CredentialLogin();
  }

  ngOnInit(): void {
    sessionStorage.removeItem("0");
    console.log("Start");
  }

  onLogin() {
    this.authService.loginCredential(this.credentialLogin.email, this.credentialLogin.password).subscribe(
      response => {
        console.log('Login successful!', response.token);
        localStorage.setItem('jwt', response.token);
        sessionStorage.setItem("0", JSON.stringify(response));
        console.log(response.role);
        this.router.navigate(['map/myWorkspaces']);
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }

}
