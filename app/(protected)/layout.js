'use client';

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function ProtectedLayout({ children }) {
    const router = useRouter()

    useEffect(() => {
    async function checkAuth(){
        const {data: {user}} = await supabase.auth.getUser()
        if(!user){
        router.push('/login')
        }
    }
    checkAuth()
    }, [])

    return children
}