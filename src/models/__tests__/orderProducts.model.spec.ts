import { DEFAULT_ORDER_PRODUCT } from '../../constants/orderProduct.type.constant';
import { NIL as NIL_UUID } from 'uuid';
import OrderProductsModel from '../orderProduct.model';
import OrderProduct from '../../types/orderProduct.type';

const orderProductsModel = new OrderProductsModel();

export const orderProductModelSpecs = () => {
	describe('├─── OrderProducts Model Suite', () => {
		it('adds new product into specific order', async () => {
			const addedOrderProduct: OrderProduct =
				(await orderProductsModel.addProduct(
					DEFAULT_ORDER_PRODUCT.id as string,
					DEFAULT_ORDER_PRODUCT
				)) as OrderProduct;

			expect(addedOrderProduct.order_id).toBe(
				DEFAULT_ORDER_PRODUCT.id as string
			);
		});

		it('shows a specific product from specific order', async () => {
			const orderProduct: OrderProduct =
				(await orderProductsModel.showProduct(
					DEFAULT_ORDER_PRODUCT.order_id,
					DEFAULT_ORDER_PRODUCT.product_id
				)) as OrderProduct;

			expect(orderProduct.order_id).toEqual(NIL_UUID);
		});

		it('shows all products within specific order', async () => {
			const orderProducts: Array<OrderProduct> =
				(await orderProductsModel.showAllProducts(
					DEFAULT_ORDER_PRODUCT.order_id
				)) as Array<OrderProduct>;

			expect(orderProducts.length).toEqual(3);
		});
	});
};
