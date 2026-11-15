# Agent Persona Manager

A DSH plugin that sanitizes system prompts to prevent agents from exposing the underlying framework identity.

## Features
- Recursively sanitizes system prompt sections, contexts, and variables.
- Protects framework identity via customizable keyword mapping.
- Designed for agent privacy and neutrality.

## Installation
Use the DSH Plugin Manager to install:
`rtk plugin_manager install_bundle <path-to-this-directory>`

## Development
- `node test/index.test.js` to run sanitization tests.
