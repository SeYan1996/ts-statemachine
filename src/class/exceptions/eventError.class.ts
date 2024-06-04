import { StatusType, EventType } from "@/types/fsm";

export class UnregisteredEventError extends Error {
  /** 当前状态 */
  state: StatusType;
  /** 事件名称 */
  event: EventType;

  constructor(msg: string, state: StatusType, event: EventType) {
    super(msg);
    this.state = state;
    this.event = event;
  }
}
