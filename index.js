/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just hack it…
I need this code, but don't know where, perhaps should make some middleware, don't worry, just hack it

Go code!
*/
const express = require('express');
const ProjectsRouter = require('./routers/projects-router.js');
const ActionsRouter = require('./routers/actions-router.js');

const server = express();
server.use(express.json());

PORT = 5002;

server.get('/', (req, res) => {
    res.status(200).json({
        message: "sprint api"
    })
})

server.listen(PORT,  console.log(`Server is running on http://localhost:${PORT}`))

server.use('/api/projects', ProjectsRouter);
server.use('/api/projects', ActionsRouter);