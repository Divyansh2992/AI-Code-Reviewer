import { useState, useEffect } from "react";
import "./App.css";
import "prismjs/themes/prism-tomorrow.css";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function App() {
  const [code, setCode] = useState(``);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  async function reviewCode() {
    if (!code.trim()) return;
    setIsLoading(true);
    setError("");
    setReview("");
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
      const response = await axios.post(`${backendUrl}/ai/get-review`, { code });
      setReview(response.data);
    } catch (err) {
      setError("Failed to get review. Please check your connection and try again.");
      console.error("Error fetching review:", err);
    } finally {
      setIsLoading(false);
    }
  }

  const charCount = code.length;
  const lineCount = code.split("\n").length;

  return (
    <>
      <header className="app-header">
        <div className="header-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">AI Code Reviewer</span>
        </div>
        <span className="header-badge">Powered by Groq · LLaMA 3.3</span>
      </header>

      <main>
        <div className="left">
          <div className="editor-topbar">
            <span className="editor-label">📝 Your Code</span>
            <span className="editor-stats">{lineCount} lines · {charCount} chars</span>
          </div>
          <div className="code">
            <Editor
              value={code}
              onValueChange={(newCode) => setCode(newCode)}
              highlight={(code) =>
                Prism.highlight(code, Prism.languages.javascript, "javascript")
              }
              padding={16}
              placeholder="Paste your code here..."
              style={{
                fontSize: 14,
                fontFamily: "'Fira Code', 'Cascadia Code', monospace",
                width: "100%",
                minHeight: "100%",
                background: "transparent",
              }}
            />
          </div>
          <button
            className={`review-btn ${isLoading ? "loading" : ""}`}
            onClick={reviewCode}
            disabled={isLoading || !code.trim()}
          >
            {isLoading ? (
              <>
                <span className="btn-spinner" />
                Reviewing…
              </>
            ) : (
              <>
                <span className="btn-icon">🔍</span>
                Review Code
              </>
            )}
          </button>
        </div>

        <div className="right">
          <div className="review-topbar">
            <span className="editor-label">💡 AI Review</span>
            {review && !isLoading && (
              <span className="review-done-badge">✓ Done</span>
            )}
          </div>

          {isLoading && (
            <div className="skeleton-wrap">
              <div className="skeleton-line wide" />
              <div className="skeleton-line medium" />
              <div className="skeleton-line short" />
              <div className="skeleton-gap" />
              <div className="skeleton-line wide" />
              <div className="skeleton-line medium" />
              <div className="skeleton-gap" />
              <div className="skeleton-line wide" />
              <div className="skeleton-line short" />
              <div className="skeleton-line medium" />
              <p className="skeleton-hint">Analyzing your code with LLaMA 3.3…</p>
            </div>
          )}

          {error && !isLoading && (
            <div className="error-box">
              <span className="error-icon">⚠️</span>
              <p>{error}</p>
              <button className="retry-btn" onClick={reviewCode}>
                Retry
              </button>
            </div>
          )}

          {!isLoading && !error && review && (
            <div className="review-content">
              <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
            </div>
          )}

          {!isLoading && !error && !review && (
            <div className="empty-state">
              <span className="empty-icon">🚀</span>
              <p>Paste code on the left and hit <strong>Review Code</strong> to get an AI-powered review.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
