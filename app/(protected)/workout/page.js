'use client';

import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import TemplatesList from '../../components/TemplatesList'
import { useTemplates } from '@/lib/hooks/useTemplates';
import styles from './page.module.css';

export default function WorkoutSelectPage() {
    const router = useRouter()
    const { templates } = useTemplates();

    function startWorkout(template) {
        router.push(`/workout/${template.id}`)
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h2>Select a Template</h2>
                <p>Choose a workout template to begin</p>
            </header>

            {templates.length === 0 ? (
                <div className={styles.emptyTemplates}>
                    <p>No templates available.</p>
                    <p style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>Create a template in the database to get started.</p>
                </div>
            ) : (
                <TemplatesList templates={templates} onSelect={startWorkout} />
            )}
        </div>
    )
}