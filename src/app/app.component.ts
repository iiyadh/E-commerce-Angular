import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './comp/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,NavbarComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showNavbar: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Subscribe to route changes to dynamically check the current route
    this.router.events.subscribe(() => {
      this.showNavbar = this.router.url !== '/';
    });
  }
}
