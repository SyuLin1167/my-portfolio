import { useEffect } from 'react';
import { SCROLL_CONFIG } from '../constants/animation';

/**
 * トップへ戻るボタンの表示制御
 */
export function useScrollToTop() {
  useEffect(() => {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (!scrollTopBtn) return;

    const handleScroll = () => {
      const show = window.scrollY > SCROLL_CONFIG.SHOW_TOP_BUTTON_THRESHOLD;
      scrollTopBtn.style.display = show ? 'block' : 'none';
    };

    const handleClick = () => {
      window.scrollTo({ top: 0, behavior: SCROLL_CONFIG.SMOOTH_SCROLL_BEHAVIOR });
    };

    window.addEventListener('scroll', handleScroll);
    scrollTopBtn.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      scrollTopBtn.removeEventListener('click', handleClick);
    };
  }, []);
}
