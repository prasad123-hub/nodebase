import { SidebarTrigger } from "@/components/ui/sidebar";

export const AppHeader = () => {
  return (
    <header className="flex h-14 shrink-0 items-center border-b gap-2 px-4 bg-background">
      <SidebarTrigger />
    </header>
  );
};
