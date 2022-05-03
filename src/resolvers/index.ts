import { feedMutations, feedQueries } from "./feed";
import gql from "graphql-tag";
import { makeExecutableSchema } from "@graphql-tools/schema";
import Feed from "../schema/Feed";

const schema = {
  typeDefs: gql`
    ${Feed}
  `,
  resolvers: {
    Query: {
      ...feedQueries,
    },
    Mutation: {
      ...feedMutations,
    },
  },
};

export default makeExecutableSchema(schema);
