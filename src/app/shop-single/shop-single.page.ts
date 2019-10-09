import { Component, OnInit } from '@angular/core';
import { CartService } from './../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-single',
  templateUrl: './shop-single.page.html',
  styleUrls: ['./shop-single.page.scss'],
})
export class ShopSinglePage implements OnInit {
  cart = [];
  items = [];

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.items = this.cartService.getProducts();
  }

  sliderConfig = {
    spaceBetween:   1,
    // centeredSlides: true,
    slidesPerView: 2.4
  }

   

  addToCart(product) {
    this.cartService.addProducts(product);
  }

  openCart() {
    this.router.navigate(['cart']);
    }
}
