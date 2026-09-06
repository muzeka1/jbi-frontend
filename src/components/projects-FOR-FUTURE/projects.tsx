'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ProjectCard from '@/src/components/projects-FOR-FUTURE/project-card/project-card';

import styles from './projects.module.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        imagePosition: 'left' as const,
        image: '/images/renders/3.jpg',
        title: 'Заголовок 1',
        text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
        description: 'Text - text text',
    },
    {
        id: 2,
        imagePosition: 'right' as const,
        image: '/images/renders/3.jpg',
        title: 'Заголовок 2',
        text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
        description: 'Text - text text',
    },
    {
        id: 3,
        imagePosition: 'right' as const,
        image: '/images/renders/3.jpg',
        title: 'Заголовок 3',
        text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
        description: 'Text - text text',
    },
    {
        id: 4,
        imagePosition: 'left' as const,
        image: '/images/renders/3.jpg',
        title: 'Заголовок 4',
        text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
        description: 'Text - text text',
    },
    {
        id: 5,
        imagePosition: 'left' as const,
        image: '/images/renders/3.jpg',
        title: 'Заголовок 5',
        text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
        description: 'Text - text text',
    },
];

export default function Projects() {
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLElement>(
                '[data-project-card]',
            );

            cards.forEach((card) => {
                const image = card.querySelector(
                    '[data-project-image]',
                );

                const content = card.querySelector(
                    '[data-project-content]',
                );

                const imagePosition =
                    card.dataset.imagePosition;

                const imageFrom =
                    imagePosition === 'left'
                        ? '-100%'
                        : '100%';

                const contentFrom =
                    imagePosition === 'left'
                        ? '100%'
                        : '-100%';

                gsap.set(image, {
                    xPercent: imageFrom === '-100%' ? -100 : 100,
                    autoAlpha: 0,
                });

                gsap.set(content, {
                    xPercent:
                        contentFrom === '100%'
                            ? 100
                            : -100,
                    autoAlpha: 0,
                });

                const timeline = gsap.timeline({
                    paused: true,
                });

                timeline
                    .to(
                        image,
                        {
                            xPercent: 0,
                            autoAlpha: 1,
                            duration: 1.1,
                            ease: 'power4.out',
                        },
                        0,
                    )
                    .to(
                        content,
                        {
                            xPercent: 0,
                            autoAlpha: 1,
                            duration: 1.1,
                            ease: 'power4.out',
                        },
                        0.1,
                    );

                ScrollTrigger.create({
                    trigger: card,
                    start: 'top 75%',
                    once: true,

                    onEnter: () => {
                        timeline.play();
                    },
                });
            });
        }, section);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className={styles.projects}
        >
            {projects.map((project) => (
                <ProjectCard
                    key={project.id}
                    imagePosition={project.imagePosition}
                    image={project.image}
                    title={project.title}
                    text={project.text}
                    description={project.description}
                />
            ))}
        </section>
    );
}