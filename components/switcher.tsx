"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

interface Props {
  className?: string;
}
function Switcher({ className }: Props) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  // const handleSwitch = () => {
  //     setIsDarkMode(!isDarkMode);
  // };

  return (
    <div className={className}>
      {theme === "dark" ? (
        <Sun
          className="cursor-pointer"
          size={20}
          onClick={() => setTheme("light")}
        />
      ) : (
        <Moon
          fill="black"
          className="cursor-pointer"
          size={20}
          onClick={() => setTheme("dark")}
        />
      )}
    </div>
  );
}

export default Switcher;
