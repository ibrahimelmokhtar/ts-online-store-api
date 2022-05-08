import { userModelSpecs } from './user.model.spec';
import { productModelSpecs } from './product.model.spec';

describe('├─── Models Suites', () => {
	// user model suite:
	userModelSpecs();

	// product model suite:
	productModelSpecs();
});
