import axios from "axios";

const AuthenticationService = {

    authenticate: async (data) => {

        return await axios.get(process.env.REACT_APP_BACKEND_URL + "/usuarios/login", {params: data})
            .then(res => {
                return res.data;
            })
            .catch((error) => {
                throw error;
            })

    }
}

export default AuthenticationService;