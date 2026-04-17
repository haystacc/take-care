import { IconMoodSad, IconMoodAnnoyed, IconMoodEmpty, IconMoodSmile, IconMoodHappy } from '@tabler/icons-react';

export const MOOD_ORDER = ["Bad", "Eh", "Okay", "Good", "Great"];

export const MOOD_COLORS = {
  "Bad": { 
    icon: IconMoodSad, 
    textColor: "text-red-600",
    bgColor: "bg-red-200"
  },
  "Eh": { 
    icon: IconMoodAnnoyed, 
    textColor: "text-orange-500",
    bgColor: "bg-orange-200"
  },
  "Okay": { 
    icon: IconMoodEmpty, 
    textColor: "text-yellow-500",
    bgColor: "bg-yellow-200"
  },
  "Good": { 
    icon: IconMoodSmile, 
    textColor: "text-lime-500",
    bgColor: "bg-lime-200"
  },
  "Great": { 
    icon: IconMoodHappy, 
    textColor: "text-green-600",
    bgColor: "bg-green-200"
  },
};

export function getMoodIcon(moodLabel) {
  const moodData = MOOD_COLORS[moodLabel];
  if (!moodData) return null;
  return {
    Icon: moodData.icon,
    textColor: moodData.textColor,
    bgColor: moodData.bgColor
  };
}
