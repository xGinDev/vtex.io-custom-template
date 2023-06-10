module.exports = {
    // Include default vtex config
    ...require('@vtex/prettier-config'),

    // Add semicolon at the end of simples statements
    semi: true,

    // Include parentheses around a sole arrow function parameter.
    arrowParens: 'always',

    // Specify the number of spaces per indentation-level.
    tabWidth: 4,
};
