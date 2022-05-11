import bcrypt from 'bcrypt';
import config from '../../config/env.config';

/**
 * @description Compare hased text againist plain text (password, ...etc.).
 * @param {string} plain
 * @returns {boolean} Is valid or not.
 */
export const compare = (plain: string, hashed: string): boolean => {
	return bcrypt.compareSync(`${plain}${config.bcryptPassword}`, hashed);
};
