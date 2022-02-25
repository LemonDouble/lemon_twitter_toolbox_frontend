import axios from "axios";
import { useEffect } from "react";

export type AccessToken = {
    access_token:string;
}

export default function LogoutHander(){

    useEffect(()=> {
       delete axios.defaults.headers.common['Authorization'];
       localStorage.removeItem("token");
       window.location.href = "/"
    }, [])

    return <></>
}