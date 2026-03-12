import { useEffect, useRef } from "react";

export default function ChatBox({ messages, isLoading }) {
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="chatbox">
      {messages.length === 0 && (
        <div className="empty-state">
          <p className="empty-title">문서를 업로드하고</p>
          <p className="empty-sub">무엇이든 물어보세요</p>
        </div>
      )}
      {messages.map((msg, i) => (
        <div key={i} className={`message ${msg.role}`}>
          <span className="role-label">{msg.role === "user" ? "나" : "AI"}</span>
          <p>{msg.content}</p>
        </div>
      ))}
      {isLoading && (
        <div className="message assistant">
          <span className="role-label">AI</span>
          <p className="typing">···</p>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}