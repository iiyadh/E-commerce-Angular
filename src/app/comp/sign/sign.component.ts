import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { error } from 'console';

interface FormDataSignIn {
  email: string;
  password: string;
}

interface FormDataSignUp extends FormDataSignIn {
  name: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-sign',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, CommonModule, MatSelectModule, FormsModule],
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent implements OnInit{

  constructor(private authService: AuthService,private router :Router) {}


  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/product']);
    }
  }

  // Login form
  formDataSignIn: FormDataSignIn = {
    email: '',
    password: '',
  };

  handleLogin(event: Event) {
    event.preventDefault();
    this.authService.login(this.formDataSignIn.email, this.formDataSignIn.password).subscribe({
      next: (isAuthenticated) => {
        if (isAuthenticated) {
          console.log('Login successful!');
          this.router.navigate(['/product']);
        } else {
          alert('Invalid email or password');
        }
      },
      error: (err) => {
        console.error('Error during login:', err);
        alert('Something went wrong. Please try again.');
      }
    });
  }

  // Sign-up form
  formDataSignUp: FormDataSignUp = {
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  };

  handleCreateAccount(event: Event) {
    event.preventDefault();
    if (this.formDataSignUp.password !== this.formDataSignUp.confirmPassword) {
      alert("Password Not Match");
      return;
    }

    this.authService.register(this.formDataSignUp.name, this.formDataSignUp.email, this.formDataSignUp.password).subscribe(
      {
        next: (response) => {
        console.log('Product added successfully:', response);
        this.toggleForm();
        },
        error : (error)=>{
          alert('Email Exist');
        }
    });
  }

  // Slide Forms
  slideLeft = false;
  toggleForm() {
    this.slideLeft = !this.slideLeft;
  }


  generateRandomId(length: number = 16): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

}
