import {useState, useEffect} from 'react';
import { supabase } from '@/lib/supabase' 

export function useTemplateId(templateId){
    const [template, setTemplate] = useState(null)
   
    async function fetchTemplate() {
    const { data } = await supabase
        .from('templates')
        .select('*')
        .eq('id', templateId)
        .single()

    setTemplate(data)
    }

    useEffect(() => {
        fetchTemplate()
    }, [templateId])

    return {template}
}