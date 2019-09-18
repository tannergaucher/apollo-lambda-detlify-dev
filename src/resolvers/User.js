const User = {
  todos: async ({ id }, args, { db }) => {
    const todos = await db.Todo.find({
      userId: id,
    })

    return todos
  },
}

module.exports = User
