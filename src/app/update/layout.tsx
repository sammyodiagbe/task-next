import { Toaster } from "@/components/ui/toaster";

export const metaData = {
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
