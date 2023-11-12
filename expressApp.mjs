import express from 'express'

import {
    getUsers,
    createUser,
    updateUser
} from './routes.mjs'

const app = express()

app.use(express.json())

app.get("/users", async (req, res) => {
    const users = await getUsers()
    res.send(users)
})

app.post("/updateUser", async (req, res) => {
    const { id, longitude, latitude, emerg } = req.body
    const users = await updateUser(id, longitude, latitude, emerg)
    res.send("")
})

app.post("/users", async (req, res) => {
    const { longitude, latitude, emerg } = req.body
    const userId = await createUser(longitude, latitude, emerg)
    res.send(userId+"")
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Something broke")
})

app.listen(8080, () => {
    console.log("Server is running on port 8080")
})