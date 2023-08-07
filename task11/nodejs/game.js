const express = require('express')
const session = require('express-session')
const game = express()
const api = require('./route/api')
const loginpagerouter = require('./route/loginpagerouter')
const guesspagerouter = require('./route/guesspagerouter')

const Arry = process.argv.slice(2)
const port = Arry[0]

game.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'PUT,GET,POST,DELETE,OPTIONS')
	res.header('Access-Control-Allow-Headers', 'X-Requestd-With')
	res.header('Access-Control-Allow-Headers', 'Content-Type')
	next()
})

game.set('views', './views')
game.set('view engine', 'ejs')

game.use(express.urlencoded({ extended: false }))
game.use(express.json())

game.use(session({
	name: 'Trazee',
	secret: 'qweasdzxc',
	cookie: {
		maxAge: 1000 * 60 * 60,
		secure: false
	},
	resave: true,
	saveUninitialized: true
}))

game.use((req, res, next) => {
	if (req.url.includes('login') || req.url.includes('loginpage') || req.url.includes('register')) {
		next()
	} else if (req.session.myid) {
		next()
	} else {
		res.redirect('/loginpage')
	}
})

game.use('/loginpage', loginpagerouter)
game.use('/guesspage', guesspagerouter)
game.use('/', api)

game.listen(port, () => {
	console.log('server-start  port-->' + port)
})
