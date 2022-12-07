import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';
import {
  ActionEvent,
  AppDataState,
  DataStateEnum,
  ProductActionsTypes,
} from '../../state/product.state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  // products: Product[] | null = null;
  // products$: Observable<Product[]> | null = null;
  products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onGetAllProducts() {
    // this.productsService.getAllProducts().subscribe(
    //   (data) => {
    //     this.products = data;
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );

    // this.products$ = this.productsService.getAllProducts();

    this.products$ = this.productsService.getAllProducts().pipe(
      map((data) => {
        console.log(data);
        return { dataState: DataStateEnum.LOADED, data: data };
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }

  onGetSelectedProducts() {
    this.products$ = this.productsService.getSelectedProduct().pipe(
      map((data) => {
        console.log(data);
        return { dataState: DataStateEnum.LOADED, data: data };
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }

  onGetAvailableProducts() {
    this.products$ = this.productsService.getAvailableProducts().pipe(
      map((data) => {
        console.log(data);
        return { dataState: DataStateEnum.LOADED, data: data };
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }

  onSearch(dataForm: any) {
    this.products$ = this.productsService.searchProducts(dataForm.keyword).pipe(
      map((data) => {
        return { dataState: DataStateEnum.LOADED, data: data };
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({ DataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }

  onSelect(p: Product) {
    this.productsService.select(p).subscribe((data) => {
      p.selected = data.selected;
    });
  }

  onDelete(p: Product) {
    let v = confirm('Etes vous sure?');
    if (v == true)
      this.productsService.deleteProduct(p).subscribe((data) => {
        this.onGetAllProducts();
      });
  }

  onNewProduct() {
    this.router.navigateByUrl('/newProduct');
  }

  onEdit(p: Product) {
    this.router.navigateByUrl('/editProduct/' + p.id);
  }

  onActionEvent($event: ActionEvent) {
    // console.log($event);
    // if ($event == 'ALL_PRODUCTS') {
    //   this.onGetAllProducts();
    // }
    switch ($event.type) {
      case ProductActionsTypes.GET_ALL_PRODUCTS:
        this.onGetAllProducts();
        break;

      case ProductActionsTypes.GET_SELECTED_PRODUCTS:
        this.onGetSelectedProducts();
        break;

      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS:
        this.onGetAvailableProducts();
        break;

      case ProductActionsTypes.SEARCH_PRODUCTS:
        this.onSearch($event.payload);
        break;

      case ProductActionsTypes.NEW_PRODUCT:
        this.onNewProduct();
        break;

      case ProductActionsTypes.SELECT_PRODUCT:
        this.onSelect($event.payload);
        break;

      case ProductActionsTypes.DELETE_PRODUCT:
        this.onDelete($event.payload);
        break;

      case ProductActionsTypes.EDIT_PRODUCT:
        this.onEdit($event.payload);
        break;
    }
  }
}
