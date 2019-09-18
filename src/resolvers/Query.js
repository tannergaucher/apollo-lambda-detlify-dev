const { getUserId } = require('../utils/get-user-id')

const Query = {
  me: async (parent, args, { db, request }) => {
    const userId = getUserId(request)

    if (!userId) {
      return null
    }

    const user = await db.User.findById(userId)

    return user
  },
}

module.exports = Query
