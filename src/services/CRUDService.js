import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { email: userEmail } });
            if (user) {
                resolve(true);
            }
            resolve(false);
        } catch (error) {
            reject(error);
        }
    });
};
export let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkIsEmailExist = await checkUserEmail(data.email);
            if (checkIsEmailExist) {
                resolve({
                    errCode: 1,
                    errMessage: 'Email already exists',
                });
            } else {
                let hassPassWord = await hashUserPassword(data.password);
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
            }
        } catch (error) {
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
