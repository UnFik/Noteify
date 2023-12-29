export const typeDefs = `#graphql
    type Note {
        id: ID!
        title: String
        body: String
        createdAt: String
        updatedAt: String
    }

    type Query {
        note(id: ID!): Note
        notes: [Note!]!
    }

    type Mutation {
        addNote(
            title: String
            body: String
        ): Note

        updateNote(
            id: ID!
            title: String
            body: String
        ): Note

        deleteNote(
            id: ID!
        ): Note
    }
`