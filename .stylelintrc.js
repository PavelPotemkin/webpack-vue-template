module.exports = {
    root: true,
    extends: [
        'stylelint-config-recommended-scss',
    ],
    plugins: [
        'stylelint-scss',
    ],
    rules: {
        'scss/no-global-function-names': null,
        'no-empty-source': null
    },
};
