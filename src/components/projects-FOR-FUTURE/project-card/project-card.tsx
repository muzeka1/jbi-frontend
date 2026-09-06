import Image from 'next/image';

import styles from './project-card.module.css';

type ProjectCardProps = {
    imagePosition: 'left' | 'right';
    image: string;
    title: string;
    text: string;
    description: string;
};

export default function ProjectCard({
    imagePosition,
    image,
    title,
    text,
    description,
}: ProjectCardProps) {
    return (
        <article
            data-project-card
            data-image-position={imagePosition}
            className={`${styles.card} ${
                imagePosition === 'right'
                    ? styles.imageRight
                    : styles.imageLeft
            }`}
        >
            <div
                data-project-image
                className={styles.imageWrapper}
            >
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="50vw"
                    className={styles.image}
                />
            </div>

            <div
                data-project-content
                className={styles.content}
            >
                <span className={styles.description}>
                    {description}
                </span>

                <h2 className={styles.title}>
                    {title}
                </h2>

                <p className={styles.text}>
                    {text}
                </p>
            </div>
        </article>
    );
}