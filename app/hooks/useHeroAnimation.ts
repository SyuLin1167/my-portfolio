import { useEffect } from 'react';

/**
 * ヒーロー要素の初期アニメーション（回転演出）
 */
export function useHeroAnimation() {
  useEffect(() => {
    const hero = document.querySelector<HTMLDivElement>('.hero');
    if (!hero) return;

    hero.classList.add('hero-visible', 'rotate-init');
    const avatar = hero.querySelector<HTMLImageElement>('.hero-avatar');

    if (avatar) {
      const onAnimationEnd = (e: AnimationEvent) => {
        if (e.animationName === 'rotateOnce') {
          hero.classList.remove('rotate-init');
          avatar.removeEventListener('animationend', onAnimationEnd);
        }
      };
      avatar.addEventListener('animationend', onAnimationEnd);

      return () => avatar.removeEventListener('animationend', onAnimationEnd);
    }
  }, []);
}
