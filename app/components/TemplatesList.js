import styles from './TemplatesList.module.css';

export default function TemplatesList({ templates, onSelect }) {
  return (
    <div className={styles.grid} role="list">
      {templates.map((t) => (
        <button
          key={t.id}
          className={styles.card}
          onClick={() => onSelect(t)}
          role="listitem"
        >
          <div className={styles.name}>{t.name}</div>
          <div className={styles.exercises}>
            {t.exercises?.length || 0} exercise{t.exercises?.length !== 1 ? 's' : ''}
          </div>
        </button>
      ))}
    </div>
  )
}