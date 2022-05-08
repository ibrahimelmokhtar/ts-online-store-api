import Order from '../types/order.type';
import { NIL as NIL_UUID } from 'uuid';
import { UNIQUE_UUID } from './unique.uuid.constant';

export const DEFAULT_ORDER: Order = {
	id: NIL_UUID,
	userID: NIL_UUID,
	isDone: false,
};

export const OTHER_ORDER: Order = {
	id: UNIQUE_UUID,
	userID: NIL_UUID,
	isDone: false,
};
