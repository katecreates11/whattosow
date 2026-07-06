const MONTH_PHRASES: Record<number, string> = {
  0: "the year is starting quietly under glass",
  1: "the light is coming back fast enough to matter",
  2: "spring is beginning to earn its name",
  3: "the seed box is properly awake",
  4: "the tender crops are nearly at the door",
  5: "the warm-soil crops can get moving",
  6: "midsummer's list is still long",
  7: "the autumn sowings are beginning to matter",
  8: "the hardy things are taking over",
  9: "it is planting weather more than sowing weather",
  10: "the quiet crops are doing the useful work",
  11: "the list is short and the planning is half the pleasure",
};

export function sowGreetingMonthPhrase(monthIndex: number): string {
  return MONTH_PHRASES[monthIndex] ?? MONTH_PHRASES[6];
}
