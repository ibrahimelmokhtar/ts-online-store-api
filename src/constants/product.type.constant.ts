import Product from '../types/product.type';
import { NIL as NIL_UUID } from 'uuid';

export const DEFAULT_PRODUCT: Product = {
	id: NIL_UUID,
	name: 'product_name',
	price: 99.99,
	category: 'product_category',
};
