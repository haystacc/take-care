import { getGreeting, getLiveTime, getKaomoji } from "@/Helper";
import { TypeAnimation } from 'react-type-animation';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

function Dashboard() {
  const greeting = getGreeting();
  const liveTime = getLiveTime();
  const { user } = useAuth();
  const [kaomoji, setKaomoji] = useState("");

  useEffect(() => {
    setKaomoji(getKaomoji());
  }, []);

  const name = user.user_metadata.name;

  return (
    <div className="flex w-full flex-col justify-center items-center h-full px-4">
      <div className="flex w-full flex-col items-center text-center">
        <TypeAnimation 
          sequence={[greeting + " " + name + "!", 1000]}
          speed={50}
          className="text-4xl md:text-5xl font-semibold mb-5"
        />

        <h1 className="text-lg md:text-xl font-semibold">
          The current time is: {liveTime}
        </h1>
        <h1 className="text-lg md:text-xl">
          {kaomoji}
        </h1>
      </div>

      <div className="flex w-full flex-col items-center mt-10 text-center">
          <h1 className="text-lg md:text-xl">
          Ready to journal today? 
        </h1>
        <Link to="/journal">
          <Button className="mt-3">Click here!</Button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;