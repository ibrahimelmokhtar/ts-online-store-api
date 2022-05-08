import { DEFAULT_PRODUCT } from '../../constants/product.type.constant';
import { NIL as NIL_UUID } from 'uuid';
import Product from '../product.type';

const newProduct: Product = DEFAULT_PRODUCT;

export const productTypeSpecs = () => {
	describe('├─── Product Type Suite', () => {
		it('checks user`s ID to be "NIL_UUID"', () => {
			expect(newProduct.id).toBe(NIL_UUID);
		});

		it('checks product`s price to be $99.99', () => {
			expect(newProduct.price).toBe(99.99);
		});

		it('checks product`s category to be "product_category"', () => {
			expect(newProduct.category).toBe('product_category');
		});
	});
};
