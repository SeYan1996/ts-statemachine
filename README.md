# TypeScript有限状态机

![npm (tag)](https://img.shields.io/npm/v/@seyan/ts-statemachine/latest)
<!-- ![NPM License](https://img.shields.io/npm/l/%40seyan%2Fts-statemachine) -->

使用TypeScript装饰器实现的有限状态机，需要在tsconfig.json里启用experimentalDecorators编译器选项

## 安装

```script
npm install @seyan/ts-statemachine
```

 ## 使用示例
 
```typescript
import {
  AFSM,
  Event,
  Status,
  StateMachine,
  EventHandlerResponse,
  StatusType
} from '@seyan/ts-statemachine';

@StateMachine()
class FSM extends AFSM {
  @Status("s1")
  @Event('e1')
  f(): EventHandlerResponse {
    return { next: 's2' }
  }
}

@StateMachine()
class TestStm extends AFSM {
  // 在s1状态下触发e1事件
  @Status("s1")
  @Event("e1")
  s1_e1(): EventHandlerResponse {
    // 业务逻辑处理
    // ...
    // 转换为s2状态
    return { next: "s2" };
  }

  // 在s1状态下触发e2事件
  @Status("s1")
  @Event("e2")
  s1_e2(): EventHandlerResponse {
    // 业务逻辑处理
    // ...
    // 转换为s3状态
    return { next: "s3" };
  }

// 在s2状态下触发e1事件
  @Status("s2")
  @Event("e1")
  s2_e1(): EventHandlerResponse {
    // 业务逻辑处理
    // ...
    // 转换为s1状态
    return { next: "s1" };
  }

  // 在s2状态下触发e2事件
  @Status("s2")
  @Event("e2")
  s2_e2(): EventHandlerResponse {
    // 业务逻辑处理
    // ...
    // 转换为s3状态
    return { next: "s3" };
  }

  // 在s3状态下触发e1事件
  @Status("s3")
  @Event("e1")
  s3_e1(): EventHandlerResponse {
    // 业务逻辑处理
    // ...
    // 转换为s1状态
    return { next: "s1" };
  }

  @Status("s3")
  @Event("e2")
  s3_e2(): EventHandlerResponse {
    return { next: "s2" };
  }

  // 状态工厂可以支持状态列表 在s1 s2 s3状态下触发setState处理逻辑相同
  @Status(["s1", "s2", "s3"])
  @Event("setState")
  setState(state: StatusType): EventHandlerResponse {
    return { next: state };
  }

  // 可以省略状态装饰器 表示任意状态下都可以触发
  @Event("noChange")
  noChange() {
    // 返回值为空 表示不改变状态
    return;
  }

  // 常规函数成员
  getCurrentState() {
    // 获取当前状态
    return this.currentState;
  }
  
  // 常规函数成员
  nomalFunction2(s?: string) {
    return s;
  }
}
```