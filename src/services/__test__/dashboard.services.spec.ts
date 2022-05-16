import { DEFAULT_USER } from '../../constants/user.type.constant';
import OrdersPerUser from '../../types/dashboard/ordersPerUser.type';
import ProductsInOrder from '../../types/dashboard/productsInOrder.type';
import TopProduct from '../../types/dashboard/topProduct.type';
import Dashboard from '../dashboard.services';

const dashboard = new Dashboard();

export const dashboardServiceSpecs = () => {
	describe('├─── Dashboard Service Suite', () => {
		it('shows products within orders', async () => {
			const productsInOrder: Array<ProductsInOrder> =
				(await dashboard.showProductsInOrders()) as Array<ProductsInOrder>;

			expect(productsInOrder.length).toEqual(3);
		});

		it('shows recent orders per user', async () => {
			const recentOrdersPerUser: Array<OrdersPerUser> =
				(await dashboard.showOrdersPerUser(
					DEFAULT_USER.id as string
				)) as Array<OrdersPerUser>;

			expect(recentOrdersPerUser.length).toEqual(1);
		});

		it('shows top ordered products', async () => {
			const topProducts: Array<TopProduct> =
				(await dashboard.showTopProducts()) as Array<TopProduct>;

			expect(topProducts.length).toEqual(1);
		});
	});
};
