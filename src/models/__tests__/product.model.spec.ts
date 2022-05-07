import { PoolClient } from 'pg';
import pool from '../../database';
import Product from '../../types/product.type';
import ProductModel from '../product.model';
import { NIL as NIL_UUID } from 'uuid';

const productModel = new ProductModel();

export const productModelSpecs = () => {
	describe('Product Model Suite', () => {
		// create products table:
		beforeAll(async () => {
			const client: PoolClient = await pool.connect();
			const sql = `
		CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        CREATE TABLE products (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            price FLOAT NOT NULL,
            category VARCHAR(50) NOT NULL
        );`;
			await client.query(sql);
		});

		it('creates new product within the database', async () => {
			const product: Product = {
				id: NIL_UUID,
				name: 'product_name',
				price: 99.99,
				category: 'product_category',
			};
			const createdProduct: Product = (await productModel.create(
				product
			)) as Product;

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
				(await productModel.showAllProducts()) as Product[];

			expect(products.length).toEqual(1);
		});

		it('updates a specific product within the database', async () => {
			const product: Product = {
				id: NIL_UUID,
				name: 'product_name',
				price: 99.99,
				category: 'product_category',
			};

			const updatedProduct: Product = (await productModel.update(
				product.id as string,
				product
			)) as Product;

			expect(updatedProduct.category).toEqual(product.category);
		});

		it('deletes a specific product from the database', async () => {
			const product: Product = (await productModel.delete(
				NIL_UUID
			)) as Product;

			expect(product.id).toEqual(NIL_UUID);
		});

		// delete products table:
		afterAll(async () => {
			const client: PoolClient = await pool.connect();
			const sql = 'DROP TABLE products';
			await client.query(sql);
		});
	});
};
