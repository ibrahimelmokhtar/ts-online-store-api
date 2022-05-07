import Order from '../order.type';

const newOrder: Order = {
	id: 'order_id',
	products: ['product_id_1', 'product_id_2'],
	quantities: [5, 9],
	userID: 'user_id',
	orderStatus: true,
};

export const orderTypeSpecs = () => {
	describe('├─── Order Type Suite', () => {
		it('checks order`s userID to be "user_id"', () => {
			expect(newOrder.userID).toBe('user_id');
		});

		it('checks order`s ID to be "order_id"', () => {
			expect(newOrder.id).toBe('order_id');
		});
	});
};
