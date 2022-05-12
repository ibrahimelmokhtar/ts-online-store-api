import { DEFAULT_USER } from '../../constants/user.type.constant';
import { NIL as NIL_UUID } from 'uuid';
import User from '../user.type';

const newUser: User = DEFAULT_USER;

export const userTypeSpecs = () => {
	describe('├─── User Type Suite', () => {
		it('checks user`s ID to be "NIL_UUID"', () => {
			expect(newUser.id).toBe(NIL_UUID);
		});

		it('checks user`s first name to be "first_name"', () => {
			expect(newUser.first_name).toBe('first_name');
		});

		it('checks user`s password to be "default_password"', () => {
			expect(newUser.password).toBe('default_password');
		});
	});
};
