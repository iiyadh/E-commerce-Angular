import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems:any[] = [];

  constructor() {}

  getCartItems() {
    return this.cartItems;
  }

  addProduct(product: any) {
    const item = this.cartItems.find((item) => item.id === product.id);
    if (!item) {
      this.cartItems.push(product);
    }
  }

  updateQuantity(product: any, change: number) {
    const item = this.cartItems.find((item) => item.id === product.id);
    if (item) {
      item.quantity = Math.max(1, item.quantity + change);
    }
  }

  removeProduct(product: any) {
    this.cartItems = this.cartItems.filter((item) => item.id !== product.id);
  }

  calculateTotalPrice() {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  clearCart():void{
    this.cartItems = [];
  }
}
