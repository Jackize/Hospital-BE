import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

export let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hassPassWord = await hashUserPassword(data.password);
            console.log('not error', data);
            await db.User.create({
                email: data.email,
                password: hassPassWord,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            });
            resolve('Created a new user successfully');
        } catch (error) {
            console.log('error at service');
            reject(error);
        }
    });
};

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hash = bcrypt.hashSync(password, salt);
            resolve(hash);
        } catch (e) {
            reject(e);
        }
    });
};

export let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = db.User.findAll({ raw: true });
            resolve(user);
        } catch (error) {
            reject(error);
        }
    });
};

export let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            });
            if (user) {
                resolve(user);
            } else {
                resolve([]);
            }
        } catch (error) {
            reject(error);
        }
    });
};
