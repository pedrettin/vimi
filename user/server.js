const database = require('../database/start.js')
const app      = require('./app.js')(database)
const port     = require('../tools/globals.js').user_port

/*Start the server*/
app.listen(port, () => {
  console.log(`server running on port ${port}`)
})
