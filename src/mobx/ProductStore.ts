// stores/ProductStore.ts

import { Product } from "@/api/product/interfaces";
import { productsItems } from "@/util";
import { autorun, makeAutoObservable, toJS } from "mobx";

class ProductStore {
  chosenProduct: Product | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setChosenProduct(product: Product) {
    this.chosenProduct = product;
  }

  clearChosenProduct() {
    this.chosenProduct = null;
  }
}

// autorun(() => {
//   console.log(toJS(productStore.products));
// });
const productStore = new ProductStore();
export default productStore;
