import { userTypeSpecs } from './user.type.spec';
import { productTypeSpecs } from './product.type.spec';
import { orderTypeSpecs } from './order.type.spec';
import { orderProductTypeSpecs } from './orderProduct.type.spec';

describe('├─── Types Suites', () => {
	// user type suite:
	userTypeSpecs();

	// product type suite:
	productTypeSpecs();

	// order type suite:
	orderTypeSpecs();

	// orderProduct type suite:
	orderProductTypeSpecs();
});
