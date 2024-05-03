import React from "react";
import { SunIcon, MoonIcon } from "@/components/constants/Icons";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Appearance = () => {
  const { setTheme } = useTheme();
  return (
    <Card className="w-full dark:bg-[#09090b]">
      <CardHeader className="p-4 pb-2">
        <h2 className="font-semibold text-primary dark:text-white">
          Appearance
        </h2>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="relative flex justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-300">Transform the look and feel of this site. Ready to give it a fresh new appearance?</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="mt-[-10px] shrink-0 rounded-full outline-none active:border-0 focus:ring-0 dark:bg-[#09090b]"
                variant="outline"
                size="icon"
              >
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="dark:bg-[#09090b]">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default Appearance;
