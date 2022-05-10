import User from '../types/user.type';
import { NIL as NIL_UUID } from 'uuid';
import { UNIQUE_UUID } from './unique.uuid.constant';

export const DEFAULT_USER: User = {
	id: NIL_UUID,
	first_name: 'first_name',
	last_name: 'last_name',
	user_name: 'user_name',
	email: 'email@email.com',
	password: 'password',
};

export const OTHER_USER: User = {
	id: UNIQUE_UUID,
	first_name: 'first_name',
	last_name: 'last_name',
	user_name: 'user_name',
	email: 'email@email.com',
	password: 'password',
};
