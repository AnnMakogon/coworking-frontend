import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private authService: AuthService,
     private router: Router) {}

     logout(): void {
      this.authService.logout().subscribe(() => {
        this.router.navigate(['/login']);
      })
     }

}
