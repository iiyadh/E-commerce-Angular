import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Order } from '../dashboard.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent {
  @Input() order: Order | null = null;
  @Output() close: EventEmitter<void> = new EventEmitter(); 

  isVisible: boolean = false;

  openPopup(order: Order): void {
    this.order = order;
    this.isVisible = true;
  }

  closePopup(): void {
    this.isVisible = false;
    this.close.emit();
  }
}

