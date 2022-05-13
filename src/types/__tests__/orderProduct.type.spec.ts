import { DEFAULT_ORDER_PRODUCT } from '../../constants/orderProduct.type.constant';
import OrderProduct from '../orderProduct.type';
import { NIL as NIL_UUID } from 'uuid';

const newOrderProduct: OrderProduct = DEFAULT_ORDER_PRODUCT;

export const orderProductTypeSpecs = () => {
	describe('├─── OrderProduct Type Suite', () => {
		it('checks orderProduct`s ID to be "NIL_UUID"', () => {
			expect(newOrderProduct.id).toBe(NIL_UUID);
		});

		it('checks orderProduct`s orderID to be "NIL_UUID"', () => {
			expect(newOrderProduct.order_id).toBe(NIL_UUID);
		});

		it('checks orderProduct`s quantity to be 5', () => {
			expect(newOrderProduct.product_quantity).toEqual(5);
		});
	});
};
