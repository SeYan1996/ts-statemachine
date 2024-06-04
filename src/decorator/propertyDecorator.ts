import { MetaData } from "@/const/metaData";
import { EventHandler, StatusType, EventType } from "@/types/fsm";

/**
 * 状态装饰器工厂
 *
 */
export function Status(status: StatusType | StatusType[]) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(MetaData.STATUS_META, status, descriptor.value);
  };
}

/**
 * 事件装饰器工厂
 *
 */
export function Event(event: EventType) {
  return function (
    target: any,
    key: string,
    descriptor: TypedPropertyDescriptor<EventHandler>,
  ) {
    Reflect.defineMetadata(MetaData.EVENT_META, event, descriptor.value);
  };
}

/**
 * 前置钩子装饰器工厂
 */
export function Before(event: any) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(MetaData.HOOK_BEFORE_META, event, descriptor.value);
  };
}

/**
 * 后置钩子装饰器工厂
 */
export function After(event: any) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(MetaData.HOOK_AFTER_META, event, descriptor.value);
  };
}
