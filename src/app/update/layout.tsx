import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";

export const metaData: Metadata = {
  title: "Update task",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-red">
      {children}
      <Toaster />
    </div>
  );
}
