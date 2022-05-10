import { DEFAULT_ORDER_PRODUCT } from '../../constants/orderProduct.type.constant';
// import { UNIQUE_UUID } from '../../constants/unique.uuid.constant';
// import { NIL as NIL_UUID } from 'uuid';
import { DEFAULT_ORDER } from '../../constants/order.type.constant';
import OrderProductsModel from '../orderProduct.model';
// import OrderProduct from '../../types/orderProduct.type';
import Order from '../../types/order.type';

const orderProductsModel = new OrderProductsModel();

export const orderProductModelSpecs = () => {
	describe('├─── OrderProducts Model Suite', () => {
		it('checks order status to be active: "false"', async () => {
			const checkedOrderStatus: boolean =
				(await orderProductsModel.checkOrderStatus(
					DEFAULT_ORDER.id as string
				)) as boolean;

			expect(checkedOrderStatus).toBeFalse();
		});

		it('adds new product into specific order', async () => {
			const modifiedOrder: Order = (await orderProductsModel.addProduct(
				DEFAULT_ORDER_PRODUCT.id as string,
				DEFAULT_ORDER_PRODUCT
			)) as Order;

			expect(modifiedOrder.is_done).toBeFalse();
		});

		// it('shows a specific product from specific order', async () => {
		// 	const cart: OrderProduct = (await orderProductsModel.showProduct(
		// 		DEFAULT_ORDER_PRODUCT.orderID,
		// 		DEFAULT_ORDER_PRODUCT.productID
		// 	)) as OrderProduct;

		// 	expect(cart.id).toEqual(NIL_UUID);
		// });

		// it('shows all products within specific order', async () => {
		// 	const orderProducts: Array<OrderProduct> =
		// 		(await orderProductsModel.showAllProducts(
		// 			DEFAULT_ORDER_PRODUCT.orderID
		// 		)) as Array<OrderProduct>;

		// 	expect(orderProducts.length).toEqual(1);
		// });

		// it('updates a specific product quantity within specific order', async () => {
		// 	const updatedOrderProduct: OrderProduct =
		// 		(await orderProductsModel.updateProductQuantity(
		// 			DEFAULT_ORDER_PRODUCT.orderID,
		// 			DEFAULT_ORDER_PRODUCT.productID,
		// 			25
		// 		)) as OrderProduct;

		// 	expect(updatedOrderProduct.id).toEqual(DEFAULT_ORDER_PRODUCT.id);
		// });

		// it('deletes a specific product from specific order', async () => {
		// 	const orderProduct: OrderProduct =
		// 		(await orderProductsModel.deleteProduct(
		// 			DEFAULT_ORDER_PRODUCT.orderID,
		// 			DEFAULT_ORDER_PRODUCT.productID
		// 		)) as OrderProduct;

		// 	expect(orderProduct.id).toEqual(NIL_UUID);
		// });
	});
};
