export interface Item {
  img: {
    desktop: string;
    mobile: string;
    thumbnail: string;
    tablet: string;
  };
  quantity: number;
  price: number;
  name: string;
  category: string;
  selected: boolean;
}
