"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useWorkPageEffects } from "@/hooks/useWorkPageEffects";
import { usePrism } from "@/hooks/usePrism";
import { CodeBox } from "@/components/CodeBox";

interface Item {
  id: string;
  title: string;
  category: string;
  content: React.ReactNode;
}

export default function AnotherSufferPage() {
  const firstDetailRef = useRef<HTMLDivElement | null>(null);
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const headerOverlayRef = useRef<HTMLDivElement | null>(null);

  useWorkPageEffects(firstDetailRef, bubbleRef, headerOverlayRef);
  usePrism(["cpp"]);

  const githubLink: string | null = "https://github.com/SyuLin1167/AnotherSuffer";

  const assetBase = "https://github.com/SyuLin1167/my-portfolio/raw/refs/heads/master/public";

  const downloads = {
    executable: {
      label: "実行ファイル(Windows)",
      href: `${assetBase}/assets/AnotherSuffer/AnotherSuffer-exe.zip?download=` as string | null,
    },
    sourceZip: {
      label: "ソースコード",
      href: `${assetBase}/assets/AnotherSuffer/AnotherSuffer-src.zip?download=` as string | null,
    },
    projectFile: {
      label: "プロジェクト",
      href: `${assetBase}/assets/AnotherSuffer/AnotherSuffer-project.zip?download=` as string | null,
    },
  };

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const [opening, setOpening] = useState<Record<string, boolean>>({});
  const [ripplingId, setRipplingId] = useState<string | null>(null);
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const singleOpen = false;

  const items: Item[] = useMemo(
    () => [
      {
        id: "acc-1",
        title: "ステージ生成",
        category: "技術",
        content: (
          <>
            <figure style={{ margin: "0 0 10px" }}>
            <CodeBox language="cpp"
            code={`
  //進行方向を通路に
  ShuffleDirection();
  for (auto& direction: dirArray)
  {
      int nextX = indexX + CalcNextCell(direction, LEFT , RIGHT);
      int nextY = indexY + CalcNextCell(direction, UP, DOWN);

      //2マス移動後が外壁を超えなかったら通路を作る
      int secondNextX = indexX + CalcNextCell(direction, LEFT, RIGHT) * TWO_CELL;
      int secondNextY = indexY + CalcNextCell(direction, UP, DOWN) * TWO_CELL;
      if (IsOnStage(secondNextX) && IsOnStage(secondNextY) &&
          (stageData[secondNextY][secondNextX].type & WALL))
      {
          stageData[nextY][nextX].type = AISLE;
          CreateStage(secondNextX, secondNextY);
      }
  }
            `} />
              <figcaption
                style={{
                  textAlign: "center",
                  fontSize: "0.9rem",
                  color: "#bcd7ff",
                  marginTop: 6,
                }}
              >
                ステージ生成のコードの一部
              </figcaption>
            </figure>
            <p>
              ● ローグライク要素を取り入れたい<br />
              - 穴掘り法をベースにした再帰的な迷路生成アルゴリズムを実装しました。<br />
              これにより、毎度異なる迷路を自動生成できるようになりました。
            </p>
          </>
        ),
      },
      {
        id: "acc-2",
        title: "描画の最適化",
        category: "技術",
        content: (
          <>
            <figure style={{ margin: "0 0 10px" }}>
            <CodeBox language="cpp"
            code={`
    // バックカリングを有効にする
    SetUseBackCulling( TRUE ) ;

  ----------------------------------------------------------------

    //プレイヤーから一定距離離れていたら描画しない
    VECTOR distance = VSub(objPos, player->GetObjPos());
    if (VSize(distance) > CLIP_DISTANCE)
    {
       isVisible = false;
        return;
    }

    //視野にクリップボックスがなかったら描画しない
    clipBoxScale = VScale(objScale, CLIP_BOX_SIZE);
    clipBoxPos1 = VSub(objPos, clipBoxScale);
    clipBoxPos2 = VAdd(objPos, VAdd(clipBoxScale, VGet(0, clipBoxScale.y, 0)));
    if (CheckCameraViewClip_Box(clipBoxPos1, clipBoxPos2))
    {
       isVisible = false;
        return;
    }
            `} />
              <figcaption
                style={{
                  textAlign: "center",
                  fontSize: "0.9rem",
                  color: "#bcd7ff",
                  marginTop: 6,
                }}
              >
                オブジェクト描画のコードの一部
              </figcaption>
            </figure>
            <p>
              ● 描画負荷を軽減したい<br />
              - バックカリングの有効化や距離・視野による描画制限を実装しました。<br />
              これにより、多数のオブジェクトが存在するシーンでも安定したフレームレートを維持できました。
            </p>
          </>
        ),
      },
      {
        id: "acc-5",
        title: "タイトル画面の演出",
        category: "技術",
        content: (
          <>
            <figure style={{ margin: "0 0 10px" }}>
              <img
                src="/assets/AnotherSuffer/AppealPoint_4.gif"
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
              ● オリジナリティのあるゲームを開始するトリガーを実装したい<br />
              - ボールを特定の場所へ動かすことでゲームを開始するようにするアイデアを採用しました。<br />
              これにより、ボタンのクリックや任意のキーを押して開始する一般的なゲームとの差別化を図りました。
            </p>
          </>
        ),
      },
      {
        id: "acc-6",
        title: "敵の追従AI",
        category: "技術",
        content: (
          <>
            <figure style={{ margin: "0 0 10px" }}>
              <CodeBox language="cpp"
            code={`
     //評価が小さい順にまとめるリスト
    std::priority_queue<Node*, std::vector<Node*>, std::function<bool(Node*, Node*)>> openList(
        [](Node* a, Node* b)
        {
            return a->Evaluation() > b->Evaluation();
        });

    //経路をすべて閉鎖
    std::vector< std::vector<bool>> closed(rows, std::vector<bool>(cols, false));

    //開始地点をリストに追加して探索開始
    Node* startNode = new Node(start.second, start.first, 0, Heuristic(start.first, start.second, goal.first, goal.second), nullptr);
    openList.push(startNode);

    //リストが空になるまで探索
    while (!openList.empty())
    {
        //リストの初めを現在のノードにする
        Node* current = openList.top();
        openList.pop();
            `} />
              <figcaption
                style={{
                  textAlign: "center",
                  fontSize: "0.9rem",
                  color: "#bcd7ff",
                  marginTop: 6,
                }}
              >
                敵キャラクターの経路探索コードの一部
              </figcaption>
            </figure>
            <p>
              ● 敵キャラクターにプレイヤーを追尾させたい<br />
              - 正方形のグリッドマップ上において、経路探索はA*アルゴリズムが良いと思い採用しました。<br />
              これにより、迷路内で効率的にプレイヤーを追い詰める動作を実現しました。
            </p>
          </>
        ),
      },
      {
        id: "acc-3",
        title: "ミニマップ",
        category: "機能",
        content: (
          <>
          <figure style={{ margin: "0 0 10px" }}>
              <img
                src="/assets/AnotherSuffer/AppealPoint_3.png"
                alt="ミニマップのスクリーンショット"
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
                ミニマップのスクリーンショット
              </figcaption>
            </figure>
            <p>
              ● 迷路内での位置把握を支援したい<br />
              - カリングの機能を確かめるために、ミニマップを実装しました<br />
              カリングを実装し、描画中のオブジェクトのみをミニマップに反映させました。<br />
              プレイヤーの進行方向周辺のみを表示する仕様となり、より難易度の高いゲーム体験を提供しました。
            </p>
          </>
        ),
      },
    ],
    []
  );

  const onToggle = (id: string) => {
    const isOpen = !!expanded[id];
    setRipplingId(id);
    setTimeout(() => setRipplingId((r) => (r === id ? null : r)), 300);

    if (isOpen) {
      setExpanded((s) => ({ ...s, [id]: false }));
      setVisible((v) => ({ ...v, [id]: true }));

      const panel = panelRefs.current[id];
      if (panel) {
        panel.style.maxHeight = panel.scrollHeight + "px";
        void panel.getBoundingClientRect();
        panel.style.maxHeight = "0px";
      }
    } else {
      if (singleOpen) {
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

      setOpening((o) => ({ ...o, [id]: true }));
      setTimeout(() => setOpening((o) => ({ ...o, [id]: false })), 300);

      setTimeout(() => {
        const panel = panelRefs.current[id];
        if (panel) {
          panel.style.maxHeight = panel.scrollHeight + "px";

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
    if (e.target !== e.currentTarget) return;
    if (!expanded[id]) {
      setVisible((v) => ({ ...v, [id]: false }));
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
        style={{ ["--header-image" as any]: "url('/assets/AnotherSuffer/AnotherSuffer.png')" }}
      >
        <div className="work-header-overlay" ref={headerOverlayRef}>
          <h1>AnotherSuffer</h1>
        </div>
      </header>

      <main>
        <section className="work-detail">
          <div className="detail-grid">
            <div className="detail-item" ref={firstDetailRef}>
              <div className="detail-item__head">
                <span className="detail-icon" aria-hidden="true">👻</span>
                <h2 className="detail-title">作品概要</h2>
              </div>
              <p className="detail-text">人形に追われながら指定された数の障壁を壊していく迷路探索ゲームです。</p>
              <div className="feedback-bubble" ref={bubbleRef}>
                <p className="detail-text">
                  卒業に向け、今までやったことのない技術や表現に挑戦したいと思い制作した作品です。<br />
                  期間内にゲームとしての形は作れましたが、時間が足りずサウンド周りが未実装のまま提出となってしまいました。<br />
                  展示会では来場者の方に実際に触っていただき、良いリアクションをもらえた一方で<br />
                  ゲーム開始への操作方法が分かりづらい印象でした。
                </p>
              </div>
              <ul className="chips">
                <li>3D</li>
                <li>Horror</li>
              </ul>
            </div>

            <div className="detail-item">
              <div className="detail-item__head">
                <span className="detail-icon" aria-hidden="true">🎬</span>
                <h3 className="detail-title">プレイ動画</h3>
              </div>
              <div className="video-embed">
                <div className="video-embed__inner">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/ccn2VxIQVXE?playsinline=1&modestbranding=1&rel=0&iv_load_policy=3"
                    title="YouTube video player"
                    frameBorder={0}
                    loading="lazy"
                    allowFullScreen
                  ></iframe>
                </div>
                                <p className="video-fallback">
                  もし再生できない場合は、
                  <a
                    href="https://www.youtube.com/watch?v=ccn2VxIQVXE"
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
                    <span className="skill-badge">GitHub</span>
                    <span className="skill-badge">GitFork</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-item__head">
                <span className="detail-icon" aria-hidden="true">📅</span>
                <h3 className="detail-title">開発情報</h3>
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
                <span className="detail-icon" aria-hidden="true">✨</span>
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
                <li>迷路生成や経路探索など、アルゴリズムの実装経験が増えた。</li>
                <p>
                  <span className="improvement-before">改善前：</span>アルゴリズムについての理解が浅く、実装に苦労した。<br />
                  <span className="improvement-after">改善後：</span>迷路生成には穴掘り法をベースにした再帰的なアルゴリズムを採用し、経路探索にはA*アルゴリズムを実装した。
                </p>
                <li>描画処理における最適化や工夫の理解が深まった。</li>
                <p>
                  <span className="improvement-before">改善前：</span>多数のオブジェクトが存在するシーンでの描画負荷に悩まされた。<br />
                  <span className="improvement-after">改善後：</span>バックカリングの有効化や距離・視野による描画制限を実装し、安定したフレームレートを維持できた。
                </p>
              </ul>
            </div>

            <div className="detail-item">
              <div className="detail-item__head">
                <span className="detail-icon" aria-hidden="true">📝</span>
                <h3 className="detail-title">反省点</h3>
              </div>
              <ul className="bullet-list">
                <li>サウンド周りが未実装のまま提出となってしまった。</li>
                <li>迷路生成で稀に不具合が発生することがあった。</li>
                <li>実際に触ってもらった際に、ゲームをどう開始すれば良いか分かりづらい印象だった。</li>
                <li>命名が一貫しておらず、コードの可読性が低下してしまった。</li>
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
                    <span className="link-placeholder__text">GitHubを使用していない作品です。</span>
                  </div>
                )}
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-item__head">
                <span className="detail-icon" aria-hidden="true">⬇</span>
                <h3 className="detail-title">ダウンロード</h3>
              </div>
              <div className="link-row">
                {downloads.executable.href ? (
                  <a className="btn-download" href={downloads.executable.href} download>
                    <span className="btn-label">{downloads.executable.label}</span>
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
