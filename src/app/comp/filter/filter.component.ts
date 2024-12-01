import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {


  @Output() filterChange = new EventEmitter<{ min: number; max: number }>();
  minPrice: number = 0;
  maxPrice: number = 1000;

  applyFilter() {
    this.filterChange.emit({ min: this.minPrice, max: this.maxPrice });
  }
}
