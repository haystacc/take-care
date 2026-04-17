
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IconTrash, IconPlus } from '@tabler/icons-react';

function HabitsPage() {
  const [habits, setHabits] = useState([]);
  const [input, setInput] = useState('');

  const addHabit = () => {
    if (input.trim()) {
      const newHabit = {
        id: Date.now(),
        name: input,
        completed: false,
      };
      setHabits([newHabit, ...habits]);
      setInput('');
    }
  };

  const toggleHabit = (id) => {
    setHabits(habits.map(habit =>
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addHabit();
    }
  };

  const sortedHabits = [...habits].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  return (
    <div className="flex items-center justify-center h-full w-full px-4">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        <div className="bg-white rounded-xl border border-gray-300 shadow-md p-6">
          <h1 className="text-xl font-bold mb-4 text-gray-800">My Habits</h1>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a new habit..."
              className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-2 text-base focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
            <Button 
              onClick={addHabit}
              className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2"
            >
              <IconPlus size={20} />
              Add
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-300 shadow-md p-6">
          {sortedHabits.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No habits yet. Add one to get started!</p>
          ) : (
            <div className="space-y-2">
              {sortedHabits.map((habit) => (
                <div
                  key={habit.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                    habit.completed
                      ? 'bg-gray-50 border-gray-200 opacity-60'
                      : 'bg-white border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={habit.completed}
                    onChange={() => toggleHabit(habit.id)}
                    className="w-5 h-5 cursor-pointer accent-indigo-600"
                  />
                  <span
                    className={`flex-1 text-lg ${
                      habit.completed
                        ? 'text-gray-500 line-through'
                        : 'text-gray-800'
                    }`}
                  >
                    {habit.name}
                  </span>
                  <button
                    onClick={() => deleteHabit(habit.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                    title="Delete habit"
                  >
                    <IconTrash size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HabitsPage;