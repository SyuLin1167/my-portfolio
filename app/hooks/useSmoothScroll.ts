import { useEffect } from 'react';

/**
 * スムーススクロール機能
 * #で始まるリンクをクリックしたときに該当要素へスムーズスクロール
 */
export function useSmoothScroll() {
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest<HTMLAnchorElement>('a[href^="#"]');

      if (!link) return;

      const id = link.getAttribute('href')?.substring(1);
      if (!id) return;

      const element = document.getElementById(id);
      if (!element) return;

      event.preventDefault();
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);
}
