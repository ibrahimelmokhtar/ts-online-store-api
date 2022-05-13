import Order from '../types/order.type';
import { NIL as NIL_UUID } from 'uuid';
import { UNIQUE_UUID } from './unique.uuid.constant';

const currentDateTime: Date = new Date();

export const DEFAULT_ORDER: Order = {
	id: NIL_UUID,
	user_id: NIL_UUID,
	is_done: false,
	products_ids: [NIL_UUID, NIL_UUID],
	products_quantities: [5, 10],
	date_time: currentDateTime.toISOString(),
	date_time_readable: currentDateTime.toString(),
};

export const OTHER_ORDER: Order = {
	id: UNIQUE_UUID,
	user_id: NIL_UUID,
	is_done: false,
	products_ids: [NIL_UUID, NIL_UUID],
	products_quantities: [5, 10],
	date_time: currentDateTime.toISOString(),
	date_time_readable: currentDateTime.toString(),
};

export const DONE_ORDER: Order = {
	id: UNIQUE_UUID,
	user_id: NIL_UUID,
	is_done: true,
	products_ids: [NIL_UUID, NIL_UUID],
	products_quantities: [5, 10],
	date_time: currentDateTime.toISOString(),
	date_time_readable: currentDateTime.toString(),
};
