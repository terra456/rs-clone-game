module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "standard-with-typescript",
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "tsconfigRootDir": __dirname,
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": ["./tsconfig.json"]
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "root": true,
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "single"],
        "@typescript-eslint/semi": "off",
        "@typescript-eslint/strict-boolean-expressions": "warn"
    }
}
