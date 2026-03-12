# 📚 AI 튜터 웹앱앱

PDF 또는 텍스트 문서를 업로드하면, 해당 문서 범위 안에서만 답변하는 AI 과외 선생님 웹앱입니다.

## 💡 만든 이유

LLM을 활용해 공부하다 보면 질문과 관련 없는 내용까지 답변하는 경우가 잦았습니다.
특정 문서 범위 안에서만 답변하는 AI가 있으면 더 효율적으로 공부할 수 있겠다는 생각에 만들었습니다.

## ✨ 주요 기능

- PDF / TXT 문서 업로드
- 업로드한 문서 기반으로만 AI 답변
- 문서에 없는 내용은 "이 문서에서는 찾을 수 없어요"로 안내
- 대화 히스토리 유지

## 🛠 기술 스택

- React + Vite
- Groq API (llama-3.3-70b-versatile)
- pdfjs-dist

## 🚀 실행 방법
```bash
# 패키지 설치
npm install

# .env 파일 생성 후 API 키 입력
VITE_GROQ_API_KEY=your_api_key_here

# 개발 서버 실행
npm run dev
```

## 📁 프로젝트 구조
```
src/
├── App.jsx
├── App.css
├── index.css
└── components/
    ├── ChatBox.jsx
    └── FileUpload.jsx
```