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
import { MdOutlineInfo } from "react-icons/md";
import { TbHandClick } from "react-icons/tb";
import { HiOutlineDuplicate } from "react-icons/hi";
import { MdOutlineSchedule } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import { LiaRedoAltSolid } from "react-icons/lia";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import { VscRunAll } from "react-icons/vsc";
import { FiDatabase } from "react-icons/fi";
import { LuCable } from "react-icons/lu";
import { VscTools } from "react-icons/vsc";
import { FiUnlock } from "react-icons/fi";
import { SiGooglesheets } from "react-icons/si";
import { TbBrandAirtable } from "react-icons/tb";
import { SiN8N } from "react-icons/si";
import { HiLanguage } from "react-icons/hi2";
import { GoRepoForked } from "react-icons/go";
import { FiGithub } from "react-icons/fi";
import { CiCloudOn } from "react-icons/ci";


const IconMap = {
  introBook: HiOutlineBookOpen,
  docker: TbBrandDocker,
  local: RiComputerLine,
  environment_variables: FiSettings,
  upgrade: GrUpgrade,
  robots_overview: MdOutlineInfo,
  robots_actions: TbHandClick,
  robots_duplicate: HiOutlineDuplicate,
  robots_schedule: MdOutlineSchedule,
  robots_options: SlOptions,
  robots_retrain: LiaRedoAltSolid,
  self_host: AiOutlineDeploymentUnit,
  runs: VscRunAll,
  deep_extraction: FiDatabase,
  byop: LuCable,
  mcpSetup: FiSettings,
  mcpTools: VscTools,
  extract_login: FiUnlock,
  gsheet: SiGooglesheets,
  n8n: SiN8N,
  airtable: TbBrandAirtable,
  i18n: HiLanguage,
  repo: GoRepoForked,
  contribute: FiGithub,
  cloud_vs_oss: CiCloudOn,
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
  // ROBOTS
  robots_overview: "robots_overview",
  "robot/robots": "robots_overview",
  robots_actions: "robots_actions",
  "robot/robot-actions": "robots_actions",
  robots_duplicate: "robots_duplicate",
  "robot/robot-duplicate": "robots_duplicate",
  robots_schedule: "robots_schedule",
  "robot/robot-schedule": "robots_schedule",
  robots_options: "robots_options",
  "robot/robot-options": "robots_options",
  robots_retrain: "robots_retrain",
  "robot/robot-retrain": "robots_retrain",
  // SELF-HOST
  self_host: "self_host",
  "/docs/self-host": "self_host",
  // RUNS
  runs: "runs",
  "/docs/runs": "runs",
  // DEEP EXTRACT
  "deep-extraction": "deep_extraction",
  "/docs/deep-extraction": "deep_extraction",
  // BYOP
  byop: "byop",
  "/docs/byop": "byop",
  // MCP 
  mcpSetup: "mcpSetup",
  "/mcp/setup": "mcpSetup",
  mcpTools: "mcpTools",
  "/mcp/tools": "mcpTools",
  "extract-login": "extract_login",
  "/docs/extract-login": "extract_login",
  // INTEGRATIONS
  gsheet: "gsheet",
  "integrations/gsheet": "gsheet",
  n8n: "n8n",
  "integrations/n8n": "n8n",
  airtable: "airtable",
  "integrations/airtable": "airtable",
  // DEVELOPMENT
  i18n: "i18n",
  "/development/i18n": "i18n",
  repo: "repo",
  "/development/repo": "repo",
  contribute: "contribute",
  "/development/contributing": "contribute",
  cloud_vs_oss: "cloud_vs_oss",
  "/docs/cloud-vs-oss": "cloud_vs_oss",
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
