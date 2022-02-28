import axios from "axios"
import { useQuery } from "react-query"

export type LearnMeCanUse = {
    can_use: boolean;
    register_count: number;
    register_limit: number;
}


export default function useLearnMeCanUse(){

    return useQuery<LearnMeCanUse, Error>('LearnMeCanUse', async ():Promise<LearnMeCanUse> =>{
        return (await axios.get("/api/service/learn_me/can-use")).data})
}