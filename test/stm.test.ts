import { StateMachine, Status, Event, AFSM } from "@/index";
import { EventHandlerResponse } from "@/types/fsm";
import type { StatusType } from "@/types/fsm";

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

describe("状态扭转", () => {
  const fsm = new TestStm();
  fsm.init("s1");

  test("(s1, e1) => s2", async () => {
    await fsm.handleEvent("e1");
    expect(fsm.currentState).toBe("s2");
  });
  test("(s2, e2) => s3", async () => {
    await fsm.handleEvent("e2");
    expect(fsm.currentState).toBe("s3");
  });
  test("nochange event", async () => {
    await fsm.handleEvent("noChange");
    expect(fsm.currentState).toBe("s3");
  });
  test("setState", async () => {
    await fsm.handleEvent("setState", "s1");
    expect(fsm.currentState).toBe("s1");
    await fsm.handleEvent("setState", "s2");
    expect(fsm.currentState).toBe("s2");
    await fsm.handleEvent("setState", "s3");
    expect(fsm.currentState).toBe("s3");
  });
});

describe("触发未注册事件", () => {
  const fsm = new TestStm();
  fsm.init("s1");

  test("event unregistered", async () => {
    await expect(fsm.handleEvent("unregisteredEvent")).rejects.toThrow();
  });
});
