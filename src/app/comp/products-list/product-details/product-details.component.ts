import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private prodService: ProductService,private cartService :CartService) {}

  addToCart(prod: any) {
    this.cartService.addProduct({id : prod.id ,title : prod.title , price : prod.price , quantity : 1});
  }
  product: any = null;

 
  
  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.prodService.getProductDetails(productId).subscribe({
        next: (data) => {
          this.product = data;
        },
        error: (err) => {
          console.error('Error fetching product details:', err);
        },
        complete: () => {
          console.log('Product details fetched successfully');
        }
      });
    }
  }
}
