const { hashSync, genSaltSync } = require('bcryptjs') // because bcrypt wont install
const { sign } = require('jsonwebtoken')

const Mutation = {
  signup: async (parent, { name, email, password }, context) => {
    const salt = genSaltSync(10)
    const hashedPassword = hashSync(password, salt)

    const user = await context.models.User.create({
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

  login: async (parent, args, context) => {
    // get userId from context
    // const user = await context.models.User.findById(id)

    return
  },
  createTodo: async (parent, { text }, { models }) => {
    const todo = await models.Todo.create({
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
