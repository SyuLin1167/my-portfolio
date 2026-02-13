"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { CodeBox } from "@/components/CodeBox";
import { usePrism } from "@/hooks/usePrism";
import { useWorkPageEffects } from "@/hooks/useWorkPageEffects";

interface Item {
  id: string;
  title: string;
  category: string;
  content: React.ReactNode;
}

export default function HuhaiPage() {
  const firstDetailRef = useRef<HTMLDivElement | null>(null);
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const headerOverlayRef = useRef<HTMLDivElement | null>(null);

  useWorkPageEffects(firstDetailRef, bubbleRef, headerOverlayRef);
  usePrism(["cpp"]);

  // Prismが読み込めない場合の簡易フォールバック（最後の保険）
  useEffect(() => {
    const timer = setTimeout(() => {
      const prism = (window as any).Prism;
      if (prism?.highlightAll) {
        prism.highlightAll();
        // Prismが働いても token が無ければフォールバックする
        if (!document.querySelector("pre.code-block code span.token")) {
          // falls through to manual
        } else {
          return;
        }
      }

      const escapeHtml = (str: string) =>
        str
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");

      const nodes = document.querySelectorAll<HTMLElement>("pre.code-block code");
      nodes.forEach((node) => {
        // 既存の子要素を除去してプレーンテキストに戻す
        const raw = node.textContent ?? "";
        const htmlEscaped = escapeHtml(raw);
        let html = htmlEscaped;
        html = html.replace(/(\/\/.*)/g, '<span class="token-comment">$1</span>');
        html = html.replace(/("(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*')/g, '<span class="token-string">$1</span>');
        html = html.replace(/\b(\d+(?:\.\d+)?f?)\b/g, '<span class="token-number">$1</span>');
        html = html.replace(
          /\b(auto|const|return|for|if|else|while|switch|case|break|continue|class|struct|public|private|protected|virtual|override|namespace|using|void|int|float|double|char|bool|new|delete|this)\b/g,
          '<span class="token-keyword">$1</span>'
        );
        node.innerHTML = html;
      });
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // GitHubを使わない作品のための表示切替用
  const githubLink: string | null = "https://github.com/SyuLin1167/Huhai";

  const assetBase = "https://github.com/SyuLin1167/my-portfolio/raw/refs/heads/master/public";

  // ダウンロードリンク（必要に応じてURLを設定）
  const downloads = {
    executable: {
      label: "実行ファイル（Windows）",
      href: `${assetBase}/assets/Huhai/Huhai-exe.zip?download=` as string | null,
    },
    sourceZip: {
      label: "ソースコード",
      href: `${assetBase}/assets/Huhai/Huhai-src.zip?download=` as string | null,
    },
    projectFile: {
      label: "プロジェクト",
      href: `${assetBase}/assets/Huhai/Huhai-project.zip?download=` as string | null,
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
        id: "acc-3",
        title: "タイトル画面の構成",
        category: "見せ方",
        content: (
          <>
            <figure style={{ margin: "0 0 10px" }}>
              <img
                src="/assets/Huhai/AppealPoint_1.gif"
                alt="タイトル画面の様子"
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
                タイトル画面の様子
              </figcaption>
            </figure>
            <p>
              ● タイトル画面でも3D空間を取り入れたい<br />
                - UIを左下に配置し奥行きのある視点にしました。<br />
                  シンプルな構成で雰囲気を演出できるため、作業コストを抑えられました。<br />
              ● 画面が固まっていると勘違いしないようにしたい<br />
                - ランダムなタイミングでライトを点滅させる演出を取り入れました。<br />
                  点灯・点滅・暗転を切り替える形で、画面が動いていることを伝えられました。<br />
            </p>
          </>
        ),
      },
      {
        id: "acc-6",
        title: "ポーズメニューの実装",
        category: "技術",
        content: (
          <>
            <figure style={{ margin: "0 0 10px" }}>
              <img
                src="/assets/Huhai/AppealPoint_2.png"
                alt="メニュー画面の様子"
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
              ● ゲーム中にポーズメニューを開けるようにしたい<br />
                - コルーチンなど未習得だったため、ポーズメニュー直前のゲーム画面を<br />
                  テクスチャに保存して背景として表示する方法を採用しました。<br />
              ● 音量やマウス感度を調整できるようにしたい<br />
                - スライダーで調整可能にしました。<br />
                一般的なスライドバーではなく、つまみをドラッグするUIにすることで、操作している感覚を強められました。<br />
            </p>
          </>
        ),
      },
      {
        id: "acc-2",
        title: "オブジェクトの配置のアプローチ",
        category: "機能",
        content: (
          <>
            <CodeBox
              language="cpp"
              code={`
    //ファイル読み込み
    std::ifstream ifs("../SourceCode/Object/MapObject/Table/TableData.json");
    rapidjson::Document doc;

    //ファイル解析
    if (ifs.good())
    {
        rapidjson::IStreamWrapper isw(ifs);

        doc.ParseStream(isw);
    }
    ifs.close();

    //データを読み取って座標・向きに代入
    const std::string key = std::to_string(objNum);
    auto& data = doc["data"][key.c_str()];

    objPos.x = data["pos"].GetArray()[0].GetFloat();
    objPos.y = data["pos"].GetArray()[1].GetFloat();
    objPos.z = data["pos"].GetArray()[2].GetFloat();
    objDir.y = data["dir"].GetFloat();
              `}
            />
                         <figcaption
                style={{
                  textAlign: "center",
                  fontSize: "0.9rem",
                  color: "#bcd7ff",
                  marginTop: 6,
                }}
              >
                JSONファイルからオブジェクトの位置情報を読み込む処理
              </figcaption>
            <p>
              ● オブジェクトの配置を柔軟に管理したい<br />
                - JSONファイルを使用してオブジェクトの位置情報を管理し、ゲーム起動時に読み込む仕組みを実装しました。<br />
              オブジェクトの追加や調整が容易になり、開発効率が向上しました。<br />
            </p>
          </>
        ),
      },
      {
        id: "acc-1",
        title: "ブルーム効果",
        category: "見せ方",
        content: (
          <>
            <CodeBox
              language="cpp"
              code={`
【更新処理】
//描画結果から高輝度部分を抜き出してぼかす
GraphFilterBlt(ColorScreen, HighBrightScreen, DX_GRAPH_FILTER_BRIGHT_CLIP,
    DX_CMP_LESS, CLIP_PARAM, true, GetColor(0, 0, 0), CLIP_ALPHA);
GraphFilterBlt(HighBrightScreen, DownScaleScreen, DX_GRAPH_FILTER_DOWN_SCALE, DOWN_SCALE);
GraphFilterBlt(DownScaleScreen, GaussScreen, DX_GRAPH_FILTER_GAUSS, GAUSS_PIXEL, GAUSS_PARAM);

//～処理省略～

【描画処理】
//ぼかし画像描画
SetDrawMode(DX_DRAWMODE_BILINEAR);
SetDrawBlendMode(DX_BLENDMODE_ADD, 255);
DrawExtendGraph(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, GaussScreen, false);
SetDrawBlendMode(DX_BLENDMODE_NOBLEND, 255);
SetDrawMode(DX_DRAWMODE_NEAREST);
              `}
            />
                         <figcaption
                style={{
                  textAlign: "center",
                  fontSize: "0.9rem",
                  color: "#bcd7ff",
                  marginTop: 6,
                }}
              >
                ブルーム効果の実装
              </figcaption>
            <p>
              ● ブルーム効果を実装したい<br />
              - 画面の高輝度部分を抽出し、ダウンサンプリングとガウスぼかしを適用してブルーム効果を実装しました。<br />
              暗所での可視性を高めつつホラーの雰囲気を維持できました。<br />
              - メニュー画面でブルーム効果の適用を切り替えられるようにしました。<br />
            </p>
          </>
        ),
      },
      {
        id: "acc-5",
        title: "ゲーム内UI",
        category: "見せ方",
        content: (
          <>
           <figure style={{ margin: "0 0 10px" }}>
              <img
                src="/assets/Huhai/AppealPoint_5.png"
                alt="ゲーム内UIの様子"
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
                ゲーム内UIの様子
              </figcaption>
            </figure>
            <p>
              ● ゲーム中の操作案内を分かりやすく表示したい<br />
                - 特定のオブジェクトに近づくと操作案内が表示されるようにしました。<br />
                また、プレイヤーが移動しても常に正面に向くようにして視認性を確保しました。<br />
            </p>
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
        style={{ ["--header-image" as any]: "url('/assets/Huhai/Huhai.png')" }}
      >
        <div className="work-header-overlay" ref={headerOverlayRef}>
          <h1>怖徘(フハイ)</h1>
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
              <p className="detail-text">3Dの一人称ホラーゲーム。</p>
              <p className="detail-text">
                就活作品として制作したゲーム作品で、<br />
                妻を亡くした主人公が、悪夢の中を彷徨いながら脱出を目指すストーリーです。<br />
              </p>
              <div className="feedback-bubble" ref={bubbleRef}>
                <p className="detail-text">
                  評価や遊びやすさを考慮して、5分ほどで遊べるような内容にしました。<br />
                  3Dにおける計算や基本的なゲームシステムの実装に挑戦した作品です。<br />
                  ゲームの内容は講師陣や同級生から好評を得られ、ホラー表現や雰囲気作りに関しても高く評価していただけました。<br />
                  一方で、プログラムの設計面や最適化、シェーダー表現などに関しては改善点が多く残りました。
                </p>
              </div>
              <ul className="chips">
                <li>3D</li>
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
                    src="https://www.youtube.com/embed/icg4IML7o8M?playsinline=1&modestbranding=1&rel=0&iv_load_policy=3"
                    title="YouTube video player"
                    frameBorder={0}
                    loading="lazy"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="video-fallback">
                  もし再生できない場合は、
                  <a
                    href="https://www.youtube.com/watch?v=icg4IML7o8M"
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
                    <span className="skill-badge">JSON</span>
                  </div>
                </div>
                <div className="skill-cat">
                  <h4 className="skill-cat__title">ライブラリ / フレームワーク</h4>
                  <div className="skill-badges">
                    <span className="skill-badge">DxLib</span>
                    <span className="skill-badge">RapidJson</span>
                  </div>
                </div>
                <div className="skill-cat">
                  <h4 className="skill-cat__title">グラフィック</h4>
                  <div className="skill-badges">
                    <span className="skill-badge">Photoshop</span>
                    <span className="skill-badge">Illustrator</span>
                    <span className="skill-badge">Blender</span>
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
                  <span className="meta-value">約4ヶ月</span>
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
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                          <span className="category-badge" data-category={it.category}>{it.category}</span>
                          {it.title}
                        </span>
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
                <span className="detail-icon" aria-hidden="true">🌱</span>
                <h3 className="detail-title">前回からの成長点</h3>
              </div>
              <ul className="bullet-list">
                <li>アクセス指定子を理解してカプセル化を強化しました。</li>
                <p>
                  改善前：publicのみを使用していたため、外部からの不正なアクセスが可能でした。<br />
                  改善後：privateやprotectedを使用し、クラスの内部状態を保護しました。<br />
                </p>
                <li>継承や多態性を活用してコードの再利用性を向上させました。</li>
                <p>
                  改善前：同様の機能を持つクラスでコードの重複が多く、保守性が低下していました。<br />
                  改善後：基底クラスを作成し、共通の機能を継承させることでコードの重複を削減しました。<br />
                </p>
                <li>行列演算を移動や回転の計算に活用しました。</li>
                <p>
                  改善前：ベクトル演算で位置や向きを計算しており、複雑な変換が困難でした。<br />
                  改善後：行列を使用して一括で変換を行い、複雑な変換を簡潔に表現できるようにしました。<br />
                </p>
                <li>JSONを用いてデータ管理を効率化しました。</li>
                <p>
                  改善前：オブジェクトの配置など、定数で管理しており、変更が困難でした。<br />
                  改善後：JSONファイルでデータを一元管理し、柔軟に変更できるようにしました。<br />
                </p>
                <li>シーン管理を導入してゲームの状態遷移を整理しました。</li>
                <p>
                  改善前：ゲームの状態遷移が複雑で、コードが長くなりやすい構造でした。<br />
                  改善後：シーン管理を導入し、状態ごとに処理を分離して整理しました。<br />
                </p>
              </ul>
            </div>

            <div className="detail-item">
              <div className="detail-item__head">
                <span className="detail-icon" aria-hidden="true">📝</span>
                <h3 className="detail-title">反省点</h3>
              </div>
              <ul className="bullet-list">
                <li>カリングを設定しなかったため、不要な描画処理が発生してしまいました。</li>
                <li>シェーダーへの理解が不十分で、最適な表現ができませんでした。</li>
                <li>設計が不十分で、コードの保守性や汎用性が低くなってしまいました。</li>
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
