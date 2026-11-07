import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import {FaGithub, FaRegStar} from 'react-icons/fa';
import styles from './styles.module.css';

const CACHE_TTL_MS = 60 * 60 * 1000; // refetch at most once an hour per visitor

function formatStars(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 100000 ? 0 : 1).replace(/\.0$/, '')}k`;
  return String(n);
}

function readCache(key) {
  try {
    const cached = JSON.parse(localStorage.getItem(key) || 'null');
    if (cached && Date.now() - cached.at < CACHE_TTL_MS) return cached.stars;
  } catch {}
  return null;
}

function writeCache(key, stars) {
  try {
    localStorage.setItem(key, JSON.stringify({stars, at: Date.now()}));
  } catch {}
}

/** GitHub stars for `repo` ("owner/name"), or null until loaded / on error. */
function useStars(repo) {
  const [stars, setStars] = useState(null);
  useEffect(() => {
    const key = `gh-stars:${repo}`;
    const cached = readCache(key);
    if (cached != null) {
      setStars(cached);
      return undefined;
    }
    const controller = new AbortController();
    fetch(`https://api.github.com/repos/${repo}`, {signal: controller.signal})
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data) => {
        if (typeof data.stargazers_count === 'number') {
          setStars(data.stargazers_count);
          writeCache(key, data.stargazers_count);
        }
      })
      .catch(() => {});
    return () => controller.abort();
  }, [repo]);
  return stars;
}

/**
 * Navbar item: GitHub link with the repository's star count.
 * Config: {type: 'custom-githubStars', repo: 'getmaxun/maxun', label: 'GitHub', position: 'right'}
 */
export default function GitHubStars({repo, label = 'GitHub', mobile = false, className}) {
  const stars = useStars(repo);
  const href = `https://github.com/${repo}`;
  const title = stars != null ? `${stars.toLocaleString()} stars on GitHub` : 'Star us on GitHub';

  const content = (
    <>
      <FaGithub className={styles.logo} aria-hidden="true" />
      <span>{label}</span>
      {stars != null && (
        <span className={styles.stars}>
          <FaRegStar aria-hidden="true" />
          {formatStars(stars)}
        </span>
      )}
    </>
  );

  if (mobile) {
    return (
      <li className="menu__list-item">
        <a className={clsx('menu__link', styles.link)} href={href} target="_blank" rel="noopener noreferrer" title={title}>
          {content}
        </a>
      </li>
    );
  }

  return (
    <a
      className={clsx('navbar__item', 'navbar__link', styles.link, className)}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}>
      {content}
    </a>
  );
}
