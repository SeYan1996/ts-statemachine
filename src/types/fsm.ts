/**
 * 状态
 */
export type StatusType = string | number;

/**
 * 事件
 */
export type EventType = string | number;

/**
 * 状态转换可选项参数
 */
export type StatusChangeOptions = {
  timeout?: number;
};

/**
 * 事件处理函数返回类型
 */
export type EventHandlerResponse = void | {
  /**下一状态 */
  next: StatusType;
  /** 可选项参数 */
  options?: StatusChangeOptions;
};

/**
 * 事件处理函数 不设置返回值则不改变状态
 */
export type EventHandler = (...args: any[]) => Promise<EventHandlerResponse>;
