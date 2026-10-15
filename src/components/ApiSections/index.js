import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

/**
 * Grid of cards linking to the sections of an API reference page.
 *
 * Usage in a doc:
 *   <ApiSections items={[{ title: 'Runs', href: '#runs', description: 'Start and follow runs' }]} />
 */
export default function ApiSections({ items }) {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <Link key={item.href} to={item.href} className={styles.card}>
          <span className={styles.title}>{item.title}</span>
          <span className={styles.description}>{item.description}</span>
          {item.endpoints ? <code className={styles.endpoints}>{item.endpoints}</code> : null}
        </Link>
      ))}
    </div>
  );
}
