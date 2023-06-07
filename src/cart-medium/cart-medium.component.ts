import { Component } from '@angular/core';
import { Cart, CartItem, Category } from "../../ts_files/cartMedium";

@Component({
  selector: 'cart-medium',
  templateUrl: './cart-medium.component.html',
  styleUrls: ['./cart-medium.component.scss']
})
export class CartMediumComponent {

  cart: Cart = new Cart();

  addProduct() {
    this.cart.addProductToCart({name: 'chleb', category: Category.food, price: 50, discount: 2});
  }

  removeProduct() {
    this.cart.removeProductFromoCart(2);
  }

}
