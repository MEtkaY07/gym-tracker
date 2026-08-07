/* eslint-disable react-hooks/set-state-in-effect */
import {useState, useEffect} from 'react';
import { supabase } from '@/lib/supabase'

export function useTemplates(){
    const [templates, setTemplates] = useState([])
    async function fetchTemplates(){
        const {data, error} =  await supabase.from('templates').select('*').order('name',{ascending:false}) 

        if (data!=null){
        setTemplates(data)
        }
    }

    useEffect(() => {
        fetchTemplates();
    }, []);

    return {templates}
}