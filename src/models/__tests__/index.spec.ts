import { productModelSpecs } from './product.model.spec';
import { userModelSpecs } from './user.model.spec';

describe('Models Suites', () => {
	// product model suite:
	productModelSpecs();

	// user model suite:
	userModelSpecs();
});
