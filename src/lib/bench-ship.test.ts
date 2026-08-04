import { describe, expect, it } from "vitest";
import {
  approveBuild,
  clearBuildFailure,
  markBuildFailed,
  readBuildState,
} from "./bench-ship";

describe("Potting Bench ship markers", () => {
  it("treats an ordinary PR as ready", () => {
    expect(readBuildState("## Preview")).toEqual({ state: "ready" });
  });

  it("records approval once and reports queued", () => {
    const once = approveBuild("## Preview");
    const twice = approveBuild(once);

    expect(twice).toBe(once);
    expect(once.match(/potting-bench:approved-to-ship/g)).toHaveLength(1);
    expect(readBuildState(once)).toEqual({ state: "queued" });
  });

  it("records the exact failed stage while retaining approval", () => {
    const failed = markBuildFailed(approveBuild("## Preview"), "build");

    expect(readBuildState(failed)).toEqual({
      state: "failed",
      failureStage: "build",
    });
    expect(failed).toContain("potting-bench:approved-to-ship");
  });

  it("replaces an earlier failure and can clear it for retry", () => {
    const failed = markBuildFailed(
      markBuildFailed(approveBuild("## Preview"), "test"),
      "merge",
    );

    expect(failed.match(/potting-bench:failed:/g)).toHaveLength(1);
    expect(readBuildState(clearBuildFailure(failed))).toEqual({
      state: "queued",
    });
  });
});
