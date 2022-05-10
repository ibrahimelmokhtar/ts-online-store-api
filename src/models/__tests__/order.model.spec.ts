import { UNIQUE_UUID } from '../../constants/unique.uuid.constant';
import { NIL as NIL_UUID } from 'uuid';
import {
	DEFAULT_ORDER,
	DONE_ORDER,
	OTHER_ORDER,
} from '../../constants/order.type.constant';
import Order from '../../types/order.type';
import OrderModel from '../order.model';

const orderModel = new OrderModel();

export const orderModelSpecs = () => {
	describe('├─── Order Model Suite', () => {
		it('creates new order within the database', async () => {
			// THIS WILL REMAIN IN DB TABLE FOR FURTHER INTEGRATION TESTING:
			(await orderModel.create(DEFAULT_ORDER)) as Order;

			const createdOrder: Order = (await orderModel.create(
				OTHER_ORDER
			)) as Order;

			expect(createdOrder.id).toEqual(OTHER_ORDER.id);
		});

		it('shows a specific order from the database', async () => {
			const order: Order = (await orderModel.show(NIL_UUID)) as Order;

			expect(order.id).toEqual(NIL_UUID);
		});

		it('shows all orders from the database', async () => {
			const orders: Array<Order> =
				(await orderModel.showAll()) as Array<Order>;

			expect(orders.length).toEqual(2);
		});

		it('updates a specific order status within the database', async () => {
			const updatedOrder: Order = (await orderModel.updateOrderStatus(
				OTHER_ORDER.id as string,
				DONE_ORDER.is_done
			)) as Order;

			expect(updatedOrder.id).toEqual(OTHER_ORDER.id);
		});

		it('deletes a specific order from the database', async () => {
			const order: Order = (await orderModel.delete(
				OTHER_ORDER.id as string
			)) as Order;

			expect(order.id).toEqual(UNIQUE_UUID);
		});
	});
};
