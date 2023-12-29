import { Context } from "@apollo/client";

export const resolvers = {
    Query: {
        note: async (_parent: any, args: any, context: Context) => {
            return await context.prisma.note.findUnique({
                where: {
                    id: parseInt(args.id),
                },
            });
        },
        notes: async (_parent: any, _args: any, context: Context) => {
            return await context.prisma.note.findMany();
        }
    },
    Mutation: {
        addNote: async (_parent: any, args: any, context: Context) => {
            return await context.prisma.note.create({
                data: {
                    title: args.title,
                    body: args.body,
                },
            });
        },
        updateNote: async (_parent: any, args: any, context: Context) => {
            return await context.prisma.note.update({
                where: {
                    id: parseInt(args.id),
                },
                data: {
                    title: args.title,
                    body: args.body,
                },
            });
        },
        deleteNote: async (_parent: any, args: any, context: Context) => {
            return await context.prisma.note.delete({
                where: {
                    id: parseInt(args.id),
                },
            });
        },
    }
}