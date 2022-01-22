import { useQuery } from "react-query"
import { requestURI } from "./serverData"

export type jwtToken = {
    token: string;
}

export default function useTwitterAuthToken(oauth_token: string| null, oauth_verifier: string | null){
    return useQuery<jwtToken, Error>('oauthToken', async ():Promise<jwtToken> =>{
        return await fetch(requestURI + "/api/oauth/twitter-login-token",
        {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                oauth_token : oauth_token,
                oauth_verifier : oauth_verifier,
            })
        }
        ).then(
            res => res.json()
        )
    })
}