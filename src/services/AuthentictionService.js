import axios from "axios";
import {useState} from "react";

const AuthenticationService = {

    authenticate: (data) => {
        sessionStorage.setItem('hello', {data:"something"})
        // axios.post()
    }
}

export default AuthenticationService;