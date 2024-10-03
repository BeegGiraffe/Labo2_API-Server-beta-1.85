import Controller from "./Controller.js";

factorial(n) {
    if (n === 0 || n === 1) {
      return 1;
    }
    return n * factorial(n - 1);
  }
  isPrime(value) {
    for (var i = 2; i < value; i++) {
      if (value % i === 0) {
        return false;
      }
    }
    return value > 1;
  }
  findPrime(n) {
    let primeNumber = 0;
    for (let i = 0; i < n; i++) {
      primeNumber++;
      while (!isPrime(primeNumber)) {
        primeNumber++;
      }
    }
    return primeNumber;
  }

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
        let reponse = null;
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
            reponse = isPrime(n);
          } else if (operator == "np" && !isNaN(n)) {
            reponse = findPrime(n);
          }
          this.HttpContext.response.JSON(reponse);
        }
      } else this.HttpContext.response.JSON("Operator is invalid.");
    } else {
      this.HttpContext.response.JSON("Operator is invalid.");
    }
  }
}
