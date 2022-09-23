import axios from "axios";


const TableService = {

    create: async (data) => {

        return await axios.post(process.env.REACT_APP_BACKEND_URL + "/tableros", data)
            .then(res => {
                return res.data;
            })
            .catch(error => {
                throw error;
            })
    },

    getAll: async (data) => {
        return await axios.get(process.env.REACT_APP_BACKEND_URL + "/tableros", {params: {email:data}})
            .then(res => {
                return res.data;
            })
            .catch(error => {
                throw error;
            })
    }
}

export default TableService;