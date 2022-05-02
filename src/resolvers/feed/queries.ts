import Feed from "../../model/Feed.modal";

const feedQueries = {
  feeds: async ({ limit }, context) => {
    return Feed.find();
  },
};

export default feedQueries;
