import { useState } from "react";
import Groq from "groq-sdk";
import FileUpload from "./components/FileUpload";
import ChatBox from "./components/ChatBox";
import "./App.css";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function App() {
  const [docText, setDocText] = useState("");
  const [docName, setDocName] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTextExtracted = (text, name) => {
    setDocText(text);
    setDocName(name);
    setMessages([]);
  };

  const sendMessage = async () => {
    if (!input.trim() || !docText || isLoading) return;

    const userMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `너는 친절한 AI 과외 선생님이야. 아래 문서 내용만을 바탕으로 질문에 답해줘. 문서에 없는 내용이면 "이 문서에서는 찾을 수 없어요"라고 솔직하게 말해줘.\n\n---문서 내용---\n${docText.slice(0, 8000)}`,
          },
          ...newMessages.map((m) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.content,
          })),
        ],
      });

      const aiMsg = {
        role: "assistant",
        content: response.choices[0].message.content,
      };
      setMessages([...newMessages, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "오류가 발생했어요. 다시 시도해줘요." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">AI 과외 선생님</h1>
        <div className="header-right">
          <FileUpload onTextExtracted={handleTextExtracted} />
          {docName && <span className="doc-name">📄 {docName}</span>}
        </div>
      </header>
      <ChatBox messages={messages} isLoading={isLoading} />
      <div className="input-area">
        <input
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder={docText ? "문서에 대해 질문해보세요..." : "먼저 문서를 업로드해주세요"}
          disabled={!docText || isLoading}
        />
        <button className="send-btn" onClick={sendMessage} disabled={!docText || isLoading}>
          전송
        </button>
      </div>
    </div>
  );
}