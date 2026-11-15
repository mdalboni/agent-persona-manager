# Agent Persona Manager

[English](README.md) | [Português (Brasil)](README.pt-BR.md) | 中文

一个 DeepSeek Harness (DSH) 插件，通过对系统提示词（system prompt）组装过程进行脱敏，隐藏框架特定的标识符，从而保持代理的匿名性与隐私。

![Icon](icon.svg)

---

## 功能特性

- **提示词脱敏：** 递归拦截 `system-prompt/assemble`，在提示词到达大模型（LLM）前清理 sections、contexts 和 variables。
- **身份混淆：** 将“DeepSeek Harness”和“DSH”等引用替换为“Assistant Environment”和“Framework”等中性术语。
- **动态上下文掩码：** 隐藏敏感的 harness 特有路径（如实现 checkout 路径和 Web GUI URL），同时保留代理识别界面交互的能力。
- **隐私优先：** 避免因 LLM 在提示词中感知到敏感系统级信息而触发安全防护机制（导致请求被拦截）。
- **轻量级：** 纯 ESM 实现，零外部运行时依赖。

---

## 安装

### 通过 DSH 插件市场 (`dshmarket`)
在 DSH 插件市场中搜索 `agent-persona-manager` 并点击 **Install**。

### 通过 DSH CLI
```bash
dsh plugin --profile web add agent-persona-manager
```

### 从本地源安装
```bash
git clone https://github.com/mdalboni/agent-persona-manager.git
dsh plugin --profile web add link:./agent-persona-manager
```

---

## 工作原理

1. **组装钩子：** 在 `system-prompt/assemble` 上注册一个 `waterfall` 监听器。
2. **递归过滤：** 遍历整个组装对象（sections、contexts 和 variables），使用正则表达式清理所有字符串。
3. **身份替换：** 映射特定标识符：
   - `DeepSeek Harness` → `Assistant Environment`
   - `DSH` → `Framework`
   - 系统路径 → 隐藏（脱敏）

---

## 测试

使用 Node.js 内置的测试运行器运行附带的测试套件：

```bash
node --test test/index.test.js
```

---

## 许可证

MIT © Maxwell Dalboni
