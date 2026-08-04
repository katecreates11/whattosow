export type BuildState = "ready" | "queued" | "failed";
export type FailureStage =
  | "refresh"
  | "typecheck"
  | "test"
  | "build"
  | "merge";

const APPROVED = "<!-- potting-bench:approved-to-ship -->";
const FAILURE =
  /(?:\r?\n)?<!-- potting-bench:failed:(refresh|typecheck|test|build|merge) -->/g;

export function readBuildState(
  body: string | null,
): { state: BuildState; failureStage?: FailureStage } {
  const text = body ?? "";
  const failure = [...text.matchAll(FAILURE)][0]?.[1] as
    | FailureStage
    | undefined;

  if (failure) return { state: "failed", failureStage: failure };
  if (text.includes(APPROVED)) return { state: "queued" };
  return { state: "ready" };
}

export function clearBuildFailure(body: string | null): string {
  return (body ?? "").replace(FAILURE, "").trimEnd();
}

export function approveBuild(body: string | null): string {
  const text = clearBuildFailure(body);
  if (text.includes(APPROVED)) return text;
  return `${text}${text ? "\n\n" : ""}${APPROVED}`;
}

export function markBuildFailed(
  body: string | null,
  stage: FailureStage,
): string {
  const text = approveBuild(body);
  return `${text}\n<!-- potting-bench:failed:${stage} -->`;
}
