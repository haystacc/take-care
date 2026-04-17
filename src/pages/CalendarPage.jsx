import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useAuth } from '@/context/AuthContext';
import { toEntryDate, toDisplayDate } from '@/utils/date';
import { useJournalEntry } from '@/hooks/useJournalEntry';
import { getMoodIcon } from '@/utils/moodConfig';

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
      <div className="w-full max-w-3xl flex-1 min-h-0 overflow-hidden border-2 border-solid p-4 flex flex-col items-center">
        <h1 className="text-lg font-semibold">Journal: {formattedDate}</h1>
        <div className="mt-3">
          {mood ? 
            (() => {
              const moodData = getMoodIcon(mood);
              if (moodData) {
                const { Icon, textColor, bgColor } = moodData;
                return (
                  <div className={`flex items-center gap-2 px-3 py-2 ${bgColor}`}>
                    <Icon size={20} className={textColor} />
                    <span className="text-sm font-medium text-gray-800">{mood}</span>
                  </div>
                );
              }
            })()
            : <span className="text-sm text-gray-400">No mood recorded</span>
          }
        </div>
        <div className="mt-4 flex-1 overflow-y-auto text-sm prose prose-sm max-w-none w-full" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}

export default CalendarPage;