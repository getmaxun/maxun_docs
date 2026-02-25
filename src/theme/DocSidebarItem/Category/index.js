import React, {useEffect, useMemo} from 'react';
import clsx from 'clsx';
import {
  ThemeClassNames,
  useThemeConfig,
  usePrevious,
  Collapsible,
  useCollapsible,
} from '@docusaurus/theme-common';
import {isSamePath} from '@docusaurus/theme-common/internal';
import {
  isActiveSidebarItem,
  findFirstSidebarItemLink,
  useDocSidebarItemsExpandedState,
} from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import useIsBrowser from '@docusaurus/useIsBrowser';
import DocSidebarItems from '@theme/DocSidebarItems';
import { GrInstallOption } from "react-icons/gr";
import { BsRobot } from "react-icons/bs";
import { TbApi, TbWorldSearch } from "react-icons/tb";
import { LuBrainCircuit } from "react-icons/lu";
import { AiOutlineApi } from "react-icons/ai";
import { BsCodeSlash } from "react-icons/bs";
import { IoFlashOutline } from "react-icons/io5";
import { FaMarkdown } from "react-icons/fa";
import { LuFocus } from "react-icons/lu";
import { BiCodeBlock } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";

// Map keys are lowercase category labels (exact-match on label)
// Add entries here for every category label you want icons for.
const IconMap = {
  "self-host": GrInstallOption,
  robots: BsRobot,
  "api-reference": TbApi,
  sdk: BiCodeBlock,
  "node-sdk": BiCodeBlock,
  "python-sdk": BiCodeBlock,
  mcp: LuBrainCircuit,
  integrations: AiOutlineApi,
  engineering: BsCodeSlash,
  usecases: IoFlashOutline,
  extract: LuFocus,
  crawl: TbWorldSearch,
  search: FiSearch,
  llmintegrations: LuBrainCircuit,
};

// Helper: normalize label (lowercase, remove spaces)
function normalizeLabelKey(label) {
  if (!label || typeof label !== 'string') return '';
  return label.replace(/\s+/g, '').toLowerCase();
}

// Resolve icon by label first, then fallback to docId/href (optional safety)
function resolveIconForItem(item) {
  const labelKey = normalizeLabelKey(item.label);
  if (labelKey && IconMap[labelKey]) {
    return IconMap[labelKey];
  }

  // fallback: try docId or last segment of href (keeps prior safety)
  const docIdKey = item.docId ? item.docId.toString().toLowerCase() : null;
  if (docIdKey && IconMap[docIdKey]) {
    return IconMap[docIdKey];
  }

  const hrefKey = item.href ? item.href.split('/').filter(Boolean).pop() : null;
  if (hrefKey) {
    const hk = hrefKey.toString().toLowerCase();
    if (IconMap[hk]) return IconMap[hk];
  }

  return null;
}

function useAutoExpandActiveCategory({isActive, collapsed, updateCollapsed}) {
  const wasActive = usePrevious(isActive);
  useEffect(() => {
    const justBecameActive = isActive && !wasActive;
    if (justBecameActive && collapsed) {
      updateCollapsed(false);
    }
  }, [isActive, wasActive, collapsed, updateCollapsed]);
}

function useCategoryHrefWithSSRFallback(item) {
  const isBrowser = useIsBrowser();
  return useMemo(() => {
    if (item.href && !item.linkUnlisted) return item.href;
    if (isBrowser || !item.collapsible) return undefined;
    return findFirstSidebarItemLink(item);
  }, [item, isBrowser]);
}

function CollapseButton({collapsed, categoryLabel, onClick}) {
  return (
    <button
      aria-label={
        collapsed
          ? translate(
              {
                id: 'theme.DocSidebarItem.expandCategoryAriaLabel',
                message: "Expand sidebar category '{label}'",
              },
              {label: categoryLabel},
            )
          : translate(
              {
                id: 'theme.DocSidebarItem.collapseCategoryAriaLabel',
                message: "Collapse sidebar category '{label}'",
              },
              {label: categoryLabel},
            )
      }
      aria-expanded={!collapsed}
      type="button"
      className="clean-btn menu__caret"
      onClick={onClick}
    />
  );
}

export default function DocSidebarItemCategory({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}) {
  const {items, label, collapsible, className, href} = item;

  const {
    docs: {
      sidebar: {autoCollapseCategories},
    },
  } = useThemeConfig();

  const hrefWithSSRFallback = useCategoryHrefWithSSRFallback(item);
  const isActive = isActiveSidebarItem(item, activePath);
  const isCurrentPage = isSamePath(href, activePath);

  const {collapsed, setCollapsed} = useCollapsible({
    initialState: () => {
      if (!collapsible) return false;
      return isActive ? false : item.collapsed;
    },
  });

  const {expandedItem, setExpandedItem} = useDocSidebarItemsExpandedState();
  const updateCollapsed = (toCollapsed = !collapsed) => {
    setExpandedItem(toCollapsed ? null : index);
    setCollapsed(toCollapsed);
  };

  useAutoExpandActiveCategory({isActive, collapsed, updateCollapsed});

  useEffect(() => {
    if (
      collapsible &&
      expandedItem != null &&
      expandedItem !== index &&
      autoCollapseCategories
    ) {
      setCollapsed(true);
    }
  }, [collapsible, expandedItem, index, setCollapsed, autoCollapseCategories]);

  const IconComponent = resolveIconForItem(item);

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemCategory,
        ThemeClassNames.docs.docSidebarItemCategoryLevel(level),
        'menu__list-item',
        {'menu__list-item--collapsed': collapsed},
        className,
      )}>
      <div
        className={clsx('menu__list-item-collapsible', {
          'menu__list-item-collapsible--active': isCurrentPage,
        })}>
        <Link
          className={clsx('menu__link', {
            'menu__link--sublist': collapsible,
            'menu__link--sublist-caret': !href && collapsible,
            'menu__link--active': isActive,
          })}
          onClick={
            collapsible
              ? (e) => {
                  onItemClick?.(item);
                  if (href) updateCollapsed(false);
                  else {
                    e.preventDefault();
                    updateCollapsed();
                  }
                }
              : () => onItemClick?.(item)
          }
          aria-current={isCurrentPage ? 'page' : undefined}
          role={collapsible && !href ? 'button' : undefined}
          aria-expanded={collapsible && !href ? !collapsed : undefined}
          href={collapsible ? hrefWithSSRFallback ?? '#' : hrefWithSSRFallback}
          {...props}>

          {/* ICON (hardcoded map by label) */}
          {IconComponent && (
            <IconComponent
              style={{
                marginRight: '8px',
                minWidth: '20px',
                fontSize: '1.2em',
                verticalAlign: 'middle',
              }}
              aria-hidden
            />
          )}

          {label}
        </Link>

        {href && collapsible && (
          <CollapseButton
            collapsed={collapsed}
            categoryLabel={label}
            onClick={(e) => {
              e.preventDefault();
              updateCollapsed();
            }}
          />
        )}
      </div>

      <Collapsible lazy as="ul" className="menu__list" collapsed={collapsed}>
        <DocSidebarItems
          items={items}
          tabIndex={collapsed ? -1 : 0}
          onItemClick={onItemClick}
          activePath={activePath}
          level={level + 1}
        />
      </Collapsible>
    </li>
  );
}