const http = require('http')

http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
	res.write(renderhtml())
	res.end()
}).listen(3000, () => {
	console.log('server start')
})

function renderhtml () {
	return '<html><h2>hello world</h2></html>'
}
