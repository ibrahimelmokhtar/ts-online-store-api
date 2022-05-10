import OrderProduct from '../types/orderProduct.type';
import { NIL as NIL_UUID } from 'uuid';
import { UNIQUE_UUID } from './unique.uuid.constant';

export const DEFAULT_ORDER_PRODUCT: OrderProduct = {
	id: NIL_UUID,
	order_id: NIL_UUID,
	quantity: 5,
	product_id: NIL_UUID,
};

export const OTHER_ORDER_PRODUCT: OrderProduct = {
	id: UNIQUE_UUID,
	order_id: NIL_UUID,
	quantity: 5,
	product_id: NIL_UUID,
};
