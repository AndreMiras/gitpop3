import { describe, it, test, expect, vi } from "vitest";
import moment from "moment";
import timeSince from "./time";

test("basic case", () => {
  expect(timeSince(new Date(Date.now())));
});

test("basic case 2", () => {
  expect(timeSince(new Date(Date.now()))).toBe("0 seconds ago");
});

test("seconds ago", () => {
  expect(timeSince(moment(Date.now()).subtract(30, "seconds").toDate())).toBe(
    "30 seconds ago"
  );
});

test("minutes ago", () => {
  expect(timeSince(moment(Date.now()).subtract(15, "minutes").toDate())).toBe(
    "15 minutes ago"
  );
});

test("hours ago", () => {
  expect(timeSince(moment(Date.now()).subtract(6, "hours").toDate())).toBe(
    "6 hours ago"
  );
});

test("days ago", () => {
  expect(timeSince(moment(Date.now()).subtract(3, "days").toDate())).toBe(
    "3 days ago"
  );
});

test("months ago", () => {
  expect(timeSince(moment(Date.now()).subtract(6, "months").toDate())).toBe(
    "6 months ago"
  );
});

test("years ago", () => {
  expect(timeSince(moment(Date.now()).subtract(1.1, "years").toDate())).toBe(
    "1 years ago"
  );
});
