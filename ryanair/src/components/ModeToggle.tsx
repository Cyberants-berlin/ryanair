import { Moon, Sun } from "lucide-react";

import { Button } from "./ui/button";
import { useTheme } from "./Theme";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <Button variant="outline" size="icon">
      <Sun
        onClick={() => setTheme("dark")}
        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        onClick={() => setTheme("light")}
        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
