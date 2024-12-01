import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { RouterLink } from '@angular/router';

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  imgURL: string;
}

@Component({
  selector: 'app-editprod',
  standalone:true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './editprod.component.html',
  styleUrl: './editprod.component.scss'
})
export class EditprodComponent {
  
  product: Product = {
    id: '',
    title: '',
    price: 0.00,
    description: '',
    category: '',
    imgURL: ''
  };

  constructor(
    private route: ActivatedRoute,
    private prodService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.prodService.getProductDetails(productId).subscribe({
        next: (data) => {this.product = data;},
        error: (err) => console.error('Error fetching product details:', err)
      });
    }
  }

  handleEditProduct(): void {
    this.prodService.editProduct(this.product.id, this.product).subscribe({
      next: () => {
        console.log('Product updated successfully');
        this.router.navigateByUrl('/dashboard')
      },
      error: (err) => console.error('Error updating product:', err)
    });
  }

}
