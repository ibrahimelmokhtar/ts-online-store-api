import { UNIQUE_UUID } from '../../constants/unique.uuid.constant';
import User from '../../types/user.type';
import UserModel from '../user.model';
import { DEFAULT_USER, OTHER_USER } from '../../constants/user.type.constant';

const userModel = new UserModel();

export const userModelSpecs = () => {
	describe('├─── User Model Suite', () => {
		it('creates new user within the database', async () => {
			// THIS WILL REMAIN IN DB TABLE FOR FURTHER INTEGRATION TESTING:
			(await userModel.create(DEFAULT_USER)) as User;

			const createdUser: User = (await userModel.create(
				OTHER_USER
			)) as User;

			expect(createdUser.email).toEqual(OTHER_USER.email);
		});

		it('shows a specific user from the database', async () => {
			const user: User = (await userModel.show(
				OTHER_USER.id as string
			)) as User;

			expect(user.id).toEqual(UNIQUE_UUID);
		});

		it('shows all users from the database', async () => {
			const users: User[] = (await userModel.showAll()) as User[];

			expect(users.length).toEqual(2);
		});

		it('updates a specific user within the database', async () => {
			const updatedUser: User = (await userModel.update(
				OTHER_USER.id as string,
				OTHER_USER
			)) as User;

			expect(updatedUser.email).toEqual(OTHER_USER.email);
		});

		it('deletes a specific user from the database', async () => {
			const user: User = (await userModel.delete(
				OTHER_USER.id as string
			)) as User;

			expect(user.id).toEqual(UNIQUE_UUID);
		});

		it('authenticates a specific user within the database', async () => {
			const authenticatedUser: User = (await userModel.authenticate(
				DEFAULT_USER.email,
				DEFAULT_USER.password
			)) as User;

			expect(authenticatedUser.email).toEqual(DEFAULT_USER.email);
		});
	});
};
