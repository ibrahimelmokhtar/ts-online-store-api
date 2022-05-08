import User from '../../types/user.type';
import UserModel from '../user.model';
import { NIL as NIL_UUID } from 'uuid';
import { DEFAULT_USER, OTHER_USER } from '../../constants/user.type.constant';
import { UNIQUE_UUID } from '../../constants/unique.uuid';

const userModel = new UserModel();

export const userModelSpecs = () => {
	const user: User = DEFAULT_USER;

	describe('├─── User Model Suite', () => {
		it('creates new user within the database', async () => {
			const createdUser: User = (await userModel.create(user)) as User;
			(await userModel.create(OTHER_USER)) as User;

			expect(createdUser.email).toEqual(user.email);
		});

		it('shows a specific user from the database', async () => {
			const user: User = (await userModel.show(NIL_UUID)) as User;

			expect(user.id).toEqual(NIL_UUID);
		});

		it('shows all users from the database', async () => {
			const users: User[] = (await userModel.showAll()) as User[];

			expect(users.length).toEqual(2);
		});

		it('updates a specific user within the database', async () => {
			const updatedUser: User = (await userModel.update(
				user.id as string,
				user
			)) as User;

			expect(updatedUser.email).toEqual(user.email);
		});

		it('deletes a specific user from the database', async () => {
			const user: User = (await userModel.delete(UNIQUE_UUID)) as User;

			expect(user.id).toEqual(UNIQUE_UUID);
		});
	});
};
