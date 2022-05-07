import { orderTypeSpecs } from './order.type.spec';
import { productTypeSpecs } from './product.type.spec';
import { userTypeSpecs } from './user.type.spec';

describe('Types Suites', () => {
	// order type suite:
	orderTypeSpecs();

	// product type suite:
	productTypeSpecs();

	// user type suite:
	userTypeSpecs();
});
