import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import ErrorNoticeCard from "../components/ErrorNoticeCard";

export type AccessToken = {
    access_token:string;
}

export default function TwitterOAuthHandler(){
    const [searchParams] = useSearchParams();
    const oauth_token = searchParams.get('oauth_token');
    const oauth_verifier = searchParams.get('oauth_verifier');

    const navigate = useNavigate();

    const {isLoading, error, data }  = useQuery<AccessToken, Error>('accessToken' , async (): Promise<AccessToken> => {
        return await axios.post("/api/oauth/twitter-login",
        {
                oauth_token : oauth_token,
                oauth_verifier : oauth_verifier,
        }).then(
            res => res.data
        )
    });

    if(isLoading){
        return <>처리 중 . . . </>
    }

    if(error){
        alert("에러 발생!" + error);
        navigate("/");
    }


    // TODO : Local Stoarge 보안상 안 좋으므로, 꼭 Refresh Token / Access Token으로 바꾸자.
    if(data){
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
        localStorage.setItem("token", data.access_token);
        navigate("/mypage");
    }

    return <ErrorNoticeCard />
    
}