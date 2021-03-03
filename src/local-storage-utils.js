export const USER = 'USER';

// this function will give us a user object
export function getUserFromLocalStorage() {
    const user = localStorage.getItem(USER);
    try {
    
    // if there is a user in local storage, that's the user this function will return
        return JSON.parse(user);

    } catch(e) {
        // otherwise, it'll just give us a blank, fake user object.
        return {
            email: '',
            id: '',
            token: ''
        }

    }

}

export function putUserInLocalStorage(user) {
    localStorage.setItem(USER, JSON.stringify(user));
}

