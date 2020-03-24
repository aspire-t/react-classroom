## tsconfig.json

### 配置详情

| 项目                         | 含义                                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| outDir                       | 指定输出目录                                                                                            |
| sourceMap                    | 把ts 文件编译成 js 文件的时候，同时生成对应的sourceMap文件                                              |
| noImplicitAny                | 如果为true的话，TypeScript 编译器无法推断出类型时，它仍然会生成 JavaScript 文件，但是它也会报告一个错误 |
| module                       | 代码规范	target：转换成es5                                                                              |
| jsx                          | react模式会生成React.createElement，在使用前不需要再进行转换操作了，输出文件的扩展名为.js               |
| include                      | 需要编译的目录                                                                                          |
| allowSyntheticDefaultImports | 允许从没有设置默认导出的模块中默认导入。这并不影响代码的输出，仅为了类型检查。                          |
| esModuleInterop              | 设置 esModuleInterop: true 使 typescript 来兼容所有模块方案的导入                                       |

