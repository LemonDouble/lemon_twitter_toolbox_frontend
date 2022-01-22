import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { requestURI } from "../hooks/serverData";

export default function TwitterOAuthHandler(){
    const [searchParams] = useSearchParams();
    const oauth_token = searchParams.get('oauth_token');
    const oauth_verifier = searchParams.get('oauth_verifier');

    const [isError, setIsError] = useState(false);

    useEffect(()=> {
        fetch(requestURI + "/api/oauth/twitter-login",
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
        ).then(
            (res) => {
                if(res.hasOwnProperty('error')){
                    setIsError(true);
                }else{
                    setIsError(false);
                    console.log(res);
                    localStorage.setItem('jwt', res);
                }
            }
        )
    }, [])


    return <></>
    
}