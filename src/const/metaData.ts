/**
 * 元数据定义
 */
export enum MetaData {
  /** 事件 */
  EVENT_META = "EVENT_META",
  /** 状态 */
  STATUS_META = "STATUS_META",
  /** 状态处理函数 */
  EVENT_HANDLER_META = "EVENT_HANDLER_META",
  /** 前置钩子 */
  HOOK_BEFORE_META = "HOOK_BEFORE_META",
  /** 后置钩子 */
  HOOK_AFTER_META = "HOOK_AFTER_META",
  /** 超时 */
  TIMEOUT = "TIMEOUT_META",
}
