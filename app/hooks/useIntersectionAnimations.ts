import { useEffect } from 'react';
import { ANIMATION_THRESHOLDS } from '../constants/animation';

/**
 * IntersectionObserverを使用した要素の可視化アニメーション
 */
export function useIntersectionAnimations() {
  useEffect(() => {
    // スキルバーアニメーション
    const bars = Array.from(document.querySelectorAll<HTMLDivElement>('.bar-fill'));
    if ('IntersectionObserver' in window && bars.length) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLDivElement;
              const percent = el.getAttribute('data-percent');
              if (percent) {
                el.classList.add('in-view');
                el.style.width = `${percent}%`;
              }
              io.unobserve(el);
            }
          });
        },
        { threshold: ANIMATION_THRESHOLDS.SKILL_BAR }
      );
      bars.forEach((b) => io.observe(b));

      return () => {
        bars.forEach((b) => io.unobserve(b));
      };
    }
  }, []);

  // セクションカードのフェードイン
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.section-card'));
    if ('IntersectionObserver' in window && cards.length) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: ANIMATION_THRESHOLDS.SECTION_CARD }
      );
      cards.forEach((c) => io.observe(c));

      return () => {
        cards.forEach((c) => io.unobserve(c));
      };
    }
  }, []);

  // ヒストリーアイテムのステッガーアニメーション
  useEffect(() => {
    const historyItems = Array.from(
      document.querySelectorAll<HTMLElement>('#history .history-item')
    );
    if ('IntersectionObserver' in window && historyItems.length) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: ANIMATION_THRESHOLDS.HISTORY_ITEM }
      );
      historyItems.forEach((item, idx) => {
        item.style.setProperty('--stagger', `${idx * 60}ms`);
        io.observe(item);
      });

      return () => {
        historyItems.forEach((item) => io.unobserve(item));
      };
    }
  }, []);
}
