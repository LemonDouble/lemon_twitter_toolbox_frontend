import axios from "axios";
import { useQuery } from "react-query";
import { Navigate, useSearchParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import ErrorNoticeCard from "../components/ErrorNoticeCard";
import LoadingComponent from "../components/LoadingComponent";
import { isLoginState } from "../recoil/isLogin";

export type AccessToken = {
    access_token:string;
}

export default function TwitterOAuthHandler(){
    
    const [searchParams] = useSearchParams();
    const setIsLogin = useSetRecoilState(isLoginState);

    const {isLoading, error, data }  = useQuery<AccessToken, Error>('accessToken' , async (): Promise<AccessToken> => {
        return await axios.post("/api/oauth/twitter/twitter-login",
        {
                oauth_token : searchParams.get('oauth_token'),
                oauth_verifier : searchParams.get('oauth_verifier'),
        }).then(
            res => res.data
        )
    });

    if(isLoading){
        return <LoadingComponent loadingMessage="Processing Login.." />
    }

    if(error){
        alert("에러 발생!" + error);
        return <Navigate replace to="/" />
    }


    // TODO : Local Stoarge 보안상 안 좋으므로, 꼭 Refresh Token / Access Token으로 바꾸자.
    if(data){
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
        localStorage.setItem("token", data.access_token);
        setIsLogin(true);
        return <Navigate replace to="/mypage" />
    }

    return <ErrorNoticeCard />
    
}