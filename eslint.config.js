export default [
    {
        languageOptions: {
            ecmaVersion: 2015,
            sourceType: "script",
            globals: {
                window: "readonly",
                document: "readonly",
                console: "readonly",
                fetch: "readonly",
                $: "readonly" // for jQuery
            }
        },
        rules: {
            "quotes": ["error", "single"]
        }
    }
];