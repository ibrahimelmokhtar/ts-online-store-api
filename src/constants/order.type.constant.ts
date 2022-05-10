import Order from '../types/order.type';
import { NIL as NIL_UUID } from 'uuid';
import { UNIQUE_UUID } from './unique.uuid.constant';

export const DEFAULT_ORDER: Order = {
	id: NIL_UUID,
	userID: NIL_UUID,
	isDone: false,
	productsIDs: [NIL_UUID, UNIQUE_UUID],
	productsQuantities: [5, 10],
};

export const OTHER_ORDER: Order = {
	id: UNIQUE_UUID,
	userID: NIL_UUID,
	isDone: false,
	productsIDs: [NIL_UUID, UNIQUE_UUID],
	productsQuantities: [5, 10],
};

export const DONE_ORDER: Order = {
	id: UNIQUE_UUID,
	userID: NIL_UUID,
	isDone: true,
	productsIDs: [NIL_UUID, UNIQUE_UUID],
	productsQuantities: [5, 10],
};
