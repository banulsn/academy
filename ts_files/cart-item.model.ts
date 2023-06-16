import { Category } from "./cart-category.model";
import { v4 as uuidv4 } from 'uuid';

export class CartItem { 
  uuid: string;
  name: string;
  category: Category;
  price: number;
  discount: number;
  priceAfterDiscount: number;

  // Typescript => handbook
  // UtilityTypes => Partial<CartItem> 
  // <T> => typ generyczny 
  // nie podawaj uuid w constructorze
  // constructor(arg1, arg2, arg3...)
  // type CartParams = {name, price}
  constructor(name: string, price: number, discount?: number, category?: Category) {
    this.uuid = uuidv4();
    this.name = name;
    this.price = price;
    this.discount = discount ? discount : 0;
    this.category = category ? category : Category.other;
    this.priceAfterDiscount = this.getPriceAfterDiscount();
  }

  getPriceAfterDiscount?() {
    if (this.price > 0 && this.discount > 0) {
      return this.price - (this.price*(this.discount === 0 ? 100 : this.discount/100));
    } else return 0;
  }

  setProductCategory?(category: Category) {
    this.category = category;
  }

  setProductName?(name: string) {
    this.name = name;
  }

  setProductPrice?(price: number) {
    this.price = price
  }
  
  setProductDiscount?(discount: number) {
    this.discount = discount
  }

  // Ma miec: Nazwę, Kategorię, Cenę, Rabat % na przedmiot, uuid
  // Ma umożliwiać: 
  // - określać jego rabat procentowy
  // - dodawać produkt do kategorii
  // - zmianę nazwy, ceny lub rabatu
}
