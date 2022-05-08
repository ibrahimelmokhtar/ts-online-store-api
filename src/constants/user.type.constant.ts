import User from '../types/user.type';
import { NIL as NIL_UUID } from 'uuid';

export const DEFAULT_USER: User = {
	id: NIL_UUID,
	firstName: 'first_name',
	lastName: 'last_name',
	userName: 'user_name',
	email: 'email@email.com',
	password: 'password',
};
