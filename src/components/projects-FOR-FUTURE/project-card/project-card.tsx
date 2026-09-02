
import styles from './project-card.module.css';

type ProjectCardProps = {
  number: number;
  color: string;
};

export default function ProjectCard({
  number,
  color,
}: ProjectCardProps) {
  return (
    <article
      className={styles.card}
      style={{
        backgroundColor: color,
      }}
    >
      <span className={styles.number}>
        {number}
      </span>
    </article>
  );
}
