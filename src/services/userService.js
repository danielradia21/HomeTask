import { storageService } from './async-storage.service';
import regularUsers from '../assets/data/data.json';
const STORAGE_KEY = 'user';
export const userService = {
    getUsers,
    signUp,
    removeUser,
    updateUser,
};

async function getUsers() {
    try {
        let users = await storageService.query('user');
        let check = await storageService.checkInStorage();
        if (check === false) {
            return await storageService.postMany(STORAGE_KEY, regularUsers);
        }
        return users;
    } catch (err) {
        console.log('Had error on userService: GET_USERS', err);
    }
}

async function signUp(userValues) {
    try {
        let msg = '';
        const users = await getUsers();
        const currUser = users.find((user) => {
            return user.id === userValues.id;
        });
        if (currUser) {
            throw 'User Exist';
        } else {
            storageService.post(STORAGE_KEY, userValues);
            return 'Add User Success';
        }
    } catch (err) {
        throw err;
    }
}

async function removeUser(removeUserId) {
    try {
        await storageService.remove(STORAGE_KEY, removeUserId);
    } catch (err) {
        console.log('Had error on userService: REMOVE_USER', err);
    }
}
async function updateUser(newUser) {
    try {
        await storageService.put(STORAGE_KEY, newUser);
    } catch (err) {
        console.log('Had error on userService: UPDATE_USER', err);
    }
}
