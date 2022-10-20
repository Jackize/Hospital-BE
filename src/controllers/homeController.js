import db from '../models/index';
import {
    createNewUser,
    getAllUser,
    getUserInfoById,
} from '../services/CRUDService';

export let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homePage.ejs', { data: JSON.stringify(data) });
    } catch (error) {
        console.log(error);
    }
};

export let getCRUD = async (req, res) => {
    return res.render('crud.ejs');
};

export let postCRUD = async (req, res) => {
    let message = await createNewUser(req.body);
    return res.send(message);
};

export let displayGetCRUD = async (req, res) => {
    let data = await getAllUser();
    return res.send('get data from server');
};

export let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await getUserInfoById(userId);
    }
};
