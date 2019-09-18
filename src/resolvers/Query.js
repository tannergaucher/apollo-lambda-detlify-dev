const Query = {
  todos: async (parent, { userId }, { db }) => {
    const todos = await db.Todo.find({
      userId,
    })

    return todos
  },
}

module.exports = Query
