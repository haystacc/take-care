import { useEffect, useState } from "react";
import { getJournalEntryForDate } from "@/services/journalService";
import { notify } from "@/Helper";

const EMPTY = { mood: "", content: ""};

export function useJournalEntry(userId, entryDate) {
  const [state, setState] = useState(EMPTY);

  useEffect(() => {
    if (!userId || !entryDate) return;

    setState(EMPTY);

    (async () => {
      const res = await getJournalEntryForDate(userId, entryDate);

      if (!res.data) return;

      if (res.success) {
        setState({
          mood: res.data.mood,
          content: res.data.content,
        })
      } else {
        notify.error(res.error.message);
      }
    })();
  }, [userId, entryDate]);

  return state;
}
