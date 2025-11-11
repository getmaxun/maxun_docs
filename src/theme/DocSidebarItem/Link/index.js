import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { isActiveSidebarItem } from "@docusaurus/plugin-content-docs/client";
import Link from "@docusaurus/Link";
import isInternalUrl from "@docusaurus/isInternalUrl";
import IconExternalLink from "@theme/Icon/ExternalLink";
import styles from "./styles.module.css";
import { FaRocket, FaBrain, FaRegGem, FaMicrochip } from "react-icons/fa";

const IconMap = {
  rocket: FaRocket,
  brain: FaBrain,
  gem: FaRegGem,
  chip: FaMicrochip,
};

// ✅ Manual icon mapping (use docId OR href)
const SidebarIconMap = {
  intro: "rocket",
  "/docs/intro": "rocket",

  runs: "chip",
  "/docs/runs": "chip",
};

export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}) {
  const { href, label, className, autoAddBaseUrl } = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);

  //  Pick icon based on docId or href
  const iconKey = SidebarIconMap[item.docId] ?? SidebarIconMap[href] ?? null;
  const IconComponent = iconKey ? IconMap[iconKey] : null;

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        "menu__list-item",
        className
      )}
      key={label}
    >
      <Link
        className={clsx("menu__link", !isInternalLink && styles.menuExternalLink, {
          "menu__link--active": isActive,
        })}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? "page" : undefined}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        {...props}
      >
        {IconComponent && (
          <IconComponent
            style={{
              marginRight: "8px",
              minWidth: "20px",
              fontSize: "1.2em",
              verticalAlign: "middle",
            }}
          />
        )}

        {label}
        {!isInternalLink && <IconExternalLink />}
      </Link>
    </li>
  );
}
