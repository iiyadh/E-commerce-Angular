import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FilterComponent } from '../filter/filter.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, RouterLink,FilterComponent],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  constructor(private prodService: ProductService,private cartService :CartService) {}

  addToCart(prod: any) {
    this.cartService.addProduct({id : prod.id ,title : prod.title , price : prod.price , quantity : 1});
  }


  products: any[] = [];
  filteredProducts: any[] = [];


  ngOnInit(): void {
    this.prodService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
      complete: () => {
        console.log('Product retrieval completed.');
      }
    });
  }

  onFilterChange(filter: { min: number; max: number }) {
    this.filteredProducts = this.products.filter(
      (product) =>
        product.price >= filter.min && product.price <= filter.max
    );
  }
}
