import {useState, useEffect} from 'react';
import { supabase } from '@/lib/supabase'

export function useUserId(){
    const [userId, setuserId] = useState('')
    
    async function fetchUserId(){
        const { data: { user } } = await supabase.auth.getUser()
        
        if(user != null){
            setuserId(user.id)
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchUserId();
    },[])

    return {userId}
}