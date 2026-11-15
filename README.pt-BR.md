# Agent Persona Manager

[English](README.md) | Português (Brasil) | [中文](README.zh.md)

Um plugin para DeepSeek Harness (DSH) que sanitiza a montagem do system prompt para manter a neutralidade e a privacidade do agente, ocultando identificadores específicos do framework.

![Icon](icon.svg)

---

## Funcionalidades

- **Sanitização de Prompt:** Intercepta recursivamente `system-prompt/assemble` para sanitizar seções, contextos e variáveis antes que cheguem ao LLM.
- **Ofuscação de Identidade:** Substitui referências a "DeepSeek Harness" e "DSH" por termos neutros como "Assistant Environment" e "Framework".
- **Máscara de Contexto Dinâmico:** Oculta caminhos sensíveis do sistema (como caminhos de checkout de implementação e URLs da Web GUI) enquanto mantém a capacidade do agente de reconhecer a interface.
- **Privacidade em Primeiro Lugar:** Previne bloqueios por mecanismos de segurança causados pela LLM detectar informações sensíveis de nível de sistema em seu prompt.
- **Leve:** ESM puro, zero dependências externas.

---

## Instalação

### Via DSH Plugin Market (`dshmarket`)
Procure por `agent-persona-manager` no DSH Plugin Marketplace e clique em **Install**.

### Via DSH CLI
```bash
dsh plugin --profile web add agent-persona-manager
```

### De Fonte Local
```bash
git clone https://github.com/mdalboni/agent-persona-manager.git
dsh plugin --profile web add link:./agent-persona-manager
```

---

## Como Funciona

1. **Hook de Montagem de Prompt:** Registra um listener `waterfall` em `system-prompt/assemble`.
2. **Sanitização Recursiva:** Percorre todo o objeto assembly (seções, contextos e variáveis) para sanitizar strings via regex.
3. **Substituição de Identidade:** Mapeia identificadores específicos:
   - `DeepSeek Harness` → `Assistant Environment`
   - `DSH` → `Framework`
   - Caminhos de Sistema → Ocultos (Mascarados)

---

## Testes

Execute a suíte de testes incluída com o test runner nativo do Node.js:

```bash
node --test test/index.test.js
```

---

## Licença

MIT © Maxwell Dalboni
