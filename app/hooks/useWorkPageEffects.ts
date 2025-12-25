import { MutableRefObject, useEffect } from "react";

/**
 * 作品ページで共通利用する簡易エフェクトをまとめたフック
 * - 最初のディテールカードのフェードイン
 * - フィードバックバブルのインビュー検知
 * - ヘッダーオーバーレイの表示
 */
export function useWorkPageEffects(
  firstDetailRef: MutableRefObject<HTMLElement | null>,
  bubbleRef: MutableRefObject<HTMLElement | null>,
  headerOverlayRef: MutableRefObject<HTMLElement | null>
) {
  // 最初のカードをフェードイン
  useEffect(() => {
    const el = firstDetailRef.current;
    if (!el) return;
    el.classList.add("intro-appear");
    const t = setTimeout(() => el.classList.remove("intro-appear"), 800);
    return () => clearTimeout(t);
  }, [firstDetailRef]);

  // feedback-bubble フェードイン（ビューポートに入ったら）
  useEffect(() => {
    const target = bubbleRef.current;
    if (!target) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            target.classList.add("in-view");
            io.unobserve(target);
          }
        }
      },
      { threshold: 0.15 }
    );
    io.observe(target);
    return () => io.disconnect();
  }, [bubbleRef]);

  // ヘッダーのタイトルフェード＆スライドイン
  useEffect(() => {
    const ov = headerOverlayRef.current;
    if (!ov) return;
    const r = requestAnimationFrame(() => {
      ov.classList.add("show");
    });
    return () => cancelAnimationFrame(r);
  }, [headerOverlayRef]);
}
