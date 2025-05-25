import { useState, useEffect } from "react";
import "./App.css";
import "prismjs/themes/prism-tomorrow.css";
import Prism from "prismjs";
import "prismjs/components/prism-javascript"; // Ensure JavaScript highlighting
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function App() {
  const [code, setCode] = useState(``);
  const [review, setReview] = useState("");

  useEffect(() => {
    Prism.highlightAll();
  }, [code]); // Ensures highlighting updates when the code changes

  async function reviewCode() {
    try {
      const response = await axios.post("http://localhost:4000/ai/get-review", { code });
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching review:", error);
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(newCode) => setCode(newCode)}
              highlight={(code) => Prism.highlight(code, Prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontSize: 16,
                fontFamily: "monospace",
                width: "100%",
                height: "100vh",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
              }}
            />
          </div>
          <div className="review" onClick={reviewCode}>
            Review
          </div>
        </div>
        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
