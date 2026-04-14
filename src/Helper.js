import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const APP_TZ = "Australia/Sydney"; // later: use user tz if you want

const kaomojis = [
  "(-◡-)",
  "(＾▽＾)",
  "(￣▽￣)",
  "(°▽°)",
  "(⁀ᗢ⁀)",
  "(．．)",
  "U・ᴥ・U"
]

export const notify = {
  success: (msg) => toast.success(msg),
  error: (msg) => toast.error(msg),
  info: (msg) => toast.info(msg),
  warn: (msg) => toast.warn(msg)
}

export function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function getLiveTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return currentTime.toLocaleTimeString('en-US');
}

export function getKaomoji() {
  return kaomojis[Math.floor(Math.random() * kaomojis.length)];
}