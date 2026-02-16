const APP_TZ = "Australia/Sydney"; // change later to autodetect user's timezone

export function toEntryDate(d) {
  return d.toLocaleDateString("en-CA", { timeZone: APP_TZ });
}

export function toDisplayDate(d) {
  return d.toLocaleDateString("en-GB", { timeZone: APP_TZ });
}
