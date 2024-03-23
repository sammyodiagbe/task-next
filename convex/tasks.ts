import { query } from "./_generated/server";
import { v } from "convex/values";


// getting a single task

export const getTask = query({
    args: { taskId: v.id('tasks')},
    handler: async (ctx, args) => {

        const task = await ctx.db.get(args.taskId);
        return task;
    }
});

// getting a collections of task
export const getTasks = query({
    handler: async (ctx) => {
        const tasks = await ctx.db.query("tasks").collect();
        return tasks;
    }
})