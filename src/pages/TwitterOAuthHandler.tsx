import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { requestURI } from "../hooks/serverData";
import { jwtState } from "../recoil/jwt";

export default function TwitterOAuthHandler(){
    const [searchParams] = useSearchParams();
    const oauth_token = searchParams.get('oauth_token');
    const oauth_verifier = searchParams.get('oauth_verifier');

    const navigate = useNavigate();

    const [jwt, setJwt] = useRecoilState(jwtState)

    useEffect(()=> {
        fetch(requestURI + "/api/oauth/twitter-login",
        {
            method: "POST",
            credentials: 'include',
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
                    alert("에러가 발생했습니다." + res.error);
                    navigate("/");
                }else{
                    alert("로그인 성공!");
                    setJwt(res.token);
                    navigate("/");
                }
            }
        )
    }, [])


    return <></>
    
}