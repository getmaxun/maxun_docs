import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import {HiOutlineBookOpen, HiSparkles} from 'react-icons/hi2';
import {TbApi} from 'react-icons/tb';
import {VscCode} from 'react-icons/vsc';
import styles from './styles.module.css';

// One tab per sidebar defined in sidebars.js.
export const SIDEBAR_TABS = [
  {sidebar: 'docsSidebar', label: 'Documentation', to: '/', icon: HiOutlineBookOpen},
  {sidebar: 'aiSidebar', label: 'AI', to: '/ai', icon: HiSparkles},
  {sidebar: 'apiSidebar', label: 'API Reference', to: '/api/api', icon: TbApi},
  {sidebar: 'sdkSidebar', label: 'SDKs', to: '/sdks', icon: VscCode},
];

/**
 * Tab switcher between the doc sidebars.
 * - "vertical": stacked list shown at the top of the desktop sidebar
 * - "horizontal": scrollable strip shown above the page on small screens
 */
export default function SidebarTabs({variant = 'vertical', className}) {
  const sidebar = useDocsSidebar();
  const active = sidebar?.name ?? 'docsSidebar';

  return (
    <nav
      aria-label="Documentation sections"
      className={clsx(
        styles.tabs,
        variant === 'horizontal' ? styles.horizontal : styles.vertical,
        className,
      )}>
      {SIDEBAR_TABS.map(({sidebar: name, label, to, icon: Icon}) => {
        const isActive = name === active;
        return (
          <Link
            key={name}
            to={to}
            className={clsx(styles.tab, isActive && styles.active)}
            aria-current={isActive ? 'page' : undefined}>
            <span className={styles.icon}>
              <Icon aria-hidden="true" />
            </span>
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
