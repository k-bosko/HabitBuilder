module.exports = {
    'env': {
        'browser': true,
        'node': true,
        'es6': true,
    },
    'extends': ['eslint:recommended', 'prettier'],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
        'ecmaFeatures': {
            'jsx': true,
        }
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'no-console': 0,
        'no-unused-vars': 1,
        'no-var': 1,
    },
};