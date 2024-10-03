import Controller from './Controller.js';

export default class MathsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext);
    }

    get() {
        let data = this.HttpContext.path.params;
        if (data) {
            if (data["op"]) {
                let operator = data["op"];
                let values = [];
                for (let i = 1; i < Object.keys(data).length; i++) {
                    values.push(data[i]);
                }

                if (isNaN(operator) || operator == " ") {

                }
                else 
                    this.HttpContext.response.JSON("Operator is invalid.");
                    
            }
        }
    }
}
