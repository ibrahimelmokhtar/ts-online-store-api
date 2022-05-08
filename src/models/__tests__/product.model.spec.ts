import {
	DEFAULT_PRODUCT,
	OTHER_PRODUCT,
} from '../../constants/product.type.constant';
import Product from '../../types/product.type';
import ProductModel from '../product.model';
import { UNIQUE_UUID } from '../../constants/unique.uuid.constant';

const productModel = new ProductModel();

export const productModelSpecs = () => {
	describe('├─── Product Model Suite', () => {
		it('creates new product within the database', async () => {
			// THIS WILL REMAIN IN DB TABLE FOR FURTHER INTEGRATION TESTING:
			(await productModel.create(DEFAULT_PRODUCT)) as Product;

			const createdProduct: Product = (await productModel.create(
				OTHER_PRODUCT
			)) as Product;

			expect(createdProduct.name).toEqual(OTHER_PRODUCT.name);
		});

		it('shows a specific product from the database', async () => {
			const product: Product = (await productModel.show(
				OTHER_PRODUCT.id as string
			)) as Product;

			expect(product.id).toEqual(UNIQUE_UUID);
		});

		it('shows all products from the database', async () => {
			const products: Product[] =
				(await productModel.showAll()) as Product[];

			expect(products.length).toEqual(2);
		});

		it('updates a specific product within the database', async () => {
			const updatedProduct: Product = (await productModel.update(
				OTHER_PRODUCT.id as string,
				OTHER_PRODUCT
			)) as Product;

			expect(updatedProduct.category).toEqual(OTHER_PRODUCT.category);
		});

		it('deletes a specific product from the database', async () => {
			const product: Product = (await productModel.delete(
				OTHER_PRODUCT.id as string
			)) as Product;

			expect(product.id).toEqual(UNIQUE_UUID);
		});
	});
};
