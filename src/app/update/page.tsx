"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "convex/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const type = {};

const UpdateScreen = () => {
  const query = useSearchParams();
  const router = useRouter();
  const updateTask = useMutation(api.mutations.tasks.updateTask);
  const taskTitle = query.get("taskTitle");
  const taskDescription = query.get("taskDescription");
  const id = query.get("id") as Id<"tasks">;

  const [title, setTitle] = useState(taskTitle || "");
  const [description, setDescription] = useState(taskDescription || "");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateTask({ title, id, description });

    console.log("done doing whatever");
    toast({
      description: "Update Successful",
      action: (
        <Button
          onClick={() => {
            router.push("/");
          }}
        >
          Go home
        </Button>
      ),
    });
  };

  return (
    <main className="flex min-h-screen justify-center items-center bg-red">
      <div className="w-[500px] h-auto">
        <h1 className="mb-8 text-3xl font-bold">Update Task</h1>
        <form onSubmit={handleSubmit}>
          <Input
            value={title}
            placeholder="Task Title"
            className="mb-4"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            value={description}
            placeholder="Task Description"
            rows={6}
            className="mb-4"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button variant={"default"} size={"sm"}>
            Update task
          </Button>
        </form>
      </div>
    </main>
  );
};

export default UpdateScreen;
