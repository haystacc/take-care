import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getJournalEntryForDate } from '@/services/journalService';
import { useAuth } from '@/context/AuthContext';
import { toEntryDate, toDisplayDate } from '@/utils/date';
import { useJournalEntry } from '@/hooks/useJournalEntry';

function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { user } = useAuth();

  const entryDate = toEntryDate(selectedDate);
  const formattedDate = toDisplayDate(selectedDate);

  const {mood, content} = useJournalEntry(user.id, entryDate);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Calendar onClickDay={(d) => setSelectedDate(d)} value={selectedDate} className="mb-5"/>
      <div className="max-w-3xl w-full flex flex-col items-center border-2 border-solid p-5 rounded-xl">
        <h1 className="text-xl font-semibold underline">Journal: {formattedDate}</h1>
        <h2 className="italic mt-1">Mood: {mood}</h2>
        <p className="h-44 overflow-y-auto mt-3 text-sm leading-relaxed whitespace-pre-wrap" >{content}</p>
      </div>
    </div>
  );
}

export default CalendarPage;