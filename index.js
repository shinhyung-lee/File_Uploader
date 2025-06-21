require('dotenv').config();
const express = require("express");
const app = express();
const path = require("node:path");
const loginRouter = require("./routes/loginRouter");
const indexRouter = require("./routes/indexRouter");
const queries = require("./db/queries");
const prisma = require("./db/prisma");

async function main() {
  await prisma.user.create({
    data: {
      username: 'jojo@prisma.io',
      password: '1111',
      files: {
        create: { title: 'dummy file' },
      },
    },
  })

  const allUsers = await prisma.user.findMany({
    include: {
      files: true,
    },
  })
  console.dir(allUsers, { depth: null })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/assets'));

app.use("/", indexRouter);
app.use("/auth", loginRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});