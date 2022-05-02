import { feedMutations, feedQueries } from "./feed";

const resolvers = {
  Query: {
    ...feedQueries,
  },
  Mutation: {
    ...feedMutations,
  },
};

export default resolvers;
