import { createServer } from 'http';
import HttpContext from './httpContext.js';
import * as router from './router.js';
import { handleCORSPreflight } from './cors.js';
import { handleStaticResourceRequest } from './staticResourcesServer.js';

const server = createServer(async (req, res) => {
    console.log(req.method);
    let httpContext = await HttpContext.create(req, res);
    if (!handleCORSPreflight(httpContext))
    {
        if (!await handleRequest(req, res)) {
            res.writeHead(404);
            res.end();
        }
        if (!handleStaticResourceRequest(httpContext))
            if (!await router.API_EndPoint(httpContext))
                httpContext.response.notFound('this end point does not exist...');
    }

});
async function handleRequest(req, res) {
    if (! await handlemathsServiceRequest(req, res))
        return false;
    return true;
}
async function handlemathsServiceRequest(req, res) {
    if (req.url.includes("/api/math")) {
        let validStatus = '';
        switch (req.method) {
            case 'GET':
                res.writeHead(400);
                res.end(`test Get`);
                break;
            case 'POST':
                res.writeHead(400);
                res.end(`Post not available`);
                break;
            case 'PUT':
                res.writeHead(400);
                res.end(`Put not available`);
                break;
            case 'DELETE':
                res.writeHead(400);
                res.end(`Delete not available`);
                break;
            case 'PATCH':
                res.writeHead(501);
                res.end(`Patch not available`);
                break;
        }
        return true;
    }
    return false;
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
