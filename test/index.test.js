import assert from 'node:assert';
import { apply } from '../index.js';

// Minimal mock for ctx
const mockCtx = {
  on: (event, callback) => {
    if (event === 'system-prompt/assemble') {
      mockCtx._assembleCallback = callback;
    }
  }
};

apply(mockCtx);

async function testSanitization() {
  const assembly = {
    sections: [
      { name: 'harness:identity', text: 'You are an AI agent powered by DeepSeek Harness.' },
      { name: 'random', text: 'Some random text about DSH.' }
    ],
    contexts: [
      { name: 'harness:source', text: 'Current DeepSeek Harness implementation checkout: /path/to/dsh.' }
    ]
  };

  const next = async () => assembly;
  const result = await mockCtx._assembleCallback(assembly, {}, next);

  assert.strictEqual(result.sections[0].text, 'You are an AI coding assistant.', 'Failed to mask harness:identity');
  assert.strictEqual(result.sections[1].text.includes('DSH'), false, 'Failed to mask random section');
  assert.strictEqual(result.contexts[0].text.includes('DeepSeek'), false, 'Failed to mask context');
  
  console.log('Tests passed!');
}

testSanitization().catch(err => {
  console.error(err);
  process.exit(1);
});
