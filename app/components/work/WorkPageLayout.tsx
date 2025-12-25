import React from "react";
import Link from "next/link";
import { WorkAccordionItem, WorkDownload, WorkLink, WorkPageContent, WorkVideo } from "@/data/workPages";
import { useWorkPageEffects } from "@/hooks/useWorkPageEffects";

type WorkPageLayoutProps = {
  content: WorkPageContent;
  accordionRenderer: (items: WorkAccordionItem[]) => React.ReactNode;
  videoRenderer: (video: WorkVideo) => React.ReactNode;
};

export function WorkPageLayout({ content, accordionRenderer, videoRenderer }: WorkPageLayoutProps) {
  const firstDetailRef = React.useRef<HTMLDivElement | null>(null);
  const bubbleRef = React.useRef<HTMLDivElement | null>(null);
  const headerOverlayRef = React.useRef<HTMLDivElement | null>(null);

  useWorkPageEffects(firstDetailRef, bubbleRef, headerOverlayRef);

  const { summary, video, skills, meta, accordion, links, downloads } = content;
  const chips = summary.chips ?? [];
  const bubble = summary.bubble ?? [];

  const renderLinks = (items?: WorkLink[]) => {
    if (!items?.length) return null;
    return (
      <div className="detail-item">
        <div className="detail-item__head">
          <span className="detail-icon" aria-hidden="true">🔗</span>
          <h3 className="detail-title">リンク</h3>
        </div>
        <div className="link-row">
          {items.map((l) =>
            l.href ? (
              <a key={l.label} className="btn-link" href={l.href} target="_blank" rel="noopener">
                {l.label}
              </a>
            ) : (
              <div key={l.label} className="link-placeholder" role="note" aria-label={`${l.label} は準備中`}>
                <span className="link-placeholder__title">{l.label}</span>
                <span className="link-placeholder__text">準備中です。</span>
              </div>
            )
          )}
        </div>
      </div>
    );
  };

  const renderDownloads = (items?: WorkDownload[]) => {
    if (!items?.length) return null;
    return (
      <div className="detail-item">
        <div className="detail-item__head">
          <span className="detail-icon" aria-hidden="true">⬇</span>
          <h3 className="detail-title">ダウンロード</h3>
        </div>
        <div className="link-row">
          {items.map((d) =>
            d.href ? (
              <a
                key={d.label}
                className={`btn-download${d.variant ? ` btn-download--${d.variant}` : ""}`}
                href={d.href}
                download
              >
                <span className="btn-label">{d.label}</span>
                <span className="btn-icon" aria-hidden="true" style={{ marginLeft: 4 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z" />
                  </svg>
                </span>
              </a>
            ) : (
              <div key={d.label} className="link-placeholder" role="note" aria-label={`${d.label} は準備中です`}>
                <span className="link-placeholder__title">{d.label}</span>
                <span className="link-placeholder__text">準備中です。</span>
              </div>
            )
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <header
        className="work-header work-header--with-image"
        id="page-top"
        style={{ ["--header-image" as any]: `url('${content.headerImage}')` }}
      >
        <div className="work-header-overlay" ref={headerOverlayRef}>
          <h1>{content.title}</h1>
        </div>
      </header>

      <main>
        <section className="work-detail">
          <div className="detail-grid">
            <div className="detail-item" ref={firstDetailRef}>
              <div className="detail-item__head">
                <span className="detail-icon" aria-hidden="true">📝</span>
                <h2 className="detail-title">{summary.title}</h2>
              </div>
              {summary.paragraphs.map((p, idx) => (
                <p key={idx} className="detail-text">{p}</p>
              ))}
              {bubble.length ? (
                <div className="feedback-bubble" ref={bubbleRef}>
                  {bubble.map((t, idx) => (
                    <p key={idx} className="detail-text">{t}</p>
                  ))}
                </div>
              ) : null}
              {chips.length ? (
                <ul className="chips">
                  {chips.map((c) => <li key={c}>{c}</li>)}
                </ul>
              ) : null}
            </div>

            {video ? (
              <div className="detail-item">
                <div className="detail-item__head">
                  <span className="detail-icon" aria-hidden="true">🎥</span>
                  <h3 className="detail-title">プレイ動画</h3>
                </div>
                {videoRenderer(video)}
              </div>
            ) : null}

            {skills ? (
              <div className="detail-item">
                <div className="detail-item__head">
                  <span className="detail-icon" aria-hidden="true">🛠️</span>
                  <h3 className="detail-title">使用技術</h3>
                </div>
                <div className="skill-categories">
                  {skills.language?.length ? (
                    <div className="skill-cat">
                      <h4 className="skill-cat__title">言語</h4>
                      <div className="skill-badges">
                        {skills.language.map((l) => <span key={l} className="skill-badge">{l}</span>)}
                      </div>
                    </div>
                  ) : null}
                  {skills.tools?.length ? (
                    <div className="skill-cat">
                      <h4 className="skill-cat__title">ツール / IDE</h4>
                      <div className="skill-badges">
                        {skills.tools.map((l) => <span key={l} className="skill-badge">{l}</span>)}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            {meta?.length ? (
              <div className="detail-item">
                <div className="detail-item__head">
                  <span className="detail-icon" aria-hidden="true">📅</span>
                  <h3 className="detail-title">開発情報</h3>
                </div>
                <ul className="meta-list">
                  {meta.map((m) => (
                    <li key={m.label}>
                      <span className="meta-label">{m.label}</span>
                      <span className="meta-value">{m.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {accordion?.length ? (
              <div className="detail-item">
                <div className="detail-item__head">
                  <span className="detail-icon" aria-hidden="true">✨</span>
                  <h3 className="detail-title">アピールポイント</h3>
                </div>
                {accordionRenderer(accordion)}
              </div>
            ) : null}

            {renderLinks(links)}
            {renderDownloads(downloads)}
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
