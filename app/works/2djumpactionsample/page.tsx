"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useWorkPageEffects } from "@/hooks/useWorkPageEffects";
import { CodeBox } from "@/components/CodeBox";
import { usePrism } from "@/hooks/usePrism";

interface Item {
  id: string;
  title: string;
  content: React.ReactNode;
}

export default function JumpActionPage() {
  const firstDetailRef = useRef<HTMLDivElement | null>(null);
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const headerOverlayRef = useRef<HTMLDivElement | null>(null);

  useWorkPageEffects(firstDetailRef, bubbleRef, headerOverlayRef);
  usePrism(["cpp"]);

  const githubLink: string | null = "https://github.com/SyuLin1167/2DJumpActionSample";

  const downloads = {
    executable: {
      label: "実行ファイル（Windows）",
      href: "/assets/2DJumpActionSample/2DJumpActionSample-exe.zip" as string | null,
    },
    sourceZip: {
      label: "ソースコード",
      href: "/assets/2DJumpActionSample/2DJumpActionSample-src.zip" as string | null,
    },
    projectFile: {
      label: "プロジェクト",
      href: "/assets/2DJumpActionSample/2DJumpActionSample-project.zip" as string | null,
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
        title: "ヘッダーファイルからモジュール化への移行",
        content: (
          <>
            <CodeBox
              language="cpp"
              code={`
    export module GameSystem.Execution;

    import <memory>;

    /// <summary>
    /// システム関連
    /// </summary>
    export namespace gameSystem
    {
        /// <summary>
        /// ゲームの実行を行う
        /// </summary>
        export class Execution final
        {
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
              ヘッダーファイル依存の整理
            </figcaption>
            <p>
              C++20のモジュール機能(.ixxファイル)を活用し、ビルド時間の短縮を図りました。<br />
              これにより、ヘッダー特有の問題が軽減されコードの可読性と保守性が向上しています。
            </p>
          </>
        ),
      },
      {
        id: "acc-2",
        title: "コンポーネント指向",
        content: (
          <>
            <CodeBox
              language="cpp"
              code={`

    // ジャンプ機能追加
    auto jump = m_compMgr->AddComponent<component::Jump>(this, pData.moveSpeed.y,
     std::bind(input::KeyStatus::CheckKey, keyType.SPACE, ON_PRESS));
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
              プレイヤーへジャンプ機能をコンポーネントとして追加している様子
            </figcaption>
            <p>
              ゲームオブジェクトに機能を追加する際、継承よりもコンポーネント指向を採用しました。<br />
              これにより、機能の組み合わせが柔軟になり、コードの再利用性と拡張性が向上しています。
            </p>
          </>
        ),
      },
      {
        id: "acc-3",
        title: "メモリマップドファイルによるファイル読み込み最適化",
        content: (
          <>
            <CodeBox
              language="cpp"
              code={`
    //ファイルハンドルの作成
    m_fileHandle = CreateFile(fileName, GENERIC_READ, FILE_SHARE_READ, 0, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, 0);
    if (m_fileHandle == INVALID_HANDLE_VALUE)
    {
        return false;
    }

    // サイズ0のファイルは MapViewできないので特別扱い
    if (GetFileSize() == 0) {
        m_mapHandle = nullptr;
        m_ptr = nullptr;
        return true;
    }

    //ハンドルのマッピング
    m_mapHandle = CreateFileMapping(m_fileHandle, 0, PAGE_READONLY, 0, 0, 0);
    if (!m_mapHandle)
    {
        CloseHandle(m_fileHandle);
        m_fileHandle = INVALID_HANDLE_VALUE;
        return false;
    }

    //マッピングデータをポインタへ格納
    m_ptr = static_cast<char*>(MapViewOfFile(m_mapHandle, FILE_MAP_READ, 0, 0, 0));
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
              メモリマップドファイルのファイルオープン処理
            </figcaption>
            <p>
              大容量のデータファイル読み込みにおいて、メモリマップドファイルを利用することでパフォーマンスを最適化しました。<br />
              これにより、ファイルI/Oの効率が向上し、ゲームの起動時間と動作のスムーズさが改善されました。
            </p>
          </>
        ),
      },
      {
        id: "acc-4",
        title: "コルーチン",
        content: (
          <>
            <CodeBox
              language="cpp"
              code={`
// 読み込み完了まで待機
co_yield WaitUntil{ [this] { return !task::LoadingContext::Get()->IsLoading(); } };

// 100%表示用の待機時間
co_yield WaitForSeconds{ 0.5f };

// 読み込み完了
co_return;
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
              コルーチンを使用した非同期処理
            </figcaption>
            <p>
              コルーチンを導入し、非同期処理におけるシーン遷移での状態管理を簡素化しました。<br />
              これにより、コードの可読性が向上し、非同期タスクの実装が容易になりました。
            </p>
          </>
        ),
      },
      {
        id: "acc-5",
        title: "コマンドパターンによる状態管理",
        content: (
          <>
            <CodeBox
              language="cpp"
              code={`
// フレーム終端でコマンド適用
        std::visit(
            [this](auto&& cmd)
            {
                using T = std::decay_t<decltype(cmd)>;
                if constexpr (std::is_same_v<T, std::monostate>)
                {
                    // 何もしない
                }
                else if constexpr (std::is_same_v<T, CmdPush>)
                {
                    // 新しいシーンを積む
                    auto next = cmd.build ? cmd.build() : nullptr;
                    if (next)
                    {
                        m_nowScene.push(next);
                        m_nowScene.top()->Init();
                    }
                }
                else if constexpr (std::is_same_v<T, CmdReplace>)
                {
                    // 現在のシーンを置き換える
                    auto next = cmd.build ? cmd.build() : nullptr;
                    if (next)
                    {
                        if (!m_nowScene.empty())
                        {
                            m_nowScene.pop();
                        }
                        m_nowScene.push(next);
                        m_nowScene.top()->Init();
                    }
                }
                else if constexpr (std::is_same_v<T, CmdPop>)
                {
                    // 現在のシーンを取り除く
                    if (!m_nowScene.empty())
                    {
                        m_nowScene.pop();
                    }
                }
                else if constexpr (std::is_same_v<T, CmdQuit>)
                {
                    // ゲーム終了
                    PostQuitMessage(0);
                    m_isRunning = false;
                }
            },
            m_pendingCmd);

        // コマンドをクリア
        m_pendingCmd = std::monostate{};
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
              シーン管理におけるコマンド適用
            </figcaption>
            <p>
              シーン遷移の管理にコマンドパターンを採用し、シーン操作の柔軟性と拡張性を向上させました。<br />
              これにより、新しいシーン操作の追加が容易になり、コードの保守性が高まりました。
            </p>
          </>
        ),
      },
      {
        id: "acc-6",
        title: "マップデータの管理",
        content: (
          <>
            <CodeBox
              language="cpp"
              code={`
    //チャンク化してマップデータ格納
    m_mapData = tile::BuildChunkedGrid<size_t>(
      m_mapInfo.mapSize.x,
      m_mapInfo.mapSize.y,
      m_mapInfo.chunkSize,
      [&](size_t, size_t, size_t gidx, size_t, size_t)->std::optional<size_t>
        {
          return std::optional<size_t>{ dataArray[gidx] };
        });
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
              マップデータの読み込み処理
            </figcaption>
            <p>
              マップデータの管理にJSON形式を採用し、nlohmann/jsonライブラリを使用してデータの読み書きを行いました。<br />
              データを格納する際に、チャンク化を導入し一次元配列として管理することで、メモリ使用量とアクセス効率を最適化しました。<br />
              また、描画範囲を動的に計算し、必要なタイルのみを描画することでパフォーマンスを向上させています。
            </p>
          </>
        ),
      },
      {
        id: "acc-7",
        title: "コライダーによる衝突判定",
        content: (
          <>
            <CodeBox
              language="cpp"
              code={`
    // 当たり判定追加
    col2d::ColliderDef colDef{};
    colDef.localPos = m_pos;
    colDef.isActive = true;
    colDef.shouldCCD = true;
    id = ObjCtx::ColMgr().CreateRectCollider(&colDef, Vector2f(imgW - 4, imgH), MyObjectTag());
    ObjCtx::ColMgr().AddMask(id, col2d::CIRCLE, ObjectTag::ENEMY);

    // 衝突イベント追加
    col2d::ContactListener listener;
    listener.when = [&]() {return ObjCtx::ColMgr().GetCollider(id)->GetVelocity().y == 0 && m_velocity.y > 0; };
    listener.event = [&, jump]() {jump->CanJump(); };
    ObjCtx::ColMgr().AddEvent(id, col2d::MakeKey(col2d::TILE, ObjectTag::MAP), listener);
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
              衝突判定のコライダー作成処理
            </figcaption>
            <p>
              box2dライブラリを参考に独自の2Dコライダーシステムを実装しました。<br />
              これにより、コライダーの追加・定義・形状・衝突対象を簡易的に設計することを可能にしました。<br />
              また、ID管理を導入し、クラス間での依存排除とコライダーのライフサイクル管理を効率化しています。<br />
              衝突判定にはAABB方式等を採用<br />
              スイープや連続衝突検出(CCD)にも対応させることで効率的な衝突検出を実現しました。<br />
              また、衝突イベントリスナーを導入し、衝突イベントの追加や特定の条件下でのイベント発火を可能にしました。
            </p>
          </>
        ),
      },
      {
        id: "acc-8",
        title: "UIの管理",
        content: (
          <>
            <CodeBox
              language="cpp"
              code={`
    // スタートボタン作成
    shape::Rect buttonRect(START_BTN_POS, BTN_SIZE);
    ui::ButtonDef startButtonDef("Start", buttonRect, GetColor(150, 100,80));
    startButtonDef.onReleased = [this]() { m_toNextScene = true; };
    m_startButtonID = AppCtx::UIMgr().Create<ui::Button>(&startButtonDef);
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
              スタートボタンの作成処理
            </figcaption>
            <p>
              コライダーの設計を参考に、<br />
              UI管理システムを構築し、UI要素の作成・配置・イベント処理を効率化しました。<br />
              これにより、UIコンポーネントのライフサイクル管理が容易になり、コードの可読性と保守性が向上しています。
            </p>
          </>
        ),
      },
      {
        id: "acc-9",
        title: "非同期処理",
        content: (
          <>
            <CodeBox
              language="cpp"
              code={`
// タスクの追加実行
m_taskInfo[(int)level].tasks.emplace_back(std::async(std::launch::async, [this, level, task]() {

  // 前レベルの完了待ち
  if (level != Level::DATA)
  {
    int prevIndex = (int)level - 1;
    while (prevIndex >= 0)
    {
      auto& prev = m_taskInfo[prevIndex];
      if (prev.totalTasks.load(std::memory_order_acquire) > 0)
      {
        prev.future.wait();
        break;
      }
      --prevIndex;
    }
  }

  // タスク実行
  task();

  // 全体レベルの完了数を加算
  auto& endInf = m_taskInfo[(int)Level::END];
  endInf.finishTasks.fetch_add(1, std::memory_order_relaxed);

  // レベル別の完了数を加算
  auto& info = m_taskInfo[(int)level];
  int finish = info.finishTasks.fetch_add(1, std::memory_order_relaxed) + 1;

  // レベル完了でシグナル
  if (finish == info.totalTasks.load(std::memory_order_relaxed))
  {
    info.promise.set_value();
  }

  // 全レベル完了でフラグを下ろす
  if (endInf.finishTasks.load(std::memory_order_relaxed) == endInf.totalTasks.load(std::memory_order_relaxed))
  {
    m_isLoading.store(false, std::memory_order_relaxed);
  }
}));
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
              非同期処理
            </figcaption>
            <p>
              非同期処理の実装により、リソースの読み込みやシーン遷移をスムーズに行えるようにしました。<br />
              また、処理の進捗管理を導入し、ロード画面での進捗表示を可能にしました。<br />
              これにより、ゲームのパフォーマンスが向上し、ユーザー体験が改善されました。
            </p>
          </>
        ),
      },
      {
        id: "acc-10",
        title: "前回からの成長点",
        content: (
          <ul className= "bullet-list">
            <li>命名規則やコードスタイルの統一により、チーム開発の効率化とコードの一貫性を確保。</li>
            <li>クラス間の依存関係を極力排除するよう設計し、モジュール性と保守性を向上。</li>
            <li>C++20のモジュール機能を活用し、ビルド時間の短縮とコードの可読性向上を実現。</li>
            <li>コンポーネント指向を採用し、機能の組み合わせの柔軟性とコードの再利用性を向上。</li>
            <li>メモリマップドファイルを利用して大容量データの読み込みパフォーマンスを最適化。</li>
            <li>コルーチンを導入し、非同期処理の可読性と実装の容易さを向上。</li>
            <li>コマンドパターンを採用し、シーン管理の柔軟性と拡張性を向上。</li>
            <li>チャンク化された一次元配列でマップデータを管理し、メモリ使用量とアクセス効率を最適化。</li>
            <li>独自の2Dコライダーシステムを実装し、衝突判定の効率化とライフサイクル管理を改善。</li>
            <li>UI管理システムを構築し、UI要素のライフサイクル管理とコードの可読性を向上。</li>
          </ul>
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
        style={{ ["--header-image" as any]: "url('/assets/2DJumpActionSample/2DJumpActionSample.png')" }}
      >
        <div className="work-header-overlay" ref={headerOverlayRef}>
          <h1>2DJumpActionSample</h1>
        </div>
      </header>

      <main>
        <section className="work-detail">
          <div className="detail-grid">
            <div className="detail-item" ref={firstDetailRef}>
              <div className="detail-item__head">
                <span className="detail-icon" aria-hidden="true">🎮</span>
                <h2 className="detail-title">作品概要</h2>
              </div>
              <p className="detail-text">簡易的な2D横スクロールのジャンプアクションゲームのサンプルです。</p>
              <div className="feedback-bubble" ref={bubbleRef}>
                <p className="detail-text">
                  学校の教材として提供する目的で制作しました。<br />
                  従来のサンプルよりも設計を整理し、拡張性と可読性を高めることを目指しており<br />
                  基本的なアクションや物理挙動、デザインパターンなどを実装しています。<br />
                  実際に紹介した学生からは、学習に役立つとの声をいただいています。<br />
                  また、恩師の先生からはSDL版も欲しいとの要望をいただいており、今後の展開も検討中です。
                </p>
              </div>
              <ul className="chips">
                <li>2D</li>
                <li>Action</li>
              </ul>
            </div>

            <div className="detail-item">
              <div className="detail-item__head">
                <span className="detail-icon" aria-hidden="true">🎥</span>
                <h3 className="detail-title">プレイ動画</h3>
              </div>
              <div className="video-embed">
                <video
                  controls
                  preload="metadata"
                  style={{ width: "100%", display: "block", borderRadius: 12 }}
                >
                  <source src="/assets/2DJumpActionSample/playmovie.mp4" type="video/mp4" />
                  お使いのブラウザでは動画を再生できません。直接ファイルを開いてください。
                </video>
                <p className="video-fallback">ローカルのプレイ動画 (MP4) を埋め込み表示しています。</p>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-item__head">
                <span className="detail-icon" aria-hidden="true">🛠️</span>
                <h3 className="detail-title">使用技術</h3>
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
                    <span className="skill-badge">nlohmann/json</span>
                  </div>
                </div>
                <div className="skill-cat">
                  <h4 className="skill-cat__title">IDE/環境</h4>
                  <div className="skill-badges">
                    <span className="skill-badge">Visual Studio</span>
                    <span className="skill-badge">GitHub</span>
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
                  <span className="meta-value">約6ヶ月(現在も継続中)</span>
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
