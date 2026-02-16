import { useAuth } from "@/context/AuthContext";
import { getJournalEntryForDate } from "@/services/journalService";
import { useEffect } from "react";

function MoodTrackerPage() {
  const { user } = useAuth();

  // idea here is you want to get the mood for every 

  // useEffect(() => {
  //   async function loadEntry() {
  //     await getJournalEntryForDate(user.id, entryDate);

  //     // 
  //   }

  //   loadEntry();
  // }, [])
  
  return (
    <div className="flex items-center flex-col">
      bleh
    </div>
  );
}

export default MoodTrackerPage