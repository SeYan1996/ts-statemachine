import "reflect-metadata";
import { MetaData } from "@/const/metaData";
import { StatusType, EventType, EventHandler } from "@/types/fsm";

/**
 * 状态机装饰器工厂
 */
export function StateMachine() {
  return function (target: new (...args: any[]) => any) {
    const propList = Object.getOwnPropertyNames(target.prototype);
    const StatuEventHandlerMap: Record<string, EventHandler> = {};

    for (const key of propList) {
      const descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);
      if (descriptor && typeof descriptor.value === "function") {
        const originalMethod = descriptor.value;
        const event: EventType = Reflect.getMetadata(
          MetaData.EVENT_META,
          originalMethod,
        );
        const status: StatusType | StatusType[] = Reflect.getMetadata(
          MetaData.STATUS_META,
          originalMethod,
        );

        if (event !== undefined) {
          const statusKeys = Array.isArray(status) ? status : [status ?? "*"];
          statusKeys.forEach((s) => {
            if (s !== undefined && s !== null) {
              StatuEventHandlerMap[`${s}:${event}`] = originalMethod;
            }
          });
        }
      }
    }
    Reflect.defineMetadata(
      MetaData.EVENT_HANDLER_META,
      StatuEventHandlerMap,
      target,
    );
  };
}
