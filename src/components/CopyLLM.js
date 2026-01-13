import React, { useState, useEffect, useRef } from "react";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import { FiCopy } from "react-icons/fi";
import { LuFileCode2 } from "react-icons/lu";
import { SiOpenai, SiGoogle, SiAnthropic } from "react-icons/si";
import styles from "./styles.module.css";

function normalizeSourcePath(rawSource) {
  if (!rawSource) return "";
  let s = rawSource.replace(/^@site[\\/]/, "");
  s = s.replace(/^@\//, "");
  s = s.replace(/^\/+/, "");
  return s;
}

function encode(str) {
  return encodeURIComponent(str);
}

export default function CopyPageDropdown() {
  const { metadata } = useDoc();

  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const wrapperRef = useRef(null);
  const toastTimer = useRef(null);

  // ---------- CONFIG ----------
  const RAW_BASE =
    "https://raw.githubusercontent.com/getmaxun/maxun_docs/master/";
  // ----------------------------

  const sourcePath = normalizeSourcePath(metadata?.source);
  const rawUrl = `${RAW_BASE}${sourcePath}`;

  // Cleanup toast timer
  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
      }
    };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleOutsideClick(e) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(e) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  function showToast(text) {
    setToast(text);
    toastTimer.current = window.setTimeout(() => {
      setToast(null);
    }, 2000);
  }

  async function handleCopyMarkdown() {
    try {
      const res = await fetch(rawUrl, { cache: "no-store" });
      if (!res.ok) throw new Error(`fetch ${res.status}`);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      showToast("Markdown copied!");
    } catch (err) {
      console.error("Copy markdown failed:", err);
      showToast("Failed to copy markdown");
    } finally {
      setOpen(false);
    }
  }

  function handleOpenMarkdown() {
    window.open(rawUrl, "_blank", "noopener");
    setOpen(false);
  }

  function openInChatGPT() {
    const prompt = `Please read and analyze this markdown:\n${rawUrl}`;
    window.open(
      `https://chat.openai.com/?q=${encode(prompt)}`,
      "_blank",
      "noopener"
    );
    setOpen(false);
  }

  function openInClaude() {
    const prompt = `Read this markdown and help me:\n${rawUrl}`;
    window.open(
      `https://claude.ai/new?q=${encode(prompt)}`,
      "_blank",
      "noopener"
    );
    setOpen(false);
  }

  function openInGemini() {
    const prompt = `Analyze this markdown page:\n${rawUrl}`;
    window.open(
      `https://gemini.google.com/app?q=${encode(prompt)}`,
      "_blank",
      "noopener"
    );
    setOpen(false);
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        className={styles.button}
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <FiCopy size={16} />
        <span style={{ marginLeft: 8 }}>Copy page</span>
      </button>

      {open && (
        <div role="menu" className={styles.dropdown}>
          {/* Copy markdown */}
          <div
            role="menuitem"
            tabIndex={0}
            className={styles.item}
            onClick={handleCopyMarkdown}
            onKeyDown={e => e.key === "Enter" && handleCopyMarkdown()}
          >
            <FiCopy size={15} />
            <div>
              <div>Copy page</div>
              <small>Copy this page as Markdown for LLMs</small>
            </div>
          </div>

          {/* View markdown */}
          <div
            role="menuitem"
            tabIndex={0}
            className={styles.item}
            onClick={handleOpenMarkdown}
            onKeyDown={e => e.key === "Enter" && handleOpenMarkdown()}
          >
            <LuFileCode2 size={15} />
            <div>
              <div>View as Markdown</div>
              <small>View page in plain text</small>
            </div>
          </div>

          <div className={styles.divider} />

          {/* Open in LLMs */}
          <div className={styles.item} onClick={openInChatGPT}>
            <SiOpenai size={15} />
            <div>Open in ChatGPT</div>
          </div>

          <div className={styles.item} onClick={openInClaude}>
            <SiAnthropic size={15} />
            <div>Open in Claude</div>
          </div>

          <div className={styles.item} onClick={openInGemini}>
            <SiGoogle size={15} />
            <div>Open in Gemini</div>
          </div>
        </div>
      )}

      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
}
