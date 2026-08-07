import {useState, useEffect} from 'react';
import { supabase } from '@/lib/supabase'

export function useWorkouts(){
    const [workouts, setWorkouts] = useState([])
    const [grouped, setGrouped] = useState({})
    
    async function fetchWorkouts(){    
    const {data, error} = await supabase
        .from('workouts')
        .select('*, templates(name)')
        .order('created_at', {ascending: false})

        console.log('fetch result:', data, error)
        
        if (data) {
            setWorkouts(data)        
        }
    }

    function groupWorkouts(){
    const newGrouped = {}
    for (let i = 0; i < workouts.length; i++) {
        const w = workouts[i]
        if (!newGrouped[w.workout_session_id]) {
        newGrouped[w.workout_session_id] = []
        }
        newGrouped[w.workout_session_id].push(w)
    }
    setGrouped(newGrouped)
    // console.log("grouped")
    }

    useEffect(() => {
        fetchWorkouts();
    }, []);

    useEffect(() => {
        groupWorkouts();
     }, [workouts]);

     return {grouped, workouts}
}
