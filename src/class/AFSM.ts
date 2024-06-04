import { MetaData } from "@/const/metaData";
import { UnregisteredEventError } from "@/class/exceptions/eventError.class";
import {
  EventHandler,
  EventHandlerResponse,
  StatusType,
  EventType,
} from "@/types/fsm";

/**
 * 状态机虚拟类
 */
export abstract class AFSM {
  private _status_: StatusType | undefined;

  /**
   * 初始化
   * @param status 状态
   */
  init(status: StatusType) {
    this._status_ = status;
  }

  get currentState() {
    return this._status_;
  }

  /**
   * 触发事件 进入下一状态
   * @param {EventType} event 事件
   * @param {...*} rest 事件参数
   * @returns Promise
   */
  async handleEvent(event: EventType, ...rest: any[]) {
    const StatuEventHandlerMap: Record<string, EventHandler> =
      Reflect.getMetadata(MetaData.EVENT_HANDLER_META, this.constructor);

    const status_event_key = `${this._status_}:${event}`;
    const event_key = `*:${event}`;
    let res: EventHandlerResponse;
    if (StatuEventHandlerMap[status_event_key]) {
      // 优先匹配确定状态的事件
      res = await StatuEventHandlerMap[status_event_key].apply(this, rest);
    } else if (StatuEventHandlerMap[event_key]) {
      // 匹配通配事件
      res = await StatuEventHandlerMap[event_key].apply(this, rest);
    } else {
      // 当前状态没有对应事件处理
      return Promise.reject(
        new UnregisteredEventError("触发未注册事件", this._status_, event),
      );
    }

    if (res) {
      // 进入下一状态
      this._status_ = res.next;
    }

    return Promise.resolve();
  }
}
