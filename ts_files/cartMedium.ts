export class CartItem { 
  uuid?: number;
  name?: string;
  category?: Category;
  price?: number;
  discount?: number;
  priceAfterDiscount?: number;

  private static uuidBaseNumber = 0;

  constructor(params: CartItem = {}) {
    this.uuid = params.uuid ? params.uuid : CartItem.uuidBaseNumber++;
    this.name = params.name ? params.name : 'Brak nazwy';
    this.category = params.category ? params.category : Category.other;
    this.price = params.price ? params.price : 0;
    this.discount = params.discount ? params.discount : 0;
    this.priceAfterDiscount = params.priceAfterDiscount ? params.priceAfterDiscount : this.getPriceAfterDiscount();
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

export class Cart { 
  uuid?: number;
  items?: CartItem[];
  discount?: number;
  discountCode?: string;

  private static uuidBaseNumber = 0;

  constructor(params: Cart = {}) {
    this.uuid = params.uuid ? params.uuid : Cart.uuidBaseNumber++;
    this.items = params.items ? params.items : [];
    this.discount = params.discount ? params.discount : 0;
    this.discountCode = params.discountCode ? params.discountCode : '';
  }

  addProductToCart? = (product: CartItem) => {
    this.items.push(new CartItem(product));
  }

  removeProductFromoCart? = (productUuid: number) => {
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

export enum Category {
  food = 'food',
  chemistry = 'chemistry',
  clothes = 'clothes',
  magazines = 'magazines',
  cars = 'cars',
  other = 'other'
}