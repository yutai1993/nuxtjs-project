/*
 vuex 非严格模式
 在开发环境中 默认启用 严格模式  生产环境中 非严格模式 (属于顶级全局配置 模块中不支持)
   - 在严格模式中 只能通过action，mutation去修改 vuex中的数据
 */
export const strict = false
