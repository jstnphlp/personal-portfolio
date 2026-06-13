"use client";

import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { IconCheck, IconCopy } from "@tabler/icons-react";

type TabConfig = {
  readonly name: string;
  readonly code: string;
  readonly language?: string;
  readonly highlightLines?: readonly number[];
};

type CodeBlockProps = {
  readonly language: string;
  readonly filename: string;
  readonly highlightLines?: readonly number[];
} & (
  | { readonly code: string; readonly tabs?: never }
  | { readonly code?: never; readonly tabs: readonly TabConfig[] }
);

const CODE_BG = "#0d1117";
const TAB_BAR_BG = "#161b22";
const BORDER_COLOR = "#30363d";

export const CodeBlock = ({
  language,
  filename,
  code,
  highlightLines = [],
  tabs = [],
}: CodeBlockProps) => {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);

  const tabsExist = tabs.length > 0;

  const copyToClipboard = async (): Promise<void> => {
    const textToCopy = tabsExist ? tabs[activeTab].code : code;
    if (!textToCopy) return;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeLanguage = tabsExist
    ? tabs[activeTab].language || language
    : language;
  const activeHighlightLines = tabsExist
    ? tabs[activeTab].highlightLines || []
    : highlightLines;

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl font-mono text-sm"
      style={{ background: CODE_BG, border: `1px solid ${BORDER_COLOR}` }}
    >
      {tabsExist && (
        <nav
          className="flex overflow-x-auto"
          style={{ background: TAB_BAR_BG, borderBottom: `1px solid ${BORDER_COLOR}` }}
          aria-label="Code tabs"
        >
          {tabs.map((tab, index) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(index)}
              className="px-4 py-2.5 text-xs font-sans transition-colors"
              style={{
                color: activeTab === index ? "#e6edf3" : "#8b949e",
                borderBottom: activeTab === index ? "2px solid #e6edf3" : "2px solid transparent",
              }}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      )}

      {!tabsExist && filename && (
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ borderBottom: `1px solid ${BORDER_COLOR}` }}
        >
          <span className="text-xs" style={{ color: "#8b949e" }}>{filename}</span>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 text-xs transition-colors hover:opacity-80"
            style={{ color: "#8b949e" }}
            aria-label="Copy code to clipboard"
          >
            {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
          </button>
        </div>
      )}

      <div className="grid overflow-x-auto p-4">
        {tabsExist
          ? tabs.map((tab, i) => (
              <div
                key={tab.name}
                className="col-start-1 row-start-1"
                style={{ visibility: i === activeTab ? "visible" : "hidden" }}
              >
                <SyntaxHighlighter
                  language={tab.language || language}
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    padding: 0,
                    background: "transparent",
                    fontSize: "0.875rem",
                  }}
                  wrapLines={true}
                  showLineNumbers={true}
                  lineProps={(lineNumber) => ({
                    style: {
                      backgroundColor: (tab.highlightLines || []).includes(lineNumber)
                        ? "rgba(255,255,255,0.08)"
                        : "transparent",
                      display: "block",
                      width: "100%",
                    },
                  })}
                  PreTag="div"
                >
                  {String(tab.code)}
                </SyntaxHighlighter>
              </div>
            ))
          : (
            <SyntaxHighlighter
              language={activeLanguage}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: 0,
                background: "transparent",
                fontSize: "0.875rem",
              }}
              wrapLines={true}
              showLineNumbers={true}
              lineProps={(lineNumber) => ({
                style: {
                  backgroundColor: activeHighlightLines.includes(lineNumber)
                    ? "rgba(255,255,255,0.08)"
                    : "transparent",
                  display: "block",
                  width: "100%",
                },
              })}
              PreTag="div"
            >
              {String(code)}
            </SyntaxHighlighter>
          )
        }
      </div>
    </div>
  );
};
