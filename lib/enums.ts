import { BundleDuration } from "./db/schema";

// Helper functions for bundle durations
export function getDurationLabel(duration: BundleDuration): string {
  switch (duration) {
    case BundleDuration.ONE_WEEK:
      return "1 week";
    case BundleDuration.ONE_MONTH:
      return "1 month";
    case BundleDuration.THREE_MONTHS:
      return "3 months";
    case BundleDuration.SIX_MONTHS:
      return "6 months";
    case BundleDuration.ONE_YEAR:
      return "1 year";
    default:
      return duration;
  }
}

export function getDurationDays(duration: BundleDuration): number {
  switch (duration) {
    case BundleDuration.ONE_WEEK:
      return 7;
    case BundleDuration.ONE_MONTH:
      return 30;
    case BundleDuration.THREE_MONTHS:
      return 90;
    case BundleDuration.SIX_MONTHS:
      return 180;
    case BundleDuration.ONE_YEAR:
      return 365;
    default:
      return 30; // default fallback
  }
}
