"use client";
import Link from "next/link";
import { useHeroAnimation } from "./hooks/useHeroAnimation";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { useIntersectionAnimations } from "./hooks/useIntersectionAnimations";
import { useCursorTrail } from "./hooks/useCursorTrail";
import { historyData, skillCategories, worksData, skillIconMap } from "./data/portfolio";

export default function Home() {
  // カスタムフックの実行
  useHeroAnimation();
  useSmoothScroll();
  useScrollToTop();
  useIntersectionAnimations();
  useCursorTrail();

  return (
    <>
      <header className="main-header">
        <div className="hero">
          <div className="hero-content">
            <div className="header-wordmark" aria-hidden="true">
              Portfolio
            </div>
            <h1 className="hero-title">ポートフォリオ</h1>
            <div className="hero-ctas">
              <a className="btn btn-primary" href="#about">
                プロフィールへ
              </a>
              <a className="btn btn-primary" href="#skills">
                スキル
              </a>
              <a className="btn btn-primary" href="#works">
                作品を見る
              </a>
              <a className="btn btn-secondary" href="#contact">
                連絡する
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <a
              href="https://github.com/SyuLin1167"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHubプロフィールへ"
              data-tooltip="GitHubプロフィールへ移動"
            >
              <img
                src="https://github.com/SyuLin1167.png"
                alt="GitHubアバターSyuLin1167"
                className="hero-avatar"
              />
            </a>
          </div>
        </div>
      </header>

      <main>
        <section id="about" className="section-card">
          <h2 className="section-title">プロフィール</h2>
          <div className="profile-container">
            <img
              src="/assets/images/icon.jpg"
              alt="アイコン"
              className="profile-icon"
            />
            <div className="profile-details">
              <p>
                <strong>名前：</strong> 金子 秀由(かねこ しゅうゆう)
              </p>
              <p>
                <strong>職業：</strong> SES事業部にてサーバー監視業務を行っています。
              </p>
              <p>
                <strong>自己紹介：</strong> ホラーゲーム制作が好きで、日々成長を目指しています。
              </p>
            </div>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true"></div>

                <section id="history" className="section-card" aria-labelledby="history-title">
          <h2 id="history-title" className="section-title">
            経歴・ヒストリー
          </h2>
          <ol className="history-list" role="list">
            {historyData.map((item) => (
              <li key={item.year} className="history-item">
                <span className="history-badge" aria-hidden="true" title={item.badgeTitle}>
                  {item.badge}
                </span>
                <h3 className="timeline-year">{item.year}</h3>
                {item.descriptions.map((desc, index) => (
                  <p key={`${item.year}-${index}`} className="timeline-desc">
                    {desc}
                  </p>
                ))}
              </li>
            ))}
          </ol>
        </section>

        <div className="section-divider" aria-hidden="true"></div>

                <section id="skills" className="section-card">
          <h2 className="section-title">スキル</h2>

          <div className="skills-container">
            {skillCategories.map((category) => (
              <div key={category.title} className="skill-category">
                <h3 className="section-title" style={{ fontSize: "1.25rem", marginTop: 0 }}>
                  {category.title}
                </h3>
                <div
                  className={`skills-graph${category.twoColumn ? " skills-graph--two-col" : ""}`}
                >
                  {category.items.map((item) => (
                    <div key={item.label} className="skill-bar">
                      <span className="skill-label">{item.label}</span>
                      <div className="bar-bg">
                        <div className="bar-fill" data-percent={item.percent}></div>
                      </div>
                      <span className="skill-exp">{item.experience}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider" aria-hidden="true"></div>

        <section id="works" className="section-card">
          <h2 className="section-title">制作実績</h2>
          <div className="work-list">
            {worksData.map((work: typeof worksData[0]) => (
              <a
                key={work.title}
                className="work"
                href={work.link}
                aria-label={`${work.title} の詳細ページへ`}
              >
                <div className="work-thumb">
                  <img src={work.image} alt={`${work.title} のスクリーンショット`} />
                  {work.featured && (
                    <span className="featured-badge" aria-label="注目作品">
                      ⭐ 注目
                    </span>
                  )}
                </div>
                <h3>{work.title}</h3>
                {work.tags?.length ? (
                  <ul className="work-tags">
                    {work.tags.map((t: string) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                ) : null}
                <p className="work-desc">{work.description}</p>
                <ul className="skills">
                  {work.skills.map((skill: string) => (
                    <li key={skill} className={`skill-icon skill-${skill}`}>
                      <img src={skillIconMap[skill]} alt={skill} />
                    </li>
                  ))}
                </ul>
                <span className="work-date">{work.date}</span>
                <div className="work-hover-overlay" aria-hidden="true">
                  <span className="overlay-text">詳細を見る</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <div className="section-divider" aria-hidden="true"></div>

        <section id="contact" className="section-card">
          <h2 className="section-title">連絡先</h2>
          <p>メール: s.kaneko.career@gmail.com</p>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 shuyu kaneko</p>
      </footer>

      <button
        type="button"
        className="back-to-top"
        aria-label="トップに戻る"
        onClick={() => document.querySelector("body")?.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑      </button>
    </>
  );
}
