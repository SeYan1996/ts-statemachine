# TypeScript有限状态机

使用TypeScript装饰器实现的有限状态机

## 安装

```script
npm install @seyan/ts-statemachine
```

 ## 使用示例
 
```typescript
import { AFSM, Event, Status, StateMachine, EventHandlerResponse, StatusType } from 'ts-statemachine';

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
  @Status("s1")
  @Event("e1")
  s1_e1(): EventHandlerResponse {
    return { next: "s2" };
  }

  @Status("s1")
  @Event("e2")
  s1_e2(): EventHandlerResponse {
    return { next: "s3" };
  }

  @Status("s2")
  @Event("e1")
  s2_e1(): EventHandlerResponse {
    return { next: "s1" };
  }

  @Status("s2")
  @Event("e2")
  s2_e2(): EventHandlerResponse {
    return { next: "s3" };
  }

  @Status("s3")
  @Event("e1")
  s3_e1(): EventHandlerResponse {
    return { next: "s1" };
  }

  @Status("s3")
  @Event("e2")
  s3_e2(): EventHandlerResponse {
    return { next: "s2" };
  }

  @Status(["s1", "s2", "s3"])
  @Event("setState")
  setState(state: StatusType): EventHandlerResponse {
    return { next: state };
  }

  @Event("noChange")
  noChange() {
    return;
  }

  getCurrentState() {
    return this.currentState;
  }

  nomalFunction2(s?: string) {
    return s;
  }
}
```