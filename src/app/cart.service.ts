import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private data = [
    {
      category: 'Apple',
      products: [
        { id:0, name: 'Red-Delicious', price: '8', photo: '/assets/images/test/Fruit/Apple/Red-Delicious/Red-Delicious_016.jpg'},
        { id:1, name: 'Pink-Lady', price: '8', photo: '/assets/images/test/Fruit/Apple/Pink-Lady/Pink-Lady_034.jpg'},
        { id:2, name: 'Granny-Smith', price: '8', photo: '/assets/images/test/Fruit/Apple/Granny-Smith/Granny-Smith_038.jpg'},
        { id:3, name: 'Golden-Delicious', price: '8', photo: '/assets/images/test/Fruit/Apple/Golden-Delicious/Golden-Delicious_029.jpg'},
      ]
    },
    {
      category: 'Carrot',
      products: [
        { id:4, name: 'Carrot', price: '8', photo: '/assets/images/test/Vegetables/Carrots/Carrots_016.jpg'},
        { id:5, name: 'Carrot', price: '8', photo: '/assets/images/test/Vegetables/Carrots/Carrots_042.jpg'},
        { id:6, name: 'Carrot', price: '8', photo: '/assets/images/test/Vegetables/Carrots/Carrots_033.jpg'},
        { id:7, name: 'Carrot', price: '8', photo: '/assets/images/test/Vegetables/Carrots/Carrots_019.jpg'},
      ]
    },
    {
      category: 'Pineapple',
      products: [
        { id:8, price: '8', photo: '/assets/images/test/Fruit/Pineapple/Pineapple_007.jpg'},
        { id:9, price: '8', photo: '/assets/images/test/Fruit/Pineapple/Pineapple_008.jpg'},
        { id:10, price: '8', photo: '/assets/images/test/Fruit/Pineapple/Pineapple_010.jpg'},
        { id:11, price: '8', photo: '/assets/images/test/Fruit/Pineapple/Pineapple_011.jpg'},
      ]
    },
    {
      category: 'Banana',
      products: [
        { id:12, price: '8', photo: '/assets/images/test/Fruit/Banana/Banana_034.jpg'},
        { id:13, price: '8', photo: '/assets/images/test/Fruit/Banana/Banana_035.jpg'},
        { id:14, price: '8', photo: '/assets/images/test/Fruit/Banana/Banana_038.jpg'},
        { id:15, price: '8', photo: '/assets/images/test/Fruit/Banana/Banana_039.jpg'},
      ]
    },
    {
      category: 'Drinks',
      products: [
        { id:16, name: 'Alpro Milk', price: '12', photo: '/assets/images/iconic/Alpro-Fresh-Soy-Milk_Iconic.jpg'},
        { id:17, name: 'Arla Milk', price: '10', photo: '/assets/images/iconic/Arla-Standard-Milk_Iconic.jpg'},
        { id:18, name: 'Oatly Milk', price: '10', photo: '/assets/images/iconic/Oatly-Natural-Oatghurt_Iconic.jpg'},
      ]
    }
    
  ]

  private cart = []; 

  constructor() { }

  getProducts() {
    return this.data;

  }

  getCart() {
    return this.cart;
  }

  addProducts(product) {
    this.cart.push(product);
  }

}
