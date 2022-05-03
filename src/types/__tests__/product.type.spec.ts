import Product from "../product.type";

const newProduct: Product = {
    id: 'product_id',
    name: 'product_name',
    price: 19.99,
    category: 'product_category'
};

describe('Product Type Suite', () => {
    it(`checks product's price to be $19.99`, () => {
        expect(newProduct.price).toBe(19.99);
    });

    it(`checks product's category to be "product_category"`, () => {
        expect(newProduct.category).toBe('product_category');
    });
});
