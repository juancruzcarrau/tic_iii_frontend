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

    getAll: async (data, sort, index, size) => {
        return await axios.get(process.env.REACT_APP_BACKEND_URL + "/tableros/todos", {params: {email:data, sort:sort, index:index, size:size}})
            .then(res => {
                return res.data;
            })
            .catch(error => {
                throw error;
            })
    },

    update: async (data) => {
        return await axios.put(process.env.REACT_APP_BACKEND_URL + "/tableros/update", data)
            .then(res => {
                return res.data;
            })
            .catch(error => {
                throw error;
            })
    }
}

export default TableService;