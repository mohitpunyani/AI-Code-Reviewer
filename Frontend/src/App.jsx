import { useEffect, useState } from 'react'
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs"
import './App.css'
import axios from "axios";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Markdown from "react-markdown"

function App() {
  useEffect(()=>
  {
    prism.highlightAll();
  })
  const [code, setCode] = useState(`function sum() {
    return 1+1
    }`)
    const [state, setState] = useState(true);
    const [review, setReview] = useState(`Let'sReview your code`);
    const reviewCode = async () => {
  try {
    if (state)
       {
      setState(false);
      const res = await axios.post('https://ai-code-reviewer-uvs3.onrender.com/api/aiRoutes/getReview', { code });
      setReview(res.data);
    }
  } catch (error) {
    console.error('Error fetching code review:', error);
  } finally {
    setState(true);
  }
};


  return (
    <>
    <main>
      <div className="left">
        <div className="code">
           <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "none",
                minHeight: "100%",
                width: "100%",
        
              }}
            />
        </div>
       <button className={`review ${!state ? "disabled" : ""}`} onClick={reviewCode} disabled={!state}>
  Review
</button>

      </div>
     <button className="right">
      { state?<>
          <Markdown

            rehypePlugins={[ rehypeHighlight ]}

          >{review}</Markdown>
          </>: <> Loading... </>
        }
        </button>
    </main>
    </>
  )
  
}

export default App
