import { useEffect } from "react";

/**
 * Prism.js を動的に読み込み、指定言語まで初期化するユーティリティ。
 * CDNが使えない場合は最小限で resolve し、呼び出し側でフォールバックを行う想定。
 */
export function usePrism(languages: string[] = []) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ensureTheme = () => {
      if (!document.querySelector('link[data-prism-theme="true"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css";
        link.dataset.prismTheme = "true";
        document.head.appendChild(link);
      }
    };

    const loadScript = (src: string, dataKey: string) =>
      new Promise<void>((resolve) => {
        const existing = document.querySelector(`script[data-${dataKey}="true"]`);
        if (existing) {
          existing.addEventListener("load", () => resolve(), { once: true });
          // 既に読み込み済みの可能性もあるので即 resolve
          resolve();
          return;
        }
        const s = document.createElement("script");
        s.src = src;
        s.async = true;
        s.dataset[dataKey] = "true";
        s.onload = () => resolve();
        s.onerror = () => resolve(); // CDNが使えない場合はフォールバックへ
        document.head.appendChild(s);
      });

    const highlight = () => (window as any).Prism?.highlightAll();

    const loadLanguages = async () => {
      ensureTheme();
      // まずローカルの prism.js を読み込む（public/prism.js）
      if (!(window as any).Prism) {
        await loadScript("/prism.js", "prismCore");
      }
      // ローカルの prism.js に必要な言語が含まれている想定。無ければ既存の言語だけで highlight。
      highlight();
    };

    loadLanguages();
  }, [languages]);
}
