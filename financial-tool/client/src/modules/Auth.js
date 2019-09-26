import decode from 'jwt-decode';

export default class Auth {
    static authenticateUser(token) {
        localStorage.setItem('token', token);
    }

    static isTokenExpired(token) {
       
            const decoded = decode(token);
            if(decoded.exp < Date.now() / 1000) {
                alert("Token expired! Please Log In again!");
                localStorage.removeItem('token');
                return true;
            }else {
                return false;
            }
    }

    static isUserAuthenticated() {
        const token = localStorage.getItem('token');
        return token && !this.isTokenExpired(token);
    }

    static getToken(tokenName) {
        return localStorage.getItem(tokenName);
    }

    static removeToken(tokenName) {
        return localStorage.removeItem(tokenName);
    }
}
