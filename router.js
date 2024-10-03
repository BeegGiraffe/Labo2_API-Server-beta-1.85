export const API_EndPoint = async function (HttpContext) {
    if (!HttpContext.path.isAPI) {
        return false;
    } else {
        let controllerName = HttpContext.path.controllerName;
        if (controllerName != undefined) {
            try {
                // dynamically import the targeted controller
                // if the controllerName does not exist the catch section will be called
                const { default: Controller } = (await import('./controllers/' + controllerName + '.js'));

                // instanciate the controller       
                let controller = new Controller(HttpContext);
                switch (HttpContext.req.method) {
                    case 'GET':
                        controller.get(HttpContext.payload);
                        return true;
                    case 'POST':
                        HttpContext.response.unsupported();
                        return true;
                    case 'PUT':
                        HttpContext.response.unsupported();
                        return true;
                    case 'DELETE':
                        HttpContext.response.unsupported();
                        return true;
                    default:
                        HttpContext.response.unsupported();
                        return true;
                }
            } catch (error) {
                console.log("API_EndPoint Error message: \n", error.message);
                console.log("Stack: \n", error.stack);
                HttpContext.response.notFound();
                return true;
            }
        } else {
            // not an API endpoint
            // must be handled by another middleware
            return false;
        }
    }
}