import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['title', 'price', 'quantity', 'total', 'action'];
  cartItems:any[] = [];
  totalPrice: number = 0;
  Uid?:string;

  constructor(private cartService: CartService,private orderService :OrderService) {}



  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotals();
  }

  calculateTotals(): void {
    this.totalPrice = this.cartService.calculateTotalPrice();
  }

  updateQuantity(product: any, change: number): void {
    this.cartService.updateQuantity(product, change);
    this.calculateTotals();
  }

  confirmOrder(): void {
    if (typeof window !== 'undefined') {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        try {
          const decodedToken = JSON.parse(atob(authToken));
          this.Uid = decodedToken.id;
        } catch (error) {
          console.error('Invalid token:', error);
        }
      }
    }
    const orderDetails: any = {
      id: this.generateRandomId(32),
      userId: this.Uid ,
      products: this.cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        Qte: item.quantity,
      })),
    };
  
    this.orderService.confirmeOrder(orderDetails).subscribe(
      (response) => {
        console.log('Order confirmed:', response);
        alert('Order confirmed! Thank you for your purchase.');
        this.cartItems = [];
        this.cartService.clearCart();
        this.calculateTotals();
      },
      (error) => {
        console.error('Order confirmation failed:', error);
        alert('There was an error confirming your order. Please try again.');
      }
    );
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

  removeProduct(product: any): void {
    this.cartService.removeProduct(product)
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotals();
  }
}
