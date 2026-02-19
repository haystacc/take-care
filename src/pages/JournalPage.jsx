import TextareaAutosize from 'react-textarea-autosize';
import { IconMoodAnnoyed, IconMoodSad, IconMoodEmpty, IconMoodSmile, IconMoodHappy } from '@tabler/icons-react';
import MoodIcon from '@/components/ui/MoodIcon';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { upsertJournalEntry, getJournalEntryForDate } from '@/services/journalService';
import { notify } from '@/Helper';
import { toEntryDate, toDisplayDate } from "@/utils/date";

import { useJournalEntry } from '@/hooks/useJournalEntry';

import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

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
    { icon: IconMoodSad, label: "Bad" },
    { icon: IconMoodAnnoyed, label: "Eh" },
    { icon: IconMoodEmpty, label: "Okay" },
    { icon: IconMoodSmile, label: "Good" },
    { icon: IconMoodHappy, label: "Great" },
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
      <div className="flex flex-col items-center" >
        <div className="flex flex-col items-center border-2 border-solid p-5 my-5">
          <h1 className="text-xl font-bold pb-5">How are you feeling today?</h1>
          <div className="flex gap-15">
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
        
        <div className="max-w-2xl w-full flex flex-col items-center border-2 border-solid p-5 rounded-xl">
          <div className="flex justify-between items-center w-full mb-5">
            <h1 className="text-xl font-semibold">Journal: {formattedDate}</h1>
            <Button className="" onClick={handleSubmit}>
              Save Entry
            </Button>
          </div>

          <TextareaAutosize 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full text-lg leading-relaxed rounded-lg border-2 border-solid focus:border-indigo-500 p-2" 
            minRows={8} 
            maxRows={10}
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