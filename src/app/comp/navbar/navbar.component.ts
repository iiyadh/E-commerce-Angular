import {Component, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule,CommonModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isAdmin?:boolean;

  constructor (private authService :AuthService,private router :Router){}
  ngOnInit(): void {
    this.isAdmin = this.authService.isAuthenticatedASAdmin();
  }

  logout():void{
    this.authService.logout();
    this.router.navigate(['/'])
  }
  


}
