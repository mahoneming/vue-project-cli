module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ["plugin:vue/essential", "@vue/airbnb"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-tabs": "off",
    semi: [2, "always"],
    indent: ["error", "tab", { SwitchCase: 1 }], //缩进风格
    // 禁止 function 定义中出现重名参数
    "no-dupe-args": 2,
    // 禁止对象字面量中出现重复的 key
    "no-dupe-keys": 2,
    // 禁止重复的 case 标签
    "no-duplicate-case": 2,
    "no-empty": 2,
    // 禁止对 function 声明重新赋值
    "no-func-assign": 2,
    "prefer-template": 2,
    // 要求使用 let 或 const 而不是 var
    "no-var": 2,
    // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
    "no-this-before-super": 2,
    // 禁止类成员中出现重复的名称
    "no-dupe-class-members": 2,
    // 禁止修改 const 声明的变量
    "no-const-assign": 2,
    "arrow-spacing": [2, { before: true, after: true }],
    // 强制在圆括号内使用一致的空格
    "space-in-parens": [2, "always"],
    // 强制在块之前使用一致的空格
    "space-before-blocks": [2, "always"],
    // 强制使用一致的反勾号、双引号或单引号
    quotes: [2, "single", "avoid-escape"],
    // 强制花括号内换行符的一致性
    "object-curly-newline": 2,
    // 强制在花括号中使用一致的空格
    "object-curly-spacing": [2, "always"],
    // 强制 function 块最多允许的的语句数量
    "max-statements": [1, 70],
    // 强制一行的最大长度
    "max-len": [1, 200],
    // 强制在对象字面量的属性中键和值之间使用一致的间距
    "key-spacing": [2, { beforeColon: false, afterColon: true }],
    // if while function 后面的{必须与if在同一行，java风格。
    "brace-style": [2, "1tbs", { allowSingleLine: true }],
    "array-bracket-spacing": [2, "always"],
    'linebreak-style': ["off", "windows"]
  },
  parserOptions: {
    parser: "babel-eslint",
  },
};
