# HotelMind — AI-Powered Hospitality Landing Page

A production-ready Next.js landing page with an embedded RAG-powered AI chatbot for hospitality technology.

## Tech Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — animations
- **shadcn/ui** — UI components (Radix primitives)
- **React Hook Form** + **Zod** — form validation
- **OpenAI Responses API** — chat completions
- **IndexedDB** — chat persistence

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy the example env file and add your OpenAI API key:

```bash
cp .env.example .env.local
```

```env
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_MODEL=gpt-4o-mini
RATE_LIMIT_MAX=20
RATE_LIMIT_WINDOW_MS=60000
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── api/chat/route.ts    # Chat API with RAG + OpenAI
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── chatbot/             # Floating chatbot widget
│   ├── landing/             # Landing page sections
│   └── ui/                  # shadcn/ui components
├── data/
│   └── knowledge-base.json  # Hotel knowledge base
├── features/chat/
│   └── useChat.ts           # Chat state management
├── hooks/
│   ├── useChatPersistence.ts
│   └── useInView.ts
├── lib/
│   ├── rag/                 # RAG: chunking, embeddings, retrieval
│   ├── openai.ts
│   ├── rate-limit.ts
│   ├── sanitize.ts
│   └── validations.ts
├── services/
│   └── chat-service.ts
└── types/
    ├── chat.ts
    └── knowledge.ts
```

## Features

- **Landing Page**: Hero, Features, How It Works, Benefits, FAQ, Contact, Footer
- **Floating Chatbot**: Pulse FAB, slide-out drawer, quick suggestions, typing indicator
- **RAG Pipeline**: JSON knowledge base → chunking → cosine similarity → context injection
- **Security**: Rate limiting, Zod validation, input sanitization, prompt injection detection
- **Persistence**: IndexedDB chat history with clear conversation support
- **Performance**: RSC, dynamic imports, memoization, security headers

## Knowledge Base

Edit `src/data/knowledge-base.json` to customize hotel information. The AI assistant answers **only** from this knowledge base.

## Security

- API keys are server-side only (never exposed to client)
- Rate limiting on `/api/chat`
- Input sanitization and length limits
- Prompt injection pattern detection
- OWASP-aligned security headers

## Scripts

| Command         | Description          |
| --------------- | -------------------- |
| `npm run dev`   | Start dev server     |
| `npm run build` | Production build     |
| `npm run start` | Start production     |
| `npm run lint`  | Run ESLint           |

## License

Private — All rights reserved.
