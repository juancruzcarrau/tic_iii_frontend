import axios from "axios";

const UserService = {

    authenticate: async (data) => {

        if (localStorage.getItem('currentUser') === null) {
            return await axios.get(process.env.REACT_APP_BACKEND_URL + "/usuarios/login", {params: data})
                .then(res => {
                    localStorage.setItem('currentUser', JSON.stringify(res.data))
                    return res.data;
                })
                .catch((error) => {
                    throw error;
                })
        } else {
            throw Error("There already is a user authenticated.")
        }
    },

    signup: async (data) => {


    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('currentUser')) //returns null if there is no current user
    },

    logOut: () => {
        if (localStorage.getItem('currentUser') !== null){
            localStorage.removeItem('currentUser')
        } else {
            throw Error('There is no current user authenticated.')
        }
    }
}

export default UserService;