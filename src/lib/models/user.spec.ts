import User from './user';
import * as bcrypt from 'bcrypt';
import Auth from '$lib/server/utilities/auth';
import Joi from 'joi';

test('user password hashing', async () => {
    const hashedPassword = await Auth.hashUserPassword('test');
    expect(await bcrypt.compare('test', hashedPassword)).toBe(true);
});

test('user password too short', async () => {
    const user = new User();
    user.password = 't';
    await expect(async () => {
        await user.validate()
    }).rejects.toThrow(Joi.ValidationError);
})

// TODO Add more testing for user validation.