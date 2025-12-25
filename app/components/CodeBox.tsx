import React from "react";

type CodeBoxProps = {
  title?: string;
  language?: string;
  code: string;
};

/**
 * シンプルなコード表示ボックス（Prism用クラス付き）
 */
export function CodeBox({ title, language = "text", code }: CodeBoxProps) {
  const langClass = `language-${language}`;
  return (
    <div className="code-box" role="region" aria-label={title ?? "コード"}>
      <pre className={`code-block ${langClass}`}>
        <code className={langClass}>{code}</code>
      </pre>
    </div>
  );
}
