import Controller from "./Controller.js";

export default class MathsController extends Controller {
  constructor(HttpContext) {
    super(HttpContext);
  }

  get() {
    let data = this.HttpContext.path.params;
    if (data) {
      if (data["op"]) {
        let operator = data["op"];
        let x = data["x"];
        let reponse = null;
        if (operator == " ") {
          operator = "+";
        }
        let y = data["y"];
        let n = data["n"];

        if (data["x"] && isNaN(x)) {
            this.HttpContext.response.JSON("X is invalid.");
        }
        if (data["y"] && isNaN(y)) {
            this.HttpContext.response.JSON("Y is invalid.");
        }
        if (data["n"] && isNaN(n)) {
            this.HttpContext.response.JSON("N is invalid.");
        }

        if (isNaN(operator)) {
          if (operator == "+" && !isNaN(x) && !isNaN(y)) {
            reponse = parseInt(x) + parseInt(y);
          } else if (operator == "-" && !isNaN(x) && !isNaN(y)) {
            reponse = parseInt(x) - parseInt(y);
          } else if (operator == "*" && !isNaN(x) && !isNaN(y)) {
            reponse = parseInt(x) * parseInt(y);
          } else if (operator == "/" && !isNaN(x) && !isNaN(y)) {
            reponse = parseInt(x) / parseInt(y);
          }
          this.HttpContext.response.JSON(reponse);
        }
      } else this.HttpContext.response.JSON("Operator is invalid.");
    } else {
      this.HttpContext.response.JSON("Operator is invalid.");
    }
  }
}
