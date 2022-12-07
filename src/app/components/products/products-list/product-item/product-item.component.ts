import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ActionEvent, ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product?: Product;
  // @Output() producteventEmitter: EventEmitter<ActionEvent> =
  //   new EventEmitter<ActionEvent>();

  @Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onSelect(product: Product) {
    this.productEventEmitter.emit({
      type: ProductActionsTypes.SELECT_PRODUCT,
      payload: product,
    });
  }

  onDelete(product: Product) {
    this.productEventEmitter.emit({
      type: ProductActionsTypes.DELETE_PRODUCT,
      payload: product,
    });
  }

  onEdit(product: Product) {
    this.productEventEmitter.emit({
      type: ProductActionsTypes.EDIT_PRODUCT,
      payload: product,
    });
  }
}
