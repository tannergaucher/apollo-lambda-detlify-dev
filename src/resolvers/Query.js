const Query = {
  user: async (parent, { id }, context) => {
    return await context.models.User.findById(id)
  },
  users: async (parent, args, context) => {
    return await context.models.User.find()
  },

  todos: async (parent, { userId }, { db }) => {
    const todos = await db.Todo.find({
      userId,
    })

    return todos
  },
}

module.exports = Query
