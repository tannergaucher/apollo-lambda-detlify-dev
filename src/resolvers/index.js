const resolvers = {
  Query: {
    user: async (parent, { id }, { models }) => {
      return await models.User.findById(id)
    },
  },
  Mutation: {
    signup: async (parent, { name }, { models }) => {
      const user = await models.User.create({
        name,
      })
      return {
        user,
      }
    },
  },
}

module.exports = {
  resolvers,
}
