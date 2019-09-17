const Query = {
  user: async (parent, { id }, { models }) => {
    return await models.User.findById(id)
  },
  users: async (parent, args, { models }) => {
    return await models.User.find()
  },
  todos: async (parent, { userId }, { models }) => {
    const todos = await models.Todo.find({
      userId,
    })

    return todos
  },

  me: async (parent, args, context) => {
    // getUserID

    // get user
    // get todos
    //
    return
  },
}

module.exports = Query
