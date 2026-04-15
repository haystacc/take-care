
function MoodIcon({ icon: Icon, label, selected, onSelect }) {
  return (
    <button 
      type="button" 
      onClick={onSelect}
      className={`flex flex-col items-center transition duration-200 ${
        selected ? " text-indigo-400" : "hover:scale-110"
      }`}
    >
      <Icon className="w-8 h-8" />
      <span className="text-s">{label}</span>
    </button>
  );
}

export default MoodIcon;