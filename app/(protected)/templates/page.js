'use client';

import { supabase } from '@/lib/supabase'
import { useState, useEffect } from 'react';
import { useUserId } from '@/lib/hooks/useUserId';
import { useRouter } from 'next/navigation'
import styles from './page.module.css';

export default function TemplatesPage() {
    const [name, setName] = useState('');
    const [exerciseInput, setExerciseInput] = useState('')
    const [exercises, setExercises] = useState([]);
    const {userId} = useUserId();
    const router = useRouter();

    function addExercise(){
      setExercises([...exercises, exerciseInput])
      setExerciseInput('')
    }

    async function handleSubmit(e){
        e.preventDefault();

        if (!exercises || !name ) {
            alert('Fill in all fields');
            return;
        }

        const {data, error} = await supabase.from('templates').insert([{name, exercises, user_id: userId}])

        if (error) {
            alert('Error saving workout: ' + error.message);
            return;
        }
        setName('')
        setExercises([])
        setExerciseInput('')
    }

    function deleteExercise(index){
      setExercises(exercises.filter((_, i) => i !== index))
    }

    return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Gym Tracker</h1>
        <button className={styles.btnGhost} onClick={() => router.push('/')}>Home</button>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name of Workout'
          />
        </div>
        <div className={styles.formRow}>
          <input
            value={exerciseInput}
            onChange={(e) => setExerciseInput(e.target.value)}
            placeholder='Exercise'
          />
          <button type='button' className={styles.btnAddExercise} onClick={addExercise}>Add Exercise</button>
        </div>
        <button type='submit' className={styles.btnSubmit}>Create Template</button>
      </form>

      {exercises.length > 0 && (
        <div className={styles.exerciseList}>
          <h3>Exercises</h3>
          <ul>
            {exercises.map((exercise, index) => (
              <li key={index} className={styles.exerciseItem}>
                <span className={styles.exerciseName}>{exercise}</span>
                <button type="button" className={styles.btnDelete} onClick={() => deleteExercise(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    )
}