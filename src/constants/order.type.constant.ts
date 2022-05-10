import Order from '../types/order.type';
import { NIL as NIL_UUID } from 'uuid';
import { UNIQUE_UUID } from './unique.uuid.constant';

export const DEFAULT_ORDER: Order = {
	id: NIL_UUID,
	user_id: NIL_UUID,
	is_done: false,
	products_ids: [NIL_UUID, UNIQUE_UUID],
	products_quantities: [5, 10],
};

export const OTHER_ORDER: Order = {
	id: UNIQUE_UUID,
	user_id: NIL_UUID,
	is_done: false,
	products_ids: [NIL_UUID, UNIQUE_UUID],
	products_quantities: [5, 10],
};

export const DONE_ORDER: Order = {
	id: UNIQUE_UUID,
	user_id: NIL_UUID,
	is_done: true,
	products_ids: [NIL_UUID, UNIQUE_UUID],
	products_quantities: [5, 10],
};
