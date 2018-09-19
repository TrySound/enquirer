'use strict';

require('mocha');
const assert = require('assert');
const support = require('./support');
const { nextTick } = support(assert);
const PasswordPrompt = require('../lib/prompts/password');
let prompt;

class Prompt extends PasswordPrompt {
  constructor(options) {
    super({ ...options, show: false });
  }
}

describe('prompt-password', function() {
  describe('options.initial', () => {
    it('should use options.initial', () => {
      prompt = new Prompt({
        message: 'What is your password?',
        initial: 'woohooo!'
      });

      prompt.once('run', () => prompt.submit());

      return prompt.run()
        .then(answer => {
          assert.equal(answer, 'woohooo!');
        });
    });
  });

  describe('prompt.value', () => {
    it('should output the un-modified value', () => {
      prompt = new Prompt({ message: 'Enter your password', name: 'pw' });

      prompt.on('run', async() => {
        await nextTick(() => prompt.keypress('f'));
        await nextTick(() => prompt.keypress('o'));
        await nextTick(() => prompt.keypress('o'));
        await nextTick(() => prompt.submit());
      });

      return prompt.run()
        .then(answer => {
          assert.equal(answer, 'foo');
        });
    });
  });
});