import { useEffect } from 'react';
import { ANIMATION_TIMINGS, CURSOR_TRAIL_CONFIG } from '../constants/animation';

/**
 * マウスカーソルに追従する軌跡エフェクト（PC非タッチのみ）
 */
export function useCursorTrail() {
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isNarrow = window.innerWidth <= 640;

    if (isTouch || isNarrow) return;

    let trailContainer: HTMLDivElement | null = null;
    let rafId = 0;

    const dots: { el: HTMLDivElement; x: number; y: number }[] = [];
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    // トレイル要素の初期化
    trailContainer = document.createElement('div');
    trailContainer.className = 'cursor-trail-container';
    document.body.appendChild(trailContainer);

    for (let i = 0; i < CURSOR_TRAIL_CONFIG.DOT_COUNT; i++) {
      const el = document.createElement('div');
      el.className = 'cursor-trail-dot';
      el.style.setProperty('--i', String(i));
      trailContainer.appendChild(el);
      dots.push({ el, x: target.x, y: target.y });
    }

    // イベントハンドラ
    const handlePointerMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const handleMouseLeave = () => {
      target.x = window.innerWidth / 2;
      target.y = window.innerHeight / 2;
    };

    // イージング関数
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // アニメーションループ
    const tick = () => {
      dots.forEach((d) => {
        d.x = lerp(d.x, target.x, ANIMATION_TIMINGS.CURSOR_TRAIL_EASE);
        d.y = lerp(d.y, target.y, ANIMATION_TIMINGS.CURSOR_TRAIL_EASE);
        d.el.style.transform = `translate(${d.x}px, ${d.y}px)`;
      });
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    rafId = requestAnimationFrame(tick);

    // クリーンアップ
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (trailContainer) {
        trailContainer.remove();
      }
      cancelAnimationFrame(rafId);
    };
  }, []);
}
