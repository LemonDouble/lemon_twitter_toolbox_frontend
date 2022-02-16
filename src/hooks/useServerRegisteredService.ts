import axios from "axios"
import { useQuery } from "react-query"

export type serverRegisteredService = {
    service_type: string;
    public : boolean;
    ready : boolean;
    can_use_time : string;
}

export default function useServerRegisteredService(isLogin: boolean){
    return useQuery<serverRegisteredService[], Error>('serverRegisteredService', async ():Promise<serverRegisteredService[]> =>
     (await axios.get('/api/service')).data, {enabled:isLogin}
   )
}