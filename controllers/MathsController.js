import { factorial, isPrime, findPrime } from "../mathUtilities.js";
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
        let y = data["y"];
        let n = data["n"];
        let reponse;
        if (operator == " ") {
          operator = "+";
        }

        if (data["x"] && isNaN(x)) {
          this.HttpContext.response.JSON("X is invalid.");
        }
        if (data["y"] && isNaN(y)) {
          this.HttpContext.response.JSON("Y is invalid.");
        }
        if (data["n"] && isNaN(n)) {
          this.HttpContext.response.JSON("N is invalid.");
        }
        if (data["x"] && data["y"] && data["n"]) {
          this.HttpContext.response.JSON("To many parameters.");
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
          } else if (operator == "%" && !isNaN(x) && !isNaN(y)) {
            reponse = parseInt(x) % parseInt(y);
          } else if (operator == "!" && !isNaN(n)) {
            reponse = factorial(n);
          } else if (operator == "p" && !isNaN(n)) {
            reponse = isPrime(n).toString();
          } else if (operator == "np" && !isNaN(n)) {
            reponse = findPrime(n);
          }
          this.HttpContext.response.JSON(reponse);
        }
      } else this.HttpContext.response.JSON("Operator is invalid.");
    } else {
      this.HttpContext.response.JSON(
        "GET : Maths endpoint" +
        "List of possible query strings:" +

        "? op = + & x = number & y = number" +
        'return {“op"x":number, "y":number, "value": x + y}' +

        "? op = - & x = number & y = number" +
        'return {"op":"-", "x":number, "y":number, "value": x - y}' +

        "? op = * & x = number & y = number" +
        'return {"op":"*", "x":number, "y":number, "value": x * y}' +

        "? op = / & x = number & y = number" +
        'return {"op":"/", "x":number, "y":number, "value": x / y}' +

        "? op = % & x = number & y = number" +
        'return {"op":"%", "x":number, "y":number, “value”: x % y}' +

        "? op = ! & n = integer" +
        'return {"op":"%", "n":integer, "value": n!}' +

        "? op = p & n = integer" +
        'return {"op":"p", "n":integer, “value”: true if n is a prime number}' +

        "? op = np & n = integer" +
        'return {"op":"np", "n":integer, “value”: nth prime number}'
        );
    }
  }
}
