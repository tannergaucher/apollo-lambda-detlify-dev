const { sign } = require('jsonwebtoken')
const { hashSync, genSaltSync, compareSync } = require('bcryptjs') // because bcrypt wont install

const { getUserId, AuthError } = require('../utils/get-user-id')

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

  login: async (parent, { email, password }, { db, request }) => {
    const [user] = await db.User.find({
      email,
    })

    if (!user) {
      throw new AuthError()
    }

    console.log(user)

    const passwordValid = compareSync(password, user.password)

    if (!passwordValid) {
      throw new Error(`Invalid password`)
    }

    // // replace with process.env.APP_SECRET
    const token = sign({ userId: user._id }, 'verysekret123')

    return {
      user,
      token,
    }
  },

  createTodo: async (parent, { text }, { db, request }) => {
    const userId = getUserId(request)

    if (!userId) {
      throw new Error(`You must me logged in for that.`)
    }

    const todo = await db.Todo.create({
      text,
      userId,
    })

    return todo
  },

  updateTodo: async (parent, args, context) => {
    // TODO
    return
  },
  deleteTodo: async (parent, args, context) => {
    // TODO
    return
  },
}

module.exports = Mutation
