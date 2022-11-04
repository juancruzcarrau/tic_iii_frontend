import axios from "axios";

const ListService = {
    addNewList: async (data) => {
        console.log(data)
        return await axios.post(process.env.REACT_APP_BACKEND_URL + "/tableros/listas", data)
            .then(response => {
                return response.data
            })
            .catch(error => {
                throw error
            })
    }
}

export default ListService