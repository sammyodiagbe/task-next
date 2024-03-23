import { mutation } from "../_generated/server";
import { v } from "convex/values";


export const createTask = mutation({
    args: { taskTitle: v.string(), taskDescription: v.string()},
    handler: async (ctx, args) => {
        const { taskTitle, taskDescription} = args;
        const task = await ctx.db.insert("tasks", { taskTitle, taskDescription });
        return true;
    }
})


export const deleteTask = mutation({
    args: { id: v.id("tasks")},
    handler: async ( ctx, args) => {
        await ctx.db.delete(args.id);
    }
})


export const updateTask = mutation({
    args: {title: v.string(), description: v.string(), id: v.id('tasks')},
    handler: async (ctx, args) => {
        const { id, title, description } = args;
        await ctx.db.patch(id, { taskTitle: title, taskDescription: description });
        
    }
})