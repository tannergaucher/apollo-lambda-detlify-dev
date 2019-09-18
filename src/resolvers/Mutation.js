const { hashSync, genSaltSync } = require('bcryptjs') // because bcrypt wont install
const { sign } = require('jsonwebtoken')

const Mutation = {
  signup: async (parent, { name, email, password }, { db }) => {
    const salt = genSaltSync(10)
    const hashedPassword = hashSync(password, salt)

    const user = await db.User.create({
      name,
      email,
      password: hashedPassword,
    })

    const token = sign({ userId: user._id }, 'verysekret123')

    return {
      user,
      token,
    }
  },

  login: async (parent, args, { db }) => {
    // get userId from request

    // const user = await context.models.User.findById(id)

    return
  },
  createTodo: async (parent, { text }, { db }) => {
    const todo = await db.Todo.create({
      text,
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
