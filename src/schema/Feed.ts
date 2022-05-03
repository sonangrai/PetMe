import { buildSchema } from "graphql";

const schema = buildSchema(`

    type Query {
        feeds(limit: Int): [Feed]
    }

    type Feed {
        id: ID!
        media: String!
        description: String!
        type: String!
    }
`);

export default schema;
