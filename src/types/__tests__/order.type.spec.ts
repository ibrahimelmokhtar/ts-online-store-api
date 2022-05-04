import Order from '../order.type';

const newOrder: Order = {
	id: 'order_id',
	products: ['product_id_1', 'product_id_2'],
	quantities: [5, 9],
	userID: 'user_id',
	orderStatus: true,
};

describe('Order Type Suite', () => {
	it('checks order`s status to be "completed"', () => {
		expect(newOrder.orderStatus).toBeTruthy();
	});

	it('checks order`s userID to be "user_id"', () => {
		expect(newOrder.userID).toBe('user_id');
	});
});
