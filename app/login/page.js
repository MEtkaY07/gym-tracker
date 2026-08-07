'use client';

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './page.module.css';

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleLogin(e) {
        e.preventDefault()
        setError("")
        setLoading(true)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }

        setLoading(false)
        router.push('/')
    }

    return (
        <div className={styles.authPage}>
            <div className={styles.authCard}>
                <header className={styles.authHeader}>
                    <h1>Welcome Back</h1>
                    <p>Sign in to your Gym Tracker account</p>
                </header>

                {error && (
                    <div className={styles.errorMessage} role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className={styles.authForm} noValidate>
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
                            className="input"
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
                            autoComplete="current-password"
                            required
                            disabled={loading}
                            className="input"
                        />
                    </div>

                    <button
                        type="submit"
                        className={styles.btnSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Log In'}
                    </button>
                </form>

                <footer className={styles.authFooter}>
                    Don't have an account? <Link href="/signup">Sign up</Link>
                </footer>
            </div>
        </div>
    )
}