"use client";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Suspense, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardHeader,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const tasks = useQuery(api.tasks.getTasks);
  const createTask = useMutation(api.mutations.tasks.createTask);
  const deleteTask = useMutation(api.mutations.tasks.deleteTask);
  const { toast } = useToast();

  const handleSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (taskDescription.length < 2 || !taskTitle) {
      toast({
        title: "Invalid input",
        description: "Some of the entry are either empty or invalid",
        variant: "destructive",
        className: "bg-red-500 text-white",
      });
      return;
    }
    createTask({ taskDescription, taskTitle });
    setTaskDescription("");
    setTaskTitle("");
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-[1000px] h-auto grid grid-cols-2 gap-10">
        <section>
          <form onSubmit={handleSubmission}>
            <h2 className="mb-8 text-black-900 font-bold">Create a new task</h2>
            <Input
              placeholder="Enter task title"
              className="mb-8 hover:outline-s-violet-500"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <Textarea
              placeholder="Enter task description"
              className="mb-8 hover:outline-blue-50"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
            <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold">
              Create Task
            </Button>
          </form>
        </section>
        <section>
          <h2 className="mb-8 font-bold">Your tasks</h2>
          <div className="grid grid-cols-2 gap-2 ">
            {tasks?.length ? (
              tasks?.map((task) => {
                return (
                  <Card
                    className="flex flex-col justify-between"
                    key={task._id}
                  >
                    <CardHeader className="px-5">{task.taskTitle}</CardHeader>
                    <CardDescription className="p-5">
                      {task.taskDescription}
                    </CardDescription>
                    <CardFooter className="flex  justify-end">
                      <Button variant="outline" className="mr-2" asChild>
                        <Link
                          key={task._id}
                          href={`/update?taskTitle=${task.taskTitle}&taskDescription=${task.taskDescription}&id=${task._id}`}
                        >
                          Update
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        className="bg-transparent hover:bg-red-500 text-red-500 "
                        onClick={() => {
                          deleteTask({ id: task._id });
                        }}
                      >
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })
            ) : (
              <h2>No task yet</h2>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
