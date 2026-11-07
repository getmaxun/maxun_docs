import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {useActiveDocContext} from '@docusaurus/plugin-content-docs/client';
import styles from './styles.module.css';

// One tab per sidebar in sidebars.js. `paths` decides the active tab on pages
// that are not docs (such as /category/... index pages).
export const DOCS_TABS = [
  {sidebar: 'docsSidebar', label: 'Documentation', to: '/'},
  {sidebar: 'aiSidebar', label: 'AI', to: '/ai', paths: ['/ai', '/category/mcp']},
  {sidebar: 'apiSidebar', label: 'API Reference', to: '/api/api', paths: ['/api/']},
  {
    sidebar: 'sdkSidebar',
    label: 'SDKs',
    to: '/sdks',
    paths: ['/sdks', '/sdk/', '/cli/', '/category/node-sdk', '/category/python-sdk', '/category/cli'],
  },
];

function useActiveTab() {
  const {activeDoc} = useActiveDocContext(undefined);
  const {pathname} = useLocation();
  if (activeDoc?.sidebar) return activeDoc.sidebar;
  const match = DOCS_TABS.find((tab) => tab.paths?.some((p) => pathname.startsWith(p)));
  return match?.sidebar ?? 'docsSidebar';
}

export default function DocsTabs() {
  const active = useActiveTab();
  return (
    <div className={styles.bar}>
      <div className={styles.tabs} role="tablist" aria-label="Documentation sections">
        {DOCS_TABS.map(({sidebar, label, to}) => {
          const isActive = sidebar === active;
          return (
            <Link
              key={sidebar}
              to={to}
              role="tab"
              aria-selected={isActive}
              className={clsx(styles.tab, isActive && styles.active)}>
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
