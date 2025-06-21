const prisma = require("./prisma");

const createUser = async (username, password) => {
  return await prisma.user.create({
    data: {
      username: username,
      password: password, // Ensure this is hashed before storing
    },
  });
};

module.exports = {
  createUser,
}
