import axios from "axios";


const BoardService = {

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
    },

    getFavorites: async (data, sort, index, size) => {
        return await axios.get(process.env.REACT_APP_BACKEND_URL + "/tableros/todos/favoritos", {params: {email:data, sort:sort, index:index, size:size}})
            .then(res => {
                return res.data;
            })
            .catch(error => {
                throw error;
            })
    },

    getArchived: async (data, sort, index, size) => {
        return await axios.get(process.env.REACT_APP_BACKEND_URL + "/tableros/archivados", {params: {email:data, sort:sort, index:index, size:size}})
            .then(res => {
                return res.data;
            })
            .catch(error => {
                throw error;
            })
    },

    getById: async (id) => {
        return await axios.get(process.env.REACT_APP_BACKEND_URL + "/tableros/" + id)
            .then(res => {
                return res.data;
            })
            .catch(error => {
                throw error;
            })
    },

    getRecent: async (data) => {
        return await axios.get(process.env.REACT_APP_BACKEND_URL + "/tableros/top/recientes", {params: {email: data}})
            .then(res => {
                return res.data;
            })
            .catch(error => {
                throw error;
            })
    }
}

export default BoardService;