import express from 'express'

import {
    getUsers,
    createUser
} from './routes.mjs'

const app = express()

app.use(express.json())

app.get("/users", async (req, res) => {
    const users = await getUsers()
    res.send(users)
})

app.post("/users", async (req, res) => {
    const { longitude, latitude, emerg } = req.body
    const userId = await createUser(longitude, latitude, emerg)
    res.send("successful")
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Something broke")
})

app.listen(8080, () => {
    console.log("Server is running on port 8080")
})