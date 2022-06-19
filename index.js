function submit_button() {
    console.log("you are logged in")
}



const express = require(`express`)
const path = require(`path`)
const http = require(`http`)
const socketio = require(`socket.io`)

const app = express()
const PORT = 1111 || process.env.PORT
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static('Public'));

io.on(`connection`, socket => 
{
    socket.on('joinRoom', ({username,room}) => 
    {
        const user = newUser(socket.id, username, room)

        socket.join(user.room)

        socket.emit(`message`, "Messages are limited to this room!")

        socket.broadcast
        .to(user.room)
        .emit(
            `message`,
            `${user.username} has joined the room`
        )

        io.to(user.room).emit(`roomUsers`, 
        {
            room: user.room,
            users: getIndividualRoomUsers(user.room)
        })

    })

    socket.on(`chatMessage`, msg => 
    {
        const user = getActiveUser(socket.id)

        io.to(user.room).emit(`message`, msg)
    })

    socket.on(`disconnect`, () => 
    {
        const user = exitRoom(socket.id)

        if (user) 
        {
            io.to(user.room).emit(
                `message`,
                `${user.username} has left the room`
            )

            io.to(user.room).emit('roomUsers', 
            {
                room: user.room,
                users: getIndividualRoomUsers(user.room)
            })
        }
    }
    )
})









app.get('/', function (req, res) 
{
    res.render(`index.html`)
})

app.post('/', function (req, res) 
{
    res.send("Request send")
})

// app.listen(PORT, () => console.log(`App is live on port ${PORT}`))
app.listen(PORT, () => console.log(`App is live on port ${PORT}`))