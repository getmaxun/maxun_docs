import React, { useState, useEffect, useRef } from "react";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import { FiCopy } from "react-icons/fi";
import { LuFileCode2 } from "react-icons/lu";
import styles from "./styles.module.css";

function normalizeSourcePath(rawSource) {
  if (!rawSource) return "";
  // Remove alias like "@site/" or "@/":
  let s = rawSource.replace(/^@site[\\/]/, "");
  s = s.replace(/^@\//, "");
  // Remove leading slashes
  s = s.replace(/^\/+/, "");
  return s;
}

export default function CopyPageDropdown() {
  const { metadata } = useDoc();
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null); // {type: 'success'|'error', text}
  const toastTimer = useRef(null);

  // ---------- CONFIG ----------
  const RAW_BASE = "https://raw.githubusercontent.com/getmaxun/maxun_docs/master/";
  // ----------------------------

  // metadata.source may be:
  // - "docs/intro.md"
  // - "@site/docs/intro.md"
  // - "/docs/intro.md"
  const sourcePath = normalizeSourcePath(metadata?.source);
  const rawUrl = `${RAW_BASE}${sourcePath}`;

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }

  async function handleCopyMarkdown() {
    try {
      const res = await fetch(rawUrl, { cache: "no-store" });
      if (!res.ok) {
        throw new Error(`fetch ${res.status}`);
      }
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      showToast("Markdown copied!");
    } catch (err) {
      // Helpful debug in console
      // eslint-disable-next-line no-console
      console.error("Copy markdown failed:", err, rawUrl);
      showToast("Failed to copy markdown");
    } finally {
      setOpen(false);
    }
  }

  function handleOpenMarkdown() {
    // open in new tab (raw github)
    window.open(rawUrl, "_blank", "noopener");
    setOpen(false);
  }

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <FiCopy size={16} />
        <span style={{ marginLeft: 8 }}>Copy page</span>
      </button>

      {open && (
        <div role="menu" className={styles.dropdown}>
          <div
            role="menuitem"
            tabIndex={0}
            className={styles.item}
            onClick={handleCopyMarkdown}
            onKeyDown={(e) => e.key === "Enter" && handleCopyMarkdown()}
          >
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <FiCopy size={15} />
              <div>
                <div>Copy page</div>
                <small style={{ fontSize: "11px"}}>Copy this page as Markdown for LLMs</small>
              </div>
            </div>
          </div>

          <div
            role="menuitem"
            tabIndex={0}
            className={styles.item}
            onClick={handleOpenMarkdown}
            onKeyDown={(e) => e.key === "Enter" && handleOpenMarkdown()}
          >
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <LuFileCode2 size={15} />
              <div>
                <div>View as Markdown</div>
                <small style={{ fontSize: "11px"}}>View page in plain text</small>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={styles.toast}>
          {toast}
        </div>
      )}
    </div>
  );
}

