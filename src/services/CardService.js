import axios from "axios";

const CardService = {
    addNewCard: async (data) => {
        return await axios.post(process.env.REACT_APP_BACKEND_URL + "/tableros/listas/tarjetas", data)
            .then(response => {
                return response.data
            })
            .catch(error => {
                throw error
            })
    },

    updateCard: async (data) => {
        return await axios.patch(process.env.REACT_APP_BACKEND_URL + "/tableros/listas/tarjetas", data)
            .then(response => {
                return response.data
            })
            .catch(error => {
                throw error
            })
    }
}

export default CardService