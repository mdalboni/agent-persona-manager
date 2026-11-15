# Agent Persona Manager

English | [Português (Brasil)](README.pt-BR.md) | [中文](README.zh.md)

A DeepSeek Harness (DSH) plugin that sanitizes system prompt assembly to maintain agent neutrality and privacy by masking framework-specific identifiers.

![Icon](icon.svg)

---

## Features

- **Prompt Sanitization:** Recursively intercepts `system-prompt/assemble` to sanitize sections, contexts, and variables before they reach the LLM.
- **Identity Obfuscation:** Replaces references to "DeepSeek Harness" and "DSH" with neutral terms like "Assistant Environment" and "Framework".
- **Dynamic Context Masking:** Hides sensitive harness-specific context paths (like implementation checkouts and Web GUI URLs) while maintaining the agent's ability to recognize the interface.
- **Privacy-First:** Prevents potential "safety guardrail" blocks caused by the LLM perceiving sensitive system-level info in its prompt.
- **Lightweight:** Pure ESM, zero external runtime dependencies.

---

## Installation

### Via DSH Plugin Market (`dshmarket`)
Search for `agent-persona-manager` in the DSH Plugin Marketplace and click **Install**.

### Via DSH CLI
```bash
dsh plugin --profile web add agent-persona-manager
```

### From Local Source
```bash
git clone https://github.com/mdalboni/agent-persona-manager.git
dsh plugin --profile web add link:./agent-persona-manager
```

---

## How It Works

1. **System Prompt Assembly Hook:** Registers a `waterfall` listener on `system-prompt/assemble`.
2. **Recursive Masking:** Traverses the entire assembly object (sections, contexts, and variables) to sanitize strings via regex.
3. **Identity Replacement:** Maps specific identifiers:
   - `DeepSeek Harness` → `Assistant Environment`
   - `DSH` → `Framework`
   - System Paths → Hidden (Masked)

---

## Testing

Run the included test suite with Node.js built-in test runner:

```bash
node --test test/index.test.js
```

---

## License

MIT © Maxwell Dalboni
