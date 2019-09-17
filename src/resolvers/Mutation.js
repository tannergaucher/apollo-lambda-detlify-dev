const { hashSync, genSaltSync } = require('bcryptjs') // because bcrypt isn't installing
const { sign } = require('jsonwebtoken')

const Mutation = {
  signup: async (parent, { name, email, password }, context) => {
    const salt = genSaltSync(10)
    const hashedPassword = hashSync(password, salt)

    console.log(context)

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
