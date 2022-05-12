import Product from '../types/product.type';
import { NIL as NIL_UUID } from 'uuid';
import { UNIQUE_UUID } from './unique.uuid.constant';

export const DEFAULT_PRODUCT: Product = {
	id: NIL_UUID,
	name: 'default_product_name',
	price: 99.99,
	category: 'product_category',
};

export const OTHER_PRODUCT: Product = {
	id: UNIQUE_UUID,
	name: 'other_product_name',
	price: 99.99,
	category: 'product_category',
};
