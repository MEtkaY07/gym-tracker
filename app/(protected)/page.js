'use client';

import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useWorkouts } from '@/lib/hooks/useWorkouts';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter()
  const { grouped } = useWorkouts();

  function startWorkout() {
    router.push(`/workout`)
  }

  async function signOut() {
    supabase.auth.signOut();
    router.push('/login')
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Gym Tracker</h1>
        <div className={styles.headerActions}>
          <button className={styles.btnPrimary} onClick={startWorkout}>Start Workout</button>
          <button className={styles.btnGhost} onClick={signOut}>Sign out</button>
        </div>
      </header>

      {Object.keys(grouped).length === 0 ? (
        <div className={styles.emptyState}>
          <p>No workouts recorded yet.</p>
          <button className={styles.btnPrimary} onClick={startWorkout}>Start Your First Workout</button>
        </div>
      ) : (
        <div className={styles.sessions}>
          {Object.keys(grouped).sort((a,b) => b - a).map(sessionId => (
            <div key={sessionId} className={styles.sessionCard}>
              <div className={styles.sessionHeader}>
                <h3 className={styles.sessionTitle}>{grouped[sessionId][0].templates.name}</h3>
                <span className={styles.sessionDate}>
                  {new Date(grouped[sessionId][0].created_at).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <ul className={styles.exerciseList}>
                {grouped[sessionId].map(w => (
                  <li key={w.id} className={styles.exerciseItem}>
                    <span className={styles.exerciseName}>{w.exercise}</span>
                    <div className={styles.exerciseDetails}>
                      <span>{w.reps} reps</span>
                      <span>{w.weight} lbs</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}