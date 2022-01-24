import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";

export default function TwitterOAuthHandler(){
    const [searchParams] = useSearchParams();
    const oauth_token = searchParams.get('oauth_token');
    const oauth_verifier = searchParams.get('oauth_verifier');

    const navigate = useNavigate();

    useEffect(()=> {
        axios.post("/api/oauth/twitter-login",
        {
                oauth_token : oauth_token,
                oauth_verifier : oauth_verifier,
        }).then(
            (res) => {
                    alert("로그인 성공!");
                    // 로그인 이후엔 전송되는 헤더마다 JWT를 실어 보냄
                    console.log(res.data.access_token);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
                    navigate("/mypage");
            }
        ).catch((error) => {
            alert("에러 발생!")
            console.log(error);
            navigate("/");
        })
    }, [])


    return <></>
    
}