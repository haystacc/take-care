import { useAuth } from "@/context/AuthContext";
import { notify } from "@/Helper";
import { getJournalEntryForDate, getMoodForMonth } from "@/services/journalService";
import { toEntryDate } from "@/utils/date";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { MOOD_ORDER, MOOD_COLORS, getMoodIcon } from "@/utils/moodConfig";

function MoodTrackerPage() {
  const { user } = useAuth();
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [moodByDate, setMoodByDate] = useState({}); 
  const [yearlyStats, setYearlyStats] = useState({}); 

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
  }, [activeStartDate, user.id])

  useEffect(() => {
    async function loadYearlyStats() {
      const startDate = toEntryDate(new Date(new Date().getFullYear(), 0, 1));
      const endDate = toEntryDate(new Date(new Date().getFullYear() + 1, 0, 1));

      const res = await getMoodForMonth(user.id, startDate, endDate);

      if (!res.data) return;

      if (res.success) {
        const stats = {};
        MOOD_ORDER.forEach((mood) => {
          stats[mood] = 0;
        });

        (res.data).forEach((row) => {
          if (row.mood && stats.hasOwnProperty(row.mood)) {
            stats[row.mood]++;
          }
        });

        setYearlyStats(stats);
      }
    }

    loadYearlyStats();
  }, [user.id])

  function displayMood({date, view}) {
    const key = toEntryDate(date);
    const mood = moodByDate[key];

    if (view === "month" && mood) {
      const moodData = getMoodIcon(mood);
      if (moodData) {
        const MoodIcon = moodData.Icon;
        return (
          <div className="flex justify-center items-center w-full">
            <MoodIcon size={20} className={moodData.textColor} />
          </div>
        );
      }
    }
    return null;
  }

  return (
    <div className="flex w-full h-full min-h-0 flex-col lg:flex-row gap-6 items-center justify-start lg:justify-center overflow-auto p-4">
      <div className="flex-shrink-0">
        <Calendar 
          tileContent={displayMood}
          onActiveStartDateChange={({activeStartDate}) => setActiveStartDate(activeStartDate)}
        />
      </div>

      <div className="flex-shrink-0 bg-white border border-gray-300 shadow-md p-6 w-64">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Mood Stats - {new Date().getFullYear()}</h2>
        
        {(() => {
          const total = Object.values(yearlyStats).reduce((sum, count) => sum + count, 0);
          return total > 0 ? (
            <div className="space-y-3">
              {MOOD_ORDER.map((mood) => {
                const moodData = getMoodIcon(mood);
                const count = yearlyStats[mood] || 0;
                const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
                const MoodIcon = moodData.Icon;
                const barColor = moodData.bgColor;

                return (
                  <div key={mood}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <MoodIcon size={18} className={moodData.textColor} />
                        <span className="text-sm text-gray-700 font-medium">{mood}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-semibold text-gray-600">{count} days</div>
                        <div className="text-xs text-gray-500">{percentage}%</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className={`h-full ${barColor} transition-all`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between text-sm font-semibold text-gray-800">
                  <span>Total</span>
                  <span>{total} days</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No mood data for {new Date().getFullYear()}</p>
          );
        })()}
      </div>
    </div>
  );
}

export default MoodTrackerPage