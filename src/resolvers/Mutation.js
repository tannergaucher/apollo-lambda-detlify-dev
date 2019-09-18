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
      throw new Error(`You must me logged in.`)
    }

    const todo = await db.Todo.create({
      text,
      userId,
    })

    return todo
  },

  updateTodo: async (parent, { id, text }, { db, request }) => {
    const userId = getUserId(request)

    const todo = await db.Todo.findById(id)
    todo.text = text
    await todo.save()

    return todo
  },
  deleteTodo: async (parent, { id }, { db }) => {
    // TODO check that user owns todo
    await db.Todo.findByIdAndDelete(id)

    return {
      message: 'You deleted a todo!',
    }
  },
}

module.exports = Mutation
