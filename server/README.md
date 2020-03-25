## 配置

使用`npx tsconfig.json`配置
这样配置，会提供三个选项
>react
>react native
>node

会根据不同的选择，给出优化后的配置，比直接`tsc --init`更方便使用

## 运行

两种方式

- ts-node-dev
`ts-node-dev --respawn src/index.ts`
- nodemon + ts-node
`nodemon --exec ts-node --files src/index.ts`

## .env

- 你的敏感信息不要提交到github上。应该放到环境变量配置里，然后忽略提交
