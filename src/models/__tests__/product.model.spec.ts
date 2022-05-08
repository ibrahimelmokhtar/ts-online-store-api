import { UNIQUE_UUID } from './../../constants/unique.uuid';
import {
	DEFAULT_PRODUCT,
	OTHER_PRODUCT,
} from '../../constants/product.type.constant';
import Product from '../../types/product.type';
import ProductModel from '../product.model';
import { NIL as NIL_UUID } from 'uuid';

const productModel = new ProductModel();

export const productModelSpecs = () => {
	const product: Product = DEFAULT_PRODUCT;

	describe('├─── Product Model Suite', () => {
		it('creates new product within the database', async () => {
			const createdProduct: Product = (await productModel.create(
				DEFAULT_PRODUCT
			)) as Product;
			(await productModel.create(OTHER_PRODUCT)) as Product;

			expect(createdProduct.name).toEqual(product.name);
		});

		it('shows a specific product from the database', async () => {
			const product: Product = (await productModel.show(
				NIL_UUID
			)) as Product;

			expect(product.id).toEqual(NIL_UUID);
		});

		it('shows all products from the database', async () => {
			const products: Product[] =
				(await productModel.showAll()) as Product[];

			expect(products.length).toEqual(2);
		});

		it('updates a specific product within the database', async () => {
			const updatedProduct: Product = (await productModel.update(
				product.id as string,
				product
			)) as Product;

			expect(updatedProduct.category).toEqual(product.category);
		});

		it('deletes a specific product from the database', async () => {
			const product: Product = (await productModel.delete(
				UNIQUE_UUID
			)) as Product;

			expect(product.id).toEqual(UNIQUE_UUID);
		});
	});
};
