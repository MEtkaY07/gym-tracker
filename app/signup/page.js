'use client';

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './page.module.css';

export default function SignUpPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleSignUp(e) {
        e.preventDefault()
        setError("")
        setLoading(true)
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }
        alert('Check your email to confirm your account!')
        router.push('/login')
    }

    return (
        <div className={styles.authPage}>
            <div className={styles.authCard}>
                <header className={styles.authHeader}>
                    <h1>Create Account</h1>
                    <p>Start tracking your workouts today</p>
                </header>

                {error && <div className={styles.errorMessage} role="alert">{error}</div>}

                <form onSubmit={handleSignUp} className={styles.authForm} noValidate>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            autoComplete="new-password"
                            required
                            disabled={loading}
                            minLength={6}
                        />
                    </div>

                    <button type="submit" className={styles.btnSubmit} disabled={loading}>
                        {loading ? 'Creating account...' : 'Sign up'}
                    </button>
                </form>

                <footer className={styles.authFooter}>
                    Already have an account? <Link href="/login">Log in</Link>
                </footer>
            </div>
        </div>
    )
}