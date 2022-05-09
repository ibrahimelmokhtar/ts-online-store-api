import OrderProduct from '../types/orderProduct.type';
import { NIL as NIL_UUID } from 'uuid';
import { UNIQUE_UUID } from './unique.uuid.constant';

export const DEFAULT_ORDER_PRODUCT: OrderProduct = {
	id: NIL_UUID,
	orderID: NIL_UUID,
	quantity: 5,
	productID: NIL_UUID,
};

export const OTHER_ORDER_PRODUCT: OrderProduct = {
	id: UNIQUE_UUID,
	orderID: NIL_UUID,
	quantity: 5,
	productID: NIL_UUID,
};
