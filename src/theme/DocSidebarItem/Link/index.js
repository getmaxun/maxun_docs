import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { isActiveSidebarItem } from "@docusaurus/plugin-content-docs/client";
import Link from "@docusaurus/Link";
import isInternalUrl from "@docusaurus/isInternalUrl";
import IconExternalLink from "@theme/Icon/ExternalLink";
import styles from "./styles.module.css";
import { FaRocket, FaMarkdown } from "react-icons/fa";
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
import { FaQuestion } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";
import { MdOutlineWebhook } from "react-icons/md";
import { PiStarFourLight } from "react-icons/pi";
import { HiSparkles } from "react-icons/hi2";
import { MdOutlineViewList } from "react-icons/md";
import { BiExtension } from "react-icons/bi";
import { FiScissors } from "react-icons/fi";
import { MdManageAccounts } from "react-icons/md";
import { TbWorldSearch } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { SiLangchain, SiOpenai } from "react-icons/si";
import { TbGraph, TbFileSearch } from "react-icons/tb";
import { RiRobot2Line } from "react-icons/ri";
import { IoTriangleSharp } from "react-icons/io5";

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
  faq: FaQuestion,
  api_key: IoKeyOutline,
  robot_api: FiSettings,
  runs_api: VscRunAll,
  webhooks: MdOutlineWebhook,
  quickstart: FaRocket,
  usecases: PiStarFourLight,
  scrape_robots: FaMarkdown,
  llm_extraction: HiSparkles,
  llm_prompts: HiSparkles,
  sdk_overview: MdOutlineViewList,
  sdk_extract: BiExtension,
  sdk_scrape: FiScissors,
  sdk_crawl: TbWorldSearch,
  sdk_search: FiSearch,
  sdk_robot: MdManageAccounts,
  crawl_introduction: MdOutlineInfo,
  crawl_configuration: FiSettings,
  langchain: SiLangchain,
  langgraph: TbGraph,
  llamaindex: TbFileSearch,
  mastra: RiRobot2Line,
  openai: SiOpenai,
  vercel_ai_sdk: IoTriangleSharp,
  search_introduction: MdOutlineInfo,
  search_configuration: FiSettings,
  stealth: RiRobot2Line,
};

// manual icon mapping (use docId OR href)
const SidebarIconMap = {
  intro: "introBook",
  "/intro": "introBook",
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
  scrape_robots: "scrape_robots",
  "robot/scrape": "scrape_robots",
  robots_overview: "robots_overview",
  "robot/robots": "robots_overview",
  robots_actions: "robots_actions",
  "robot/extract/robot-actions": "robots_actions",
  robots_duplicate: "robots_duplicate",
  "robot/extract/robot-duplicate": "robots_duplicate",
  robots_schedule: "robots_schedule",
  "robot-schedule": "robots_schedule",
  robots_options: "robots_options",
  "robot/extract/robot-options": "robots_options",
  robots_retrain: "robots_retrain",
  "robot/extract/robot-retrain": "robots_retrain",
  llm_extraction: "llm_extraction",
  "robot/extract/llm-extraction": "llm_extraction",
  // CRAWL
  "crawl-introduction": "crawl_introduction",
  "robot/crawl/crawl-introduction": "crawl_introduction",
  "crawl-configuration": "crawl_configuration",
  "robot/crawl/crawl-configuration": "crawl_configuration",
  // SEARCH
  "search-introduction": "search_introduction",
  "robot/search/search-introduction": "search_introduction",
  "search-configuration": "search_configuration",
  "robot/search/search-configuration": "search_configuration",
  // SELF-HOST
  self_host: "self_host",
  "/self-host": "self_host",
  // RUNS
  runs: "runs",
  "/runs": "runs",
  // DEEP EXTRACT
  "deep-extraction": "deep_extraction",
  "/deep-extraction": "deep_extraction",
  "stealth": "stealth",
  // BYOP
  byop: "byop",
  "/byop": "byop",
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
  langchain: "langchain",
  "integrations/langchain": "langchain",
  langgraph: "langgraph",
  "integrations/langgraph": "langgraph",
  llamaindex: "llamaindex",
  "integrations/llamaindex": "llamaindex",
  mastra: "mastra",
  "integrations/mastra": "mastra",
  openai: "openai",
  "integrations/openai": "openai",
  "vercel-ai-sdk": "vercel_ai_sdk",
  "integrations/vercel-ai-sdk": "vercel_ai_sdk",
  // DEVELOPMENT
  i18n: "i18n",
  "/development/i18n": "i18n",
  repo: "repo",
  "/development/repo": "repo",
  contribute: "contribute",
  "/development/contributing": "contribute",
  cloud_vs_oss: "cloud_vs_oss",
  "/cloud-vs-oss": "cloud_vs_oss",
  faq: "faq",
  "/faq-robot": "faq",
  "llm-prompts": "llm_prompts",
  "/llm-prompts": "llm_prompts",
  // API
  api_key: "api_key",
  "/api/api": "api_key",
  robot_api: "robot_api",
  "/api/robot-api": "robot_api",
  runs_api: "runs_api",
  "/api/run-api": "runs_api",
  webhooks: "webhooks",
  "/api/webhooks": "webhooks",
  quickstart: "quickstart",
  "/quickstart": "quickstart",
  // USE CASES
  content_aggregation: "usecases",
  "/usecases/content_aggregation": "usecases",
  market_research: "usecases",
  "/usecases/market_research": "usecases",
  lead_generation: "usecases",
  "/usecases/lead_generation": "usecases",
  ecommerce_automation: "usecases",
  "/usecases/ecommerce_automation": "usecases",
    real_estate: "usecases",
  "/usecases/real_estate": "usecases",
    academic_research: "usecases",
  "/usecases/academic_research": "usecases",
  // SDK
  "sdk-overview": "sdk_overview",
  "/sdk/sdk-overview": "sdk_overview",
  "sdk-extract": "sdk_extract",
  "/sdk/sdk-extract": "sdk_extract",
  "sdk-scrape": "sdk_scrape",
  "/sdk/sdk-scrape": "sdk_scrape",
  "sdk-crawl": "sdk_crawl",
  "/sdk/sdk-crawl": "sdk_crawl",
  "sdk-search": "sdk_search",
  "/sdk/sdk-search": "sdk_search",
  "sdk-robot": "sdk_robot",
  "/sdk/sdk-robot": "sdk_robot",
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
