

const app = require("./src/app");
const PORT = process.env.PORT || 3066

const server = app.listen(3066,() => {
    console.log(`WSV eCommerce start with ${PORT}`)
})


process.on('SIGINT', () => {
    server.close( () => console.log(`Exit Server Express`))
    process.exit();
    //notify.send(ping...)
})