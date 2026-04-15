import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
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
    <div className="flex h-full min-h-0 flex-col items-center justify-center gap-4 overflow-hidden p-4">
      <div className="shrink-0">
        <Calendar onClickDay={(d) => setSelectedDate(d)} value={selectedDate} className="journal-calendar mb-2"/>
      </div>
      <div className="w-full max-w-3xl flex-1 min-h-0 overflow-hidden rounded-xl border-2 border-solid p-4 flex flex-col items-center">
        <h1 className="text-xl font-semibold underline">Journal: {formattedDate}</h1>
        <h2 className="italic mt-1">Mood: {mood}</h2>
        <div className="mt-3 flex-1 overflow-y-auto text-sm prose prose-sm max-w-none w-full" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}

export default CalendarPage;