const Mutation = {
  signup: async (parent, { name }, { models }) => {
    const user = await models.User.create({
      name,
    })

    return user
  },
  createTodo: async (parent, { text, userId }, { models }) => {
    const todo = await models.Todo.create({
      text,
      userId,
    })

    return todo
  },
  updateTodo: async (parent, args, context) => {
    return
  },
  deleteTodo: async (parent, args, context) => {
    return
  },
}

module.exports = Mutation
