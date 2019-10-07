import { Component, OnInit } from '@angular/core';
import { CartService } from './../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-single',
  templateUrl: './shop-single.page.html',
  styleUrls: ['./shop-single.page.scss'],
})
export class ShopSinglePage implements OnInit {

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.items = this.cartService.getProducts();
  }

  sliderConfig = {
    spaceBetween:   10,
    centeredSlides: true,
    slidesPerView: 1.6 
  }

  cart = [];
  items = []; 
}
