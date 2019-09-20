const { verify } = require('jsonwebtoken')

class AuthError extends Error {
  constructor() {
    super('You are not authorized')
  }
}

function getUserId(request) {
  const authorization = request.event.headers.authorization // because request.get('Authorization') not working

  if (authorization) {
    const token = authorization.replace('Bearer ', '') // Need a space after Bearer.

    const verifiedToken = verify(token, process.env.REACT_APP_APP_SECRET)

    return verifiedToken && verifiedToken.userId
  }
}

module.exports = {
  getUserId,
  AuthError,
}
