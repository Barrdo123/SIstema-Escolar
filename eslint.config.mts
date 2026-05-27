import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{js,ts}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                Atomics: 'readonly',
                SharedArrayBuffer: 'readonly',
            },
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        rules: {
            'o-unused-expressions': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
];