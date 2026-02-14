import TextareaAutosize from 'react-textarea-autosize';
import { IconMoodAnnoyed, IconMoodSad, IconMoodEmpty, IconMoodSmile, IconMoodHappy } from '@tabler/icons-react';
import MoodIcon from '@/components/ui/MoodIcon';
import { TypeAnimation } from 'react-type-animation';
import { useState } from 'react';
import supabase from '@/utils/supabase';
import { Button } from '@/components/ui/button';


function JournalPage() {
  const [content, setContent] = useState(""); 
  const [mood, setMood] = useState(null);

  const moods = [
    { icon: IconMoodSad, label: "Bad" },
    { icon: IconMoodAnnoyed, label: "Eh" },
    { icon: IconMoodEmpty, label: "Okay" },
    { icon: IconMoodSmile, label: "Good" },
    { icon: IconMoodHappy, label: "Great" },
  ];

  const formattedDate = new Date().toLocaleDateString("en-GB");

  function handleSelectedMood(value) {
    setMood(value);
    // connect this to supabase -> save into a table here
  }

  function handleSubmit() {
    // save into supabase
  }
  
  return (
    <>
      <div className="flex flex-col items-center" >
        <div className="flex flex-col items-center border-2 border-solid p-5 my-5">
          <TypeAnimation
            sequence={[
              'How are you feeling today?',
              1000
            ]}
            className="text-xl font-bold pb-5"
           />
          <div className="flex gap-15">
            {moods.map((mood) => (
              <MoodIcon 
                key={mood.label} 
                icon={mood.icon} 
                label={mood.label} 
                selected={mood === mood.label}
                onSelect={() => handleSelectedMood(mood.label)}
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