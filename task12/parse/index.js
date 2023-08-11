const express = require('express')
const ParseServer = require('parse-server').ParseServer
const ParseDashboard = require('parse-dashboard')
const app = express()

const server_start = async () => {
	const server = new ParseServer({
		databaseURI: 'mongodb://admin:12345@127.0.0.1:27017/mytest', // Connection string for your MongoDB database
		// cloud: './cloud/main.js', // Path to your Cloud Code
		appId: 'myAppId',
		masterKey: 'myMasterKey', // Keep this key secret!
		fileKey: 'optionalFileKey',
		serverURL: 'http://localhost:1337/parse' // Don't forget to change to https if needed
	})
	// Start server
	await server.start()
	// Serve the Parse API on the /parse URL prefix
	app.use('/parse', server.app)

	const dashboard = new ParseDashboard({
		'apps': [
			{
				'serverURL': 'http://localhost:1337/parse',
				'appId': 'myAppId',
				'masterKey': 'myMasterKey',
				'appName': 'MyApp'
			}
		]
	})
	app.use('/dashboard', dashboard)

	app.listen(1337, function () {
		console.log('parse-server-example running on port 1337.')
	})
}

server_start()

