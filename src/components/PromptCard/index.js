import React, {useState} from 'react';
import {FiCopy, FiCheck} from 'react-icons/fi';
import {SiOpenai, SiAnthropic} from 'react-icons/si';
import {HiSparkles} from 'react-icons/hi2';
import styles from './styles.module.css';

/**
 * A ready-to-paste prompt for an AI agent, with copy and "open in" buttons.
 *
 * <PromptCard title="Set up Maxun">{`prompt text`}</PromptCard>
 */
export default function PromptCard({title = 'Prompt', children}) {
  const prompt = String(children ?? '').trim();
  const [copied, setCopied] = useState(false);
  const q = encodeURIComponent(prompt);

  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy prompt failed:', err);
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>
          <HiSparkles aria-hidden="true" /> {title}
        </span>
        <div className={styles.actions}>
          <a
            className={styles.button}
            href={`https://claude.ai/new?q=${q}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in Claude">
            <SiAnthropic aria-hidden="true" />
            <span className={styles.label}>Claude</span>
          </a>
          <a
            className={styles.button}
            href={`https://chatgpt.com/?q=${q}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in ChatGPT">
            <SiOpenai aria-hidden="true" />
            <span className={styles.label}>ChatGPT</span>
          </a>
          <button type="button" className={`${styles.button} ${styles.primary}`} onClick={copy}>
            {copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
            <span>{copied ? 'Copied' : 'Copy prompt'}</span>
          </button>
        </div>
      </div>
      <pre className={styles.body}>{prompt}</pre>
    </div>
  );
}
