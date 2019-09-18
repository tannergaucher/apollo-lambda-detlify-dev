const { verify } = require('jsonwebtoken')

class AuthError extends Error {
  constructor() {
    super('You are not authorized')
  }
}

function getUserId(request) {
  // because requet.get('Authorization') not working
  const authorization = request.event.headers.authorization

  if (authorization) {
    const token = authorization.replace('Bearer ', '')

    // replace with process.env.APP_SECRET
    const verifiedToken = verify(token, 'verysekret123')

    return verifiedToken && verifiedToken.userId
  }
}

module.exports = {
  getUserId,
  AuthError,
}
