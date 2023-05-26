const server = http.createServer(async (request, response) => {
    const {method} = request
    if (method === 'GET') {
        const content = await fs.readFile(path.join(basePath, 'index.html'))
        response.setHeader('Content-Type', 'text/html')
        response.writeHead(200)
        response.end(content)
    } else if (method === 'POST') {
        const body = []
        response.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8',
        })
        request.on('data', data => {
            // data - Buffer
            body.push(Buffer.from(data))
            console.log(data)
        })
        request.on('end', data => {
            const title = body.toString().split('=')[1].replaceAll('+', ' ')
            addNote(title)
            response.end(`Title=${title}`)
        })
    }
})