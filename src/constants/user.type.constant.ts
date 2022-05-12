import User from '../types/user.type';
import { NIL as NIL_UUID } from 'uuid';
import { UNIQUE_UUID } from './unique.uuid.constant';

export const DEFAULT_USER: User = {
	id: NIL_UUID,
	first_name: 'first_name',
	last_name: 'last_name',
	user_name: 'default_user_name',
	email: 'default@default.com',
	password: 'default_password',
};

export const OTHER_USER: User = {
	id: UNIQUE_UUID,
	first_name: 'first_name',
	last_name: 'last_name',
	user_name: 'other_user_name',
	email: 'other@other.com',
	password: 'other_password',
};
