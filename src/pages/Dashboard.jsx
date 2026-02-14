import { getGreeting } from "@/Helper";

function Dashboard() {
  const greeting = getGreeting();

  return (
    <div className="flex justify-center items-center h-screen">
      {greeting} {/* find a way to get the user's name as well */}
    </div>
  );
}

export default Dashboard;