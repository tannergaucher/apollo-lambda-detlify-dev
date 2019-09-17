const Query = {
  user: async (parent, { id }, context) => {
    return await context.models.User.findById(id)
  },
  users: async (parent, args, context) => {
    return await context.models.User.find()
  },
  todos: async (parent, { userId }, context) => {
    const todos = await context.models.Todo.find({
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
