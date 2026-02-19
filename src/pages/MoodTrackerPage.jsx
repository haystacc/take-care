import { useAuth } from "@/context/AuthContext";
import { notify } from "@/Helper";
import { getJournalEntryForDate, getMoodForMonth } from "@/services/journalService";
import { toEntryDate } from "@/utils/date";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";

function MoodTrackerPage() {
  const { user } = useAuth();
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [moodByDate, setMoodByDate] = useState({}); 

  useEffect(() => {
    async function loadMoods() {
      const startDate = toEntryDate(new Date(activeStartDate.getFullYear(), activeStartDate.getMonth(), 1));
      const endDate = toEntryDate(new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() + 1, 1))

      const res = await getMoodForMonth(user.id, startDate, endDate)

      if (!res.data) return;

      if (res.success) {
        const map = {};

        (res.data).forEach((row) => {
          if (row.entry_date && row.mood) {
            map[row.entry_date] = row.mood; 
          }
        })
        
        setMoodByDate(map);
      } else {
        notify.error(res.error.message);
      }
    }

    loadMoods();
  }, [])

  function displayMood({date, view}) {
    const key = toEntryDate(date);
    const mood = moodByDate[key];

    if (view === "month") {
      return <div>{mood}</div>
    }
    return null;
  }

  return (
    <div className="flex items-center justify-center h-full">
      <Calendar 
      tileContent={displayMood}
      onActiveStartDateChange={({activeStartDate}) => setActiveStartDate(activeStartDate)}/>
    </div>
  );
}

export default MoodTrackerPage