import axios from "axios"
import { useQuery } from "react-query"

export type RequestToken = {
    token: string;
    tokenSecret : string;
    authorization_url : string;
    authentication_url : string;
}


export default function useRequestToken(enabled:boolean){

    return useQuery<RequestToken, Error>('responseToken', async ():Promise<RequestToken> =>{
        return (await axios.get("/api/oauth/twitter/request-token")).data}, {enabled: enabled})
}