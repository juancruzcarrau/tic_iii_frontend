import axios from "axios";


const ImageService = {

    get: async () => {
        return await axios.get(process.env.REACT_APP_BACKEND_URL + "/imagenes")
            .then(res => {
                return res.data;
            })
            .catch(error => {
                throw error;
            })
    }

}
export default ImageService