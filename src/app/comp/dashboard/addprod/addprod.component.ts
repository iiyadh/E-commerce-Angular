import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { RouterLink,Router } from '@angular/router';

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  imgURL: string;
}

@Component({
  selector: 'app-addprod',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './addprod.component.html',
  styleUrls: ['./addprod.component.scss']
})
export class AddprodComponent {

  prod: Product = {
    id: this.generateRandomId(),
    title: '',
    price: 0.00,
    description: '',
    category: '',
    imgURL: ''
  };

  constructor(private prodService: ProductService,private router :Router) {}

  generateRandomId(length: number = 16): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  handleAddprod(event: Event): void {
    event.preventDefault();
    this.prodService.addProduct(this.prod).subscribe({
      next: (response) => {
        console.log('Product added successfully:', response);
        this.prod = {
          id: '',
          title: '',
          price: 0.00,
          description: '',
          category: '',
          imgURL: ''
        };
        this.router.navigateByUrl('/dashboard')
      },
      error: (err) => {
        console.error('Error adding product:', err);
      }
    });
  }
}

