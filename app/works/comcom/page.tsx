"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useWorkPageEffects } from "@/hooks/useWorkPageEffects";

interface Item {
  id: string;
  title: string;
  content: React.ReactNode;
}

export default function ComcomPage() {
  const firstDetailRef = useRef<HTMLDivElement | null>(null);
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const headerOverlayRef = useRef<HTMLDivElement | null>(null);

  useWorkPageEffects(firstDetailRef, bubbleRef, headerOverlayRef);

  // GitHubを使わない作品のための表示切替用
  const githubLink: string | null = null;

  const assetBase = "https://github.com/SyuLin1167/my-portfolio/raw/refs/heads/master/public";

  // ダウンロードリンク（必要に応じてURLを設定）
  const downloads = {
    executable: {
      label: "実行ファイル（Windows）",
      href: `${assetBase}/assets/COMCOM/COMCOM-exe.zip?download=` as string | null,
    },
    sourceZip: {
      label: "ソースコード",
      href: `${assetBase}/assets/COMCOM/COMCOM-src.zip?download=` as string | null,
    },
    projectFile: {
      label: "プロジェクト",
      href: `${assetBase}/assets/COMCOM/COMCOM-project.zip?download=` as string | null,
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
        title: "坂道の挙動",
        content: (
          <>
            <figure style={{ margin: "0 0 10px" }}>
              <img
                src="/assets/COMCOM/AppealPoint_1.gif"
                alt="坂道の挙動のGIFプレビュー"
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
                坂道の挙動の様子
              </figcaption>
            </figure>
            <p>
              通常のブロック衝突とは別で、独自で斜めに対する衝突判定を計算し坂道の挙動を実装しています。
            </p>
          </>
        ),
      },
      {
        id: "acc-2",
        title: "複数のステージを収録",
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
                ステージ選択画面の様子
              </figcaption>
            </figure>
            <p>短く多彩なステージデザインを盛り込み、誰でも手軽に遊べるようにしました。</p>
            <p>各ステージごとに異なるギミックや障害物を配置し、プレイヤーに飽きさせない工夫をしました。</p>
          </>
        ),
      },
      {
        id: "acc-3",
        title: "手描きアートで世界観を統一",
        content: (
          <>
            <figure style={{ margin: "0 0 10px" }}>
              <img
                src="/assets/COMCOM/COMCOM.png"
                alt="COMCOM メインビジュアル"
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
                style={{ textAlign: "center", fontSize: "0.9rem", color: "#bcd7ff", marginTop: 6 }}
              >
                メインビジュアル
              </figcaption>
            </figure>
            <p>Photoshopでアセットを自作することで、作品の世界観を表現しています。</p>
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
      <header
        className="work-header work-header--with-image"
        id="page-top"
        style={{ ["--header-image" as any]: "url('/assets/COMCOM/COMCOM.png')" }}
      >
        <div className="work-header-overlay" ref={headerOverlayRef}>
          <h1>COMCOM on the SKATE BOAD</h1>
        </div>
      </header>

      <main>
        <section className="work-detail">
          {/* メイン画像はアピールポイント(3)へ移設し、ここからは削除 */}

          <div className="detail-grid">
            {/* 作品概要を先頭に */}
            <div className="detail-item" ref={firstDetailRef}>
              <div className="detail-item__head">
                <span className="detail-icon" aria-hidden="true">📚</span>
                <h2 className="detail-title">作品概要</h2>
              </div>
              <p className="detail-text">2Dの横スクロールジャンプアクションゲーム。</p>
              <p className="detail-text">
                一年次に制作したゲーム作品で、<br />
                陽気な男の子 コムコム が、スケートボードで様々な障害物を乗り越えゴールを目指します。
              </p>
              <div className="feedback-bubble" ref={bubbleRef}>
                <p className="detail-text">
                  初めてのゲーム制作に挑戦した作品です。技術面ではまだ未熟な部分が多い状態だったため、<br />
                  3か月という限られた時間でゲームとして遊べる状態まで作り上げることを意識しました。<br />
                  シンプルながらも楽しさを感じられるゲーム体験を目指して制作し、<br />
                  クラス内の作品投票では最も票を集めることができました。
                </p>
              </div>
              <ul className="chips">
                <li>2D</li>
                <li>Action</li>
                <li>Side Scroll</li>
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
                    src="https://www.youtube.com/embed/DH1U7gV-vzU?playsinline=1&modestbranding=1&rel=0&iv_load_policy=3"
                    title="YouTube video player"
                    frameBorder={0}
                    loading="lazy"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="video-fallback">
                  もし再生できない場合は、
                  <a
                    href="https://www.youtube.com/watch?v=DH1U7gV-vzU"
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
                <li>フレームレートの未実装により、動作が不安定になる可能性があります。</li>
                <li>CSVファイルの読み込み機能が理解不足だったため、マップ生成に対する対応が不十分でした。</li>
                <li>ゲームの終了処理が未実装で、正常に終了できない場合があります。</li>
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
