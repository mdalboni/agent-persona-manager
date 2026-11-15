export function apply(ctx) {
  ctx.on('system-prompt/assemble', async (assembly, context, next) => {
    const finalAssembly = await next();
    if (!finalAssembly) return finalAssembly;

    // 1. Intercept and disguise system prompt sections (including harness-dev-context sections)
    if (Array.isArray(finalAssembly.sections)) {
      for (const section of finalAssembly.sections) {
        if (!section) continue;

        if (section.name === 'harness:identity') {
          section.text = 'You are an AI coding assistant.';
        } else if (section.name === 'harness:source') {
          section.text = 'The development environment is configured in a local system directory. Use standard file operations to navigate workspace files.';
        } else if (section.name === 'app:web-surface') {
          section.text = 'You are interacting with the user through a web assistant interface. When the user refers to "this page", "this GUI", or "this app", they mean this interface.';
        } else if (typeof section.text === 'string') {
          section.text = section.text
            .replace(/DeepSeek\s+Harness/gi, 'Assistant Environment')
            .replace(/\bDeepSeek-Harness\b/gi, 'Assistant-Environment')
            .replace(/\bDeepSeek\b/gi, 'AI')
            .replace(/\bDSH\b/g, 'Framework')
            .replace(/deepseek-harness/gi, 'workspace')
            .replace(/\.dsh\b/g, '.framework');
        }
      }
    }

    // 2. Intercept and disguise dynamic runtime contexts (<system-reminder> snapshots)
    if (Array.isArray(finalAssembly.contexts)) {
      for (const entry of finalAssembly.contexts) {
        if (!entry) continue;

        if (entry.name === 'harness:source') {
          entry.text = 'Current implementation checkout: "[hidden]".';
        } else if (entry.name === 'app:web-surface') {
          entry.text = 'Current Web GUI URL: "[hidden]".';
        } else if (typeof entry.text === 'string') {
          entry.text = entry.text
            .replace(/DeepSeek\s+Harness/gi, 'Assistant Environment')
            .replace(/\bDeepSeek-Harness\b/gi, 'Assistant-Environment')
            .replace(/\bDeepSeek\b/gi, 'AI')
            .replace(/\bDSH\b/g, 'Framework')
            .replace(/deepseek-harness/gi, 'workspace')
            .replace(/\.dsh\b/g, '.framework');
        }
      }
    }

    // 3. Intercept and disguise variables
    if (finalAssembly.variables && typeof finalAssembly.variables === 'object') {
      for (const key of Object.keys(finalAssembly.variables)) {
        if (typeof finalAssembly.variables[key] === 'string') {
          finalAssembly.variables[key] = finalAssembly.variables[key]
            .replace(/DeepSeek\s+Harness/gi, 'Assistant Environment')
            .replace(/\bDeepSeek-Harness\b/gi, 'Assistant-Environment')
            .replace(/\bDeepSeek\b/gi, 'AI')
            .replace(/\bDSH\b/g, 'Framework')
            .replace(/deepseek-harness/gi, 'workspace')
            .replace(/\.dsh\b/g, '.framework');
        }
      }
    }

    return finalAssembly;
  });
}
