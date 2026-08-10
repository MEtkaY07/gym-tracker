/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { supabase } from '@/lib/supabase'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useTemplateId } from '@/lib/hooks/useTemplateId';
import { useUserId } from '@/lib/hooks/useUserId';
import styles from './page.module.css';

export default function WorkoutPage() {
  const params = useParams()
  const templateId = params.templateId
  const router = useRouter()
  const { userId } = useUserId();

  const { template } = useTemplateId(templateId);
  const [inputList, setInputList] = useState({});


    useEffect(() => {
      if (template == null) return
      const initial = {}
      template.exercises.forEach(ex => {
        initial[ex] = [{ Reps: "", Weight: "" }]
      })

      setInputList(initial)
    }, [template])

    async function handleSubmit(e) {
        e.preventDefault()

        const { data } = await supabase
        .from('workouts')
        .select('workout_session_id')
        .order('workout_session_id', { ascending: false })
        .limit(1)

        let nextSessionId = 0
        if (data.length > 0) {
          nextSessionId = data[0].workout_session_id + 1
        } else {
          nextSessionId = 1
        }
        var workoutRows=[]
        for (const [exerciseName, setArr] of Object.entries(inputList)){
          for (const set of setArr){
            workoutRows.push ({
              template_id: templateId,
              exercise: exerciseName,
              reps: set.Reps,
              weight: set.Weight,
              workout_session_id: nextSessionId,
              user_id: userId
            })
          }
        }
        const { error } = await supabase.from('workouts').insert(workoutRows)

        if (!error){
          alert('Workout saved!')
          router.push('/')
        }
    }

    function handleAddSet(exerciseName) {
      const newList = [...inputList[exerciseName], { Reps: "", Weight: "" }]
      setInputList({...inputList, [exerciseName]: newList})
    }

    function handleInputChange(exerciseName, setIndex, field, value) {
      const newList = [...inputList[exerciseName]]
      newList[setIndex][field] = value
      setInputList({...inputList, [exerciseName]: newList})
    }

  if (!template) return <div className={styles.loading}>Loading...</div>

  return (
    <div className={styles.container}>
      <button className={styles.btnGhost} onClick={() => router.push('/')}>Home</button>
      <header className={styles.header}>
        <h1>{template.name}</h1>
      </header>

      <form onSubmit={handleSubmit}>
        {template.exercises.map((exerciseName) => (
          <div key={exerciseName} className={styles.exercise}>
            <h3 className={styles.exerciseName}>{exerciseName}</h3>

            {inputList[exerciseName]?.map((set, i) => (
              <div key={i} className={styles.setRow}>
                <span className={styles.setNumber}>Set {i + 1}</span>
                <div className={styles.setInputGroup}>
                  <div className={styles.setInput}>
                    <input
                      type="number"
                      value={set.Reps}
                      onChange={(e) => handleInputChange(exerciseName, i, 'Reps', e.target.value)}
                      placeholder="Reps"
                      min="0"
                      step="1"
                    />
                  </div>
                  <div className={styles.setInput}>
                    <input
                      type="number"
                      value={set.Weight}
                      onChange={(e) => handleInputChange(exerciseName, i, 'Weight', e.target.value)}
                      placeholder="Weight (lbs)"
                      min="0"
                      step="0.5"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              className={styles.btnAddSet}
              onClick={() => handleAddSet(exerciseName)}
            >
              + Add Set
            </button>
          </div>
        ))}

        <div className={styles.actions}>
          <button type="submit" className={styles.btnFinish}>
            Finish Workout
          </button>
        </div>
      </form>
    </div>
  )
}