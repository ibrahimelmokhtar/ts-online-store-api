import bcrypt from 'bcrypt';
import config from '../../config/env.config';

/**
 * @description Encrypt plain text (password, ...etc.) into hashed text (password, ...etc.).
 * @param {string} plain
 * @returns {string} Encrypted text.
 */
export const encrypt = (plain: string): string => {
	return bcrypt.hashSync(
		`${plain}${config.bcryptPassword}`,
		parseInt(config.saltRounds as string, 10) // required for avoiding Error: {{Salt must be in the form of: $Vers$log2(NumRounds)$saltvalue}}
	);
};
