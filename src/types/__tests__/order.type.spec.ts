import { DEFAULT_ORDER } from '../../constants/order.type.constant';
import Order from '../order.type';
import { NIL as NIL_UUID } from 'uuid';

const newOrder: Order = DEFAULT_ORDER;

export const orderTypeSpecs = () => {
	describe('├─── Order Type Suite', () => {
		it('checks order`s ID to be "NIL_UUID"', () => {
			expect(newOrder.id).toBe(NIL_UUID);
		});

		it('checks order`s userID to be "NIL_UUID"', () => {
			expect(newOrder.user_id).toBe(NIL_UUID);
		});

		it('checks order`s status to be "false"', () => {
			expect(newOrder.is_done).toBe(false);
		});
	});
};
