type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  creationAt: string;
};

type Category = {
  id: number;
  name: string;
  image: string;
};

type Image = Array<string>;

type ProductDetailResponse = Product & {
  category: Category;
  images: Image;
};

type ProductList = Array<Product>;

type ProductListReponse = ProductList;

type CreateProductRequest = {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: Image;
};

type UpdateProductRequest = CreateProductRequest & {
  id: number;
};
