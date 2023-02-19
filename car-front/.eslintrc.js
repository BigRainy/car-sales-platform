module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        "space-before-function-paren": 'off',
        'eol-last': 'off',
        'indent': 'off',
        'quote-props': 'off',
        'space-before-blocks': 'off',
        'no-trailing-spaces': 'off',
        'no-useless-return': 'off',
        'camelcase': 'off'
    }
}