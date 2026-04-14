import TextareaAutosize from 'react-textarea-autosize';
import { IconMoodAnnoyed, IconMoodSad, IconMoodEmpty, IconMoodSmile, IconMoodHappy } from '@tabler/icons-react';
import MoodIcon from '@/components/ui/MoodIcon';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { upsertJournalEntry } from '@/services/journalService';
import { notify } from '@/Helper';
import { toEntryDate, toDisplayDate } from "@/utils/date";

import { useJournalEntry } from '@/hooks/useJournalEntry';

function JournalPage() {
  const { user } = useAuth();

  const today = new Date();
  const entry_date = toEntryDate(today);
  const formattedDate = toDisplayDate(today);

  const entry = useJournalEntry(user.id, entry_date);

  const [mood, setMood] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setMood(entry.mood);
    setContent(entry.content);
  }, [entry.mood, entry.content])

  const moods = [
    { icon: IconMoodSad, label: "Bad", color: "text-red-600"  },
    { icon: IconMoodAnnoyed, label: "Eh", color: "text-orange-500" },
    { icon: IconMoodEmpty, label: "Okay", color: "text-yellow-500" },
    { icon: IconMoodSmile, label: "Good", color: "text-lime-500" },
    { icon: IconMoodHappy, label: "Great", color: "text-green-600" },
  ];

  async function handleSelectedMood(m) {
    setMood(m);

    const res = await upsertJournalEntry({ user_id: user.id, entry_date, mood: m });
    if (res.success) {
      notify.success('Mood saved successfully!')
    } else {
      notify.error(res.error.message);
    }
  }

  async function handleSubmit() {
    const res = await upsertJournalEntry({ user_id: user.id, entry_date, content });
    if (res.success) {
      notify.success('Journal saved succesfully!')
    } else {
      notify.error(res.error.message);
    }
  }
  
  return (
    <>
      <div className="flex h-full min-h-0 flex-col items-center justify-center gap-4 overflow-hidden p-4" >
        <div className="flex w-full max-w-4xl shrink-0 flex-col items-center border-2 border-solid p-4">
          <h1 className="text-xl font-bold pb-5">How are you feeling today?</h1>
          <div className="flex flex-wrap justify-center gap-4">
            {moods.map((m) => (
              <MoodIcon 
                key={m.label} 
                icon={m.icon} 
                label={m.label} 
                selected={mood === m.label}
                onSelect={() => handleSelectedMood(m.label)}
              />
            ))}
          </div>
        </div>
        
        <div className="w-full max-w-4xl flex-1 min-h-0 overflow-hidden rounded-xl border-2 border-solid p-4 flex flex-col items-center">
          <div className="flex justify-between items-center w-full mb-5">
            <h1 className="text-xl font-semibold">Journal: {formattedDate}</h1>
            <Button className="" onClick={handleSubmit}>
              Save Entry
            </Button>
          </div>

          <TextareaAutosize 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full flex-1 min-h-0 resize-none overflow-y-auto text-lg leading-relaxed rounded-lg border-2 border-solid focus:border-indigo-500 p-2" 
            minRows={6} 
            maxRows={8}
            placeholder="Dear journal..."
          />

          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
            <span>{content.length} chars</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default JournalPage; 