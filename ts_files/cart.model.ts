import { CartItem } from "./cart-item.model";
import { v4 as uuidv4 } from 'uuid';

export class Cart { 
  uuid: string;
  items: CartItem[];
  discount: number;
  discountCode: string;

  constructor(items?, discount?, discountCode?) {
    this.uuid = uuidv4();
    this.items = items ? items : [];
    this.discount = discount ? discount : 0;
    this.discountCode = discountCode ? discountCode : '';
  }

  addProductToCart? = (product: Partial<CartItem>) => {
    this.items.push(new CartItem(product.name, product.price, product.discount, product.category));
  }

  removeProductFromoCart? = (productUuid: string) => {
    const index = this.items.findIndex(item => item.uuid === productUuid);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  totalPriceCountWithDiscount?() {
    return this.items.reduce((prev, cur) => {
      return prev + cur.priceAfterDiscount;
    }, 0);
  }

  // Ma mieć: uuid, listę wybranych przedmiotów, rabat % na koszyk, kod rabatowy
  // Ma umożliwiać: 
  // - dodawanie/usuwanie przedmiotów do/z koszyka
  // - zmianę ilości produktu w koszyku
  // - podliczać wartość koszyka uwzględniajac rabaty
}
