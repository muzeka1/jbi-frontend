import Link from 'next/link';

import styles from './header.module.css';

const navigation = [
  {
    label: 'Главная',
    href: '/',
  },
  {
    label: 'О нас',
    href: '/about',
  },
  {
    label: 'Проекты',
    href: '/projects',
  },
  {
    label: 'Контакты',
    href: '/contacts',
  },
];

export default function Nav() {
  return (
    <nav className={styles.nav} aria-label="Основная навигация">
      <ul className={styles.list}>
        {navigation.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={styles.link}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

