import OrderProduct from '../types/orderProduct.type';
import { NIL as NIL_UUID } from 'uuid';
import { UNIQUE_UUID } from './unique.uuid.constant';

const currentDateTime: Date = new Date();

export const DEFAULT_ORDER_PRODUCT: OrderProduct = {
	id: NIL_UUID,
	order_id: NIL_UUID,
	product_quantity: 5,
	product_id: NIL_UUID,
	date_time: currentDateTime.toISOString(),
	date_time_readable: currentDateTime.toString(),
};

export const OTHER_ORDER_PRODUCT: OrderProduct = {
	id: UNIQUE_UUID,
	order_id: NIL_UUID,
	product_quantity: 5,
	product_id: NIL_UUID,
	date_time: currentDateTime.toISOString(),
	date_time_readable: currentDateTime.toString(),
};
