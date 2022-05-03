import User from "../user.type";

const newUser: User = {
    id: 'user_id',
    firstName: 'first_name',
    lastName: 'last_name',
    email: 'email@email.com',
    password: 'password'
};

describe('User Type Suite', () => {
    it(`checks user's firstName to be "first_name"`, () => {
        expect(newUser.firstName).toBe('first_name');
    });

    it(`checks user's password to be "password"`, () => {
        expect(newUser.password).toBe('password');
    });
});
