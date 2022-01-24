import axios from "axios"
import { useQuery } from "react-query"

export type RequestToken = {
    token: string;
    tokenSecret : string;
    authorization_url : string;
    authentication_url : string;
}


export default function useRequestToken(){

    return useQuery<RequestToken, Error>('responseToken', async ():Promise<RequestToken> =>{
        return await (await axios.get("/api/oauth/request-token")).data
    })
}