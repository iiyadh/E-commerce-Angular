import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {OrderDetailComponent} from './order-detail/order-detail.component'

interface User {
  id: string;
  name: string;
  email: string;
  isBlocked: boolean;
  isAdmin: boolean;
}


export interface Order {
  id: string;
  userId: string;
  products: {
    id: string;
    title: string;
    price: number;
    Qte: number;
  }[];
}


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    OrderDetailComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  @ViewChild(OrderDetailComponent) OrderDetailComponent!: OrderDetailComponent;
  
  displayedColumns: string[] = ['id', 'title', 'price', 'category', 'actions'];
  displayedUserColumns: string[] = ['id', 'name', 'email', 'actions'];
  displayedOrderColumns: string[] = ['id', 'userId', 'products', 'actions'];

  products: any[] = [];
  users: User[] = [];
  orders: Order[] = [];
  ManagmentState: string = 'Products';

  constructor(
    private productService: ProductService,
    private router: Router,
    private userService: UserService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });

    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });

    this.orderService.getOrders().subscribe((data) => {
      this.orders = data;
    });
  }

  editProduct(id: string): void {
    this.router.navigate([`/editProduct/${id}`]);
  }

  deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.products = this.products.filter(product => product.id !== id);
      });
    }
  }
  addProduct(): void {
    this.router.navigate(['/addprod']);
  }

  blockUser(id: string, user: any): void {
    this.userService.blockUser(id, user).subscribe({
      next: (updatedUser) => {
        console.log('User blocked/unblocked:', updatedUser);
      },
      error: (err) => {
        console.error('Error blocking user:', err);
      }
    });
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(users => users.id !== id);
      },
      error: (err) => {
        console.error('Error deleting user:', err);
      }
    });
  }

  shipOrder(id: string): void {
    this.orderService.shipOrder(id).subscribe({
      next: (order) => {
        console.log('Order shipped:', order);
      },
      error: (err) => {
        console.error('Error shipping order:', err);
      }
    });
  }

  deleteOrder(id: string): void {
    this.orderService.deleteOrder(id).subscribe({
      next: () => {
        this.orders = this.orders.filter(order => order.id !== id);
      },
      error: (err) => {
        console.error('Error deleting order:', err);
      }
    });
  }

  openOrderDetails(order: Order): void {
    this.OrderDetailComponent.openPopup(order);
  }

  ChangeState(state: string): void {
    this.ManagmentState = state;
  }
}
