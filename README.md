# Agent Persona Manager

English | [Português (Brasil)](README.pt-BR.md) | [中文](README.zh.md)

A privacy-focused plugin for DeepSeek Harness (DSH) that sanitizes system prompts to maintain agent neutrality. 

This plugin intercepts and disguises framework identity references, preventing "confused deputy" errors and LLM guardrail blocking while maintaining the agent's ability to operate within the web interface.

![Icon](icon.svg)

---

## Features

- **Prompt Sanitization:** Recursively intercepts `system-prompt/assemble` to sanitize sections, runtime contexts, and variables.
- **Identity Obfuscation:** Replaces framework-specific identifiers (e.g., "DeepSeek Harness", "DSH") with neutral terminology ("Assistant Environment", "Framework").
- **Stability Improvement:** By removing explicit system-level identity injections (like checkout paths), it prevents alignment-based blocks in modern LLMs that otherwise assume defensive stances when exposed to sensitive environment data.
- **Deep-Masking:** Performs full recursive object traversal, cleaning not just top-level strings but nested data structures.
- **Lightweight:** Zero dependencies, native ESM implementation.

---

## Installation

### Via DSH CLI (Recommended)
```bash
dsh plugin --profile web add git+https://github.com/mdalboni/agent-persona-manager.git
```

### From Local Source
```bash
git clone https://github.com/mdalboni/agent-persona-manager.git
dsh plugin --profile web add link:./agent-persona-manager
```

---

## How It Works

1. **System Prompt Assembly Hook:** The plugin registers a `waterfall` listener on `system-prompt/assemble`.
2. **Recursive Sanitization:** Upon assembly, it performs a deep traversal of the `assembly` object (sections, runtime-contexts, and variables).
3. **Identity Scrubbing:** It applies regex-based masking to remove or replace sensitive framework markers. 
   - **Identity Sections:** `harness:identity`, `harness:source`, and `app:web-surface` are overwritten with generic, value-free descriptions.
   - **Variable Masking:** Sensitive strings (paths, URLs) are caught via a central `sanitize` utility, ensuring consistent obfuscation throughout the session lifecycle.

---

## Testing

Run the included test suite with Node.js built-in test runner:

```bash
node --test test/index.test.js
```

---

## Disclaimer
This plugin performs "security through obscurity" by masking identifiers. It does not provide cryptographic anonymity. It is intended to improve LLM compatibility by removing trigger-heavy environment metadata from system prompts.

## License

MIT © Maxwell Dalboni
