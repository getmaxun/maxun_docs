import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { isActiveSidebarItem } from "@docusaurus/plugin-content-docs/client";
import Link from "@docusaurus/Link";
import isInternalUrl from "@docusaurus/isInternalUrl";
import IconExternalLink from "@theme/Icon/ExternalLink";
import styles from "./styles.module.css";
import { FaRocket, FaBrain, FaRegGem, FaMicrochip } from "react-icons/fa";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { TbBrandDocker } from "react-icons/tb";
import { RiComputerLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { GrUpgrade } from "react-icons/gr";



const IconMap = {
  introBook: HiOutlineBookOpen,
  docker: TbBrandDocker,
  local: RiComputerLine,
  environment_variables: FiSettings,
  upgrade: GrUpgrade,
  gem: FaRegGem,
  chip: FaMicrochip,
  rocket: FaRocket,
};

// manual icon mapping (use docId OR href)
const SidebarIconMap = {
  intro: "introBook",
  "/docs/intro": "introBook",
  // INSTALLATION OSS
  docker: "docker",
  "/installation/docker": "docker",
  local: "local",
  "/installation/local": "local",
  environment_variables: "environment_variables",
  "/installation/environment_variables": "environment_variables",
  upgrade: "upgrade",
  "/installation/upgrade": "upgrade",

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
  console.log("item", item);
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
