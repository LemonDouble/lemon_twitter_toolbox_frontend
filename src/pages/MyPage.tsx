import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";

export default function MyPage(){

    const { isLoading, error, data } = useQuery('profileURL', () =>
     axios.get('/api/twitter/user-profile')
   )

    if(isLoading) return <>Loading..</>
    
    if(error){
        alert("오류가 발생했습니다 : " + error);
        return <> 으악 </>
    }


   console.log(data?.data);
    return <div></div>
}