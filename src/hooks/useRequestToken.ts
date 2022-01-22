import { useQuery } from "react-query"
import { atom } from "recoil"
import { requestURI } from "./serverData"

export type RequestToken = {
    token: string;
    tokenSecret : string;
    authorizationURL : string;
    authenticationURL : string;
}


export default function useRequestToken(){

    return useQuery<RequestToken, Error>('responseToken', async ():Promise<RequestToken> =>{
        return await fetch(requestURI + "/api/oauth/request-token").then(
            res => res.json()
        )
    })
}