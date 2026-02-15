import TextareaAutosize from 'react-textarea-autosize';
import { IconMoodAnnoyed, IconMoodSad, IconMoodEmpty, IconMoodSmile, IconMoodHappy } from '@tabler/icons-react';
import MoodIcon from '@/components/ui/MoodIcon';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { upsertJournalEntry } from '@/services/journalService';
import { notify } from '@/Helper';
import { getJournalEntryForDate } from '@/services/journalService';

function JournalPage() {
  const { user } = useAuth();
  const [mood, setMood] = useState(null);
  const [content, setContent] = useState("");

  const moods = [
    { icon: IconMoodSad, label: "Bad" },
    { icon: IconMoodAnnoyed, label: "Eh" },
    { icon: IconMoodEmpty, label: "Okay" },
    { icon: IconMoodSmile, label: "Good" },
    { icon: IconMoodHappy, label: "Great" },
  ];

  const entry_date = new Date().toLocaleDateString("en-CA", {
    timeZone: "Australia/Sydney", // fix later -> shouldn't be exclusive to sydney
  });
  const formattedDate = new Date().toLocaleDateString("en-GB");

  useEffect(() => {
    if (!user) return; 

    async function loadEntry() {
      const res = await getJournalEntryForDate(user.id, entry_date);

      if (res.success) { // test if this works when not pre-filled
        setMood(res.data.mood ?? null);
        setContent(res.data.content);
      }
    }

    loadEntry();
  }, [user, entry_date])

  async function handleSelectedMood(m) {
    setMood(m);

    console.log(user.id);
    console.log(entry_date);

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
            {/* the title here should contain the date */}
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