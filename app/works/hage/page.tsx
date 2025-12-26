"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useWorkPageEffects } from "@/hooks/useWorkPageEffects";

interface Item {
  id: string;
  title: string;
  content: React.ReactNode;
}

export default function HagePage() {
  const firstDetailRef = useRef<HTMLDivElement | null>(null);
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const headerOverlayRef = useRef<HTMLDivElement | null>(null);

  useWorkPageEffects(firstDetailRef, bubbleRef, headerOverlayRef);

  // GitHubを使わない作品のための表示切替用
  const githubLink: string | null = null;

  // ダウンロードリンク（必要に応じてURLを設定）
  const downloads = {
    executable: {
      label: "実行ファイル（Windows）",
      href: "/assets/Hage/Hage-exe.zip" as string | null,
    },
    sourceZip: {
      label: "ソースコード",
      href: "/assets/Hage/Hage-src.zip" as string | null,
    },
    projectFile: {
      label: "プロジェクト",
      href: "/assets/Hage/Hage-project.zip" as string | null,
    },
  };

  // Accordion state
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const [opening, setOpening] = useState<Record<string, boolean>>({});
  const [ripplingId, setRipplingId] = useState<string | null>(null);
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const singleOpen = false; // true にすると単一展開

  const items: Item[] = useMemo(
    () => [
      {
        id: "acc-1",
        title: "敵の追従",
        content: (
          <>
            <figure style={{ margin: "0 0 10px" }}>
              <img
                src="/assets/HAGE/AppealPoint_1.gif"
                alt="敵の追従のGIFプレビュー"
                style={{
                  width: "100%",
                  maxWidth: 560,
                  borderRadius: 12,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.22)",
                  display: "block",
                  margin: "0 auto",
                }}
              />
              <figcaption
                style={{
                  textAlign: "center",
                  fontSize: "0.9rem",
                  color: "#bcd7ff",
                  marginTop: 6,
                }}
              >
                敵の追従の様子
              </figcaption>
            </figure>
            <p>
              プレイヤーの位置を追跡して移動する敵キャラクターを実装しました。<br />
              座標に合わせて移動する方向を計算し、一定速度で追従するようにしています。<br />
              マップ移動時、敵の座標を更新してプレイヤーを正確に追従するようにしています。<br />
              展示イベントへ出展する作品の候補として選ばれましたが、<br />
              枠が限られていたため惜しくも落選となりました。
            </p>
          </>
        ),
      },
      {
        id: "acc-2",
        title: "メニュー画面の実装",
        content: (
          <>
            <figure style={{ margin: "0 0 10px" }}>
              <img
                src="/assets/COMCOM/AppealPoint_2.png"
                alt="ステージ選択画面"
                style={{
                  width: "100%",
                  maxWidth: 560,
                  borderRadius: 12,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.22)",
                  display: "block",
                  margin: "0 auto",
                }}
              />
              <figcaption
                style={{
                  textAlign: "center",
                  fontSize: "0.9rem",
                  color: "#bcd7ff",
                  marginTop: 6,
                }}
              >
                メニュー画面の様子
              </figcaption>
            </figure>
            <p>
              メニュー画面からゲームの進行状況を一時保存できるようにしました。<br />
              また、タイトル画面にも戻ることも可能で、ゲームを中断することができます。<br />
            </p>
          </>
        ),
      },
      {
        id: "acc-3",
        title: "前回からの成長点",
        content: (
          <>
          <ul className="bullet-list">
            <li>フレームレートの最適化を行い、動作を安定させました。</li>
            <li>メニュー画面を追加して、ゲームループの管理を改善しました。</li>
          </ul>
          </>
        ),
      },
    ],
    []
  );

  const onToggle = (id: string) => {
    const isOpen = !!expanded[id];
    // ripple
    setRipplingId(id);
    setTimeout(() => setRipplingId((r) => (r === id ? null : r)), 300);

    if (isOpen) {
      // start closing: keep visible until transition end
      setExpanded((s) => ({ ...s, [id]: false }));
      setVisible((v) => ({ ...v, [id]: true }));

      // slide up animation using max-height
      const panel = panelRefs.current[id];
      if (panel) {
        panel.style.maxHeight = panel.scrollHeight + "px"; // set current height
        // force reflow then collapse
        void panel.getBoundingClientRect();
        panel.style.maxHeight = "0px";
      }
    } else {
      if (singleOpen) {
        // close others with animation
        setExpanded((s) => {
          const next: Record<string, boolean> = {};
          for (const it of items) next[it.id] = it.id === id;
          return next;
        });
        setVisible((v) => {
          const next: Record<string, boolean> = {};
          for (const it of items) next[it.id] = true;
          return next;
        });
      } else {
        setExpanded((s) => ({ ...s, [id]: true }));
        setVisible((v) => ({ ...v, [id]: true }));
      }

      // opening effect on container
      setOpening((o) => ({ ...o, [id]: true }));
      setTimeout(() => setOpening((o) => ({ ...o, [id]: false })), 300);

      // stage-in children + slide down animation (after visible state applied)
      setTimeout(() => {
        const panel = panelRefs.current[id];
        if (panel) {
          // slide down
          panel.style.maxHeight = panel.scrollHeight + "px";

          // staged children
          const kids = Array.from(panel.children) as HTMLElement[];
          kids.forEach((el, idx) => {
            el.style.setProperty("--stagger", String(idx));
            el.classList.add("stage-in");
            setTimeout(() => el.classList.remove("stage-in"), 800);
          });
        }
      }, 30);
    }
  };

  const onPanelTransitionEnd = (id: string, e: React.TransitionEvent<HTMLDivElement>) => {
    // only handle when the panel itself finishes (avoid bubbling from children)
    if (e.target !== e.currentTarget) return;
    if (!expanded[id]) {
      // hide after closing animation
      setVisible((v) => ({ ...v, [id]: false }));
      // cleanup inline style for next open
      const panel = panelRefs.current[id];
      if (panel) {
        panel.style.maxHeight = "";
      }
    }
  };

  return (
    <>
      <header className="work-header work-header--hage" id="page-top">
        <div className="work-header-overlay" ref={headerOverlayRef}>
          <h1>HAGE(ヘッジ)</h1>
        </div>
      </header>

      <main>
        <section className="work-detail">
          {/* メイン画像はアピールポイント(3)へ移設し、ここからは削除 */}

          <div className="detail-grid">
            {/* 作品概要を先頭に */}
            <div className="detail-item" ref={firstDetailRef}>
              <div className="detail-item__head">
                <span className="detail-icon" aria-hidden="true">👻</span>
                <h2 className="detail-title">作品概要</h2>
              </div>
              <p className="detail-text">2Dの探索型ホラーゲーム。</p>
              <p className="detail-text">
                二年次に制作したゲーム作品で、<br />
                学校に登校した主人公が遭遇した「謎の存在」から逃れつつ、校内を探索し脱出を目指します。
              </p>
              <div className="feedback-bubble" ref={bubbleRef}>
                <p className="detail-text">
                  ホラーが苦手でも遊べるような内容にしました。<br />
                  クオリティは二年次の作品としては良いものが作れたと思います。
                </p>
              </div>
              <ul className="chips">
                <li>2D</li>
                <li>Horror</li>
              </ul>
            </div>

            {/* ゲーム動画は2番目に */}
            <div className="detail-item">
              <div className="detail-item__head">
                <span className="detail-icon" aria-hidden="true">🎬</span>
                <h3 className="detail-title">ゲーム動画</h3>
              </div>
              <div className="video-embed">
                <div className="video-embed__inner">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/IPDP2_uVkrM?playsinline=1&modestbranding=1&rel=0&iv_load_policy=3"
                    title="YouTube video player"
                    frameBorder={0}
                    loading="lazy"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="video-fallback">
                  もし再生できない場合は、
                  <a
                    href="https://www.youtube.com/watch?v=IPDP2_uVkrM"
                    target="_blank"
                    rel="noopener"
                  >
                    YouTubeで視聴
                  </a>
                  してください。
                </p>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-item__head">
                <span className="detail-icon" aria-hidden="true">🛠️</span>
                <h3 className="detail-title">使用技術・ツール</h3>
              </div>
              <div className="skill-categories">
                <div className="skill-cat">
                  <h4 className="skill-cat__title">言語</h4>
                  <div className="skill-badges">
                    <span className="skill-badge">C</span>
                    <span className="skill-badge">C++</span>
                  </div>
                </div>
                <div className="skill-cat">
                  <h4 className="skill-cat__title">ライブラリ / フレームワーク</h4>
                  <div className="skill-badges">
                    <span className="skill-badge">DxLib</span>
                  </div>
                </div>
                <div className="skill-cat">
                  <h4 className="skill-cat__title">グラフィック</h4>
                  <div className="skill-badges">
                    <span className="skill-badge">Photoshop</span>
                    <span className="skill-badge">Illustrator</span>
                  </div>
                </div>
                <div className="skill-cat">
                  <h4 className="skill-cat__title">IDE/環境</h4>
                  <div className="skill-badges">
                    <span className="skill-badge">Visual Studio</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-item__head">
                <span className="detail-icon" aria-hidden="true">⏱️</span>
                <h3 className="detail-title">開発期間 / 人数</h3>
              </div>
              <ul className="meta-list">
                <li>
                  <span className="meta-label">期間</span>
                  <span className="meta-value">約3ヶ月</span>
                </li>
                <li>
                  <span className="meta-label">人数</span>
                  <span className="meta-value">個人開発（1名）</span>
                </li>
              </ul>
            </div>


            <div className="detail-item">
              <div className="detail-item__head">
                <span className="detail-icon" aria-hidden="true">🛠️</span>
                <h3 className="detail-title">アピールポイント</h3>
              </div>

              <div className="accordion" role="region" aria-label="アピールポイント">
                {items.map((it, idx) => {
                  const isOpen = !!expanded[it.id];
                  const isVisible = !!visible[it.id];
                  const isOpening = !!opening[it.id];
                  const triggerId = `acc-trigger-${idx + 1}`;
                  const panelId = `acc-panel-${idx + 1}`;
                  return (
                    <div
                      className={`accordion-item${isOpen ? " is-open" : ""}${isOpening ? " is-opening" : ""}`}
                      key={it.id}
                      ref={(el) => { itemRefs.current[it.id] = el; }}
                    >
                      <button
                        className={`accordion-trigger${ripplingId === it.id ? " rippling" : ""}`}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        id={triggerId}
                        onClick={() => onToggle(it.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onToggle(it.id);
                          }
                        }}
                      >
                        {it.title}
                      </button>
                      <div
                        className={`accordion-panel${isOpen ? " is-open" : ""}`}
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        hidden={!isVisible}
                        ref={(el) => { panelRefs.current[it.id] = el; }}
                        onTransitionEnd={(e) => onPanelTransitionEnd(it.id, e)}
                      >
                        {it.content}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-item__head">
                <span className="detail-icon" aria-hidden="true">📝</span>
                <h3 className="detail-title">反省点</h3>
              </div>
              <ul className="bullet-list">
                <li>画面サイズの設定が適切でなかったため、ユーザー側で設定を調整する必要がありました。</li>
                <li>
                  アイテムの配置をcsvファイルで管理したため、<br />
                  読み込んだデータに余分なインデックス情報が含まれてしまいました。
                </li>
                <li>
                  セーブ機能がゲーム内でのみ利用可能で、外部への保存ができなかったため<br />
                  ゲーム終了後にデータが失われてしまいました。
                </li>
                <li>ロッカーに隠れる挙動が分かりにくい仕様になっていました。</li>
              </ul>
            </div>

            <div className="detail-item">
              <div className="detail-item__head">
                <span className="detail-icon" aria-hidden="true">🔗</span>
                <h3 className="detail-title">リンク</h3>
              </div>
              <div className="link-row">
                {githubLink ? (
                  <a
                    className="btn-link"
                    href={githubLink}
                    target="_blank"
                    rel="noopener"
                  >
                    GitHubリポジトリ
                  </a>
                ) : (
                  <div className="link-placeholder" role="note" aria-label="GitHubを使用していない作品">
                    <span className="link-placeholder__title">GitHubリポジトリ</span>
                    <span className="link-placeholder__text">GitHubを使用していない作品です。ソースコードはローカルで管理しています。</span>
                  </div>
                )}
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-item__head">
                <span className="detail-icon" aria-hidden="true">📥</span>
                <h3 className="detail-title">ダウンロード</h3>
              </div>
              <div className="link-row">
                {downloads.executable.href ? (
                  <a className="btn-download" href={downloads.executable.href} download>
                    <span className="btn-label">{downloads.executable.label.replace("（Windows）", "")}</span>
                    <span className="btn-icon" aria-hidden="true" style={{marginLeft: 4}}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z"/>
                      </svg>
                    </span>
                  </a>
                ) : (
                  <div className="link-placeholder" role="note" aria-label="実行ファイルは準備中です">
                    <span className="link-placeholder__title">{downloads.executable.label}</span>
                    <span className="link-placeholder__text">実行ファイルは準備中です。</span>
                  </div>
                )}

                {downloads.sourceZip.href ? (
                  <a className="btn-download btn-download--source" href={downloads.sourceZip.href} download>
                    <span className="btn-label">{downloads.sourceZip.label}</span>
                    <span className="btn-icon" aria-hidden="true" style={{marginLeft: 4}}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 2h7l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM14 7V3l4 4h-4z"/>
                        <path d="M10 11l-3 3 3 3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 11l3 3-3 3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </a>
                ) : (
                  <div className="link-placeholder" role="note" aria-label="ソースコードZIPは準備中です">
                    <span className="link-placeholder__title">{downloads.sourceZip.label}</span>
                    <span className="link-placeholder__text">ソースコードZIPは準備中です。</span>
                  </div>
                )}

                {downloads.projectFile.href ? (
                  <a className="btn-download btn-download--project" href={downloads.projectFile.href} download>
                    <span className="btn-label">{downloads.projectFile.label}</span>
                    <span className="btn-icon" aria-hidden="true" style={{marginLeft: 4}}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2l8.5 4.9v9.2L12 21l-8.5-4.9V6.9L12 2z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                        <path d="M12 2v7.5m0 5V21" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                        <path d="M3.5 6.9 12 12l8.5-5.1" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </a>
                ) : (
                  <div className="link-placeholder" role="note" aria-label="プロジェクトファイルは準備中です">
                    <span className="link-placeholder__title">{downloads.projectFile.label}</span>
                    <span className="link-placeholder__text">プロジェクトファイルは準備中です。</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Link href="/" id="backBtn" aria-label="戻る">
         ←
      </Link>
      <button
        type="button"
        className="back-to-top"
        aria-label="トップに戻る"
        onClick={() => document.querySelector("body")?.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>
    </>
  );
}
