import axios from "axios"
import { useQuery } from "react-query"

export type serverRegisteredService = {
    service_type: string;
    public : boolean;
    ready : boolean;
}

export default function useServerRegisteredService(){
    return useQuery<serverRegisteredService[], Error>('serverRegisteredService', async ():Promise<serverRegisteredService[]> =>
     (await axios.get('/api/service')).data
   )
}