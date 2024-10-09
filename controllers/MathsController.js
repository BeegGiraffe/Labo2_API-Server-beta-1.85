import { factorial, isPrime, findPrime } from "../mathUtilities.js";
import Controller from "./Controller.js";
import { handleStaticResourceRequest } from "../staticResourcesServer.js";

export default class MathsController extends Controller {
  constructor(HttpContext) {
    super(HttpContext);
  }

  get() {
    if (this.HttpContext.path.queryString == "?") {
      this.HttpContext.req.url = "API-Help-Pages/API-Maths-Help.html";
      handleStaticResourceRequest(this.HttpContext);
    } else {
      let data = this.HttpContext.path.params;
      let error = "";
      let value = null;

      if (data["op"]) {
        if (isNaN(data["op"]) || data["op"] == " ") {
          let { op, ...rest } = data;

          if (op == " ") {
            op = "+";
          }

          switch (op) {
            case "+": {
              error = this.verifyParams(rest);
              if (error == "") {
                let x = parseFloat(rest["x"]);
                let y = parseFloat(rest["y"]);
                value = x + y;
                data.value = value;
                this.HttpContext.response.JSON(data);                break;
              } else {
                data.error = error;
                this.HttpContext.response.JSON(data);                break;
              }
            }
            case "-": {
              error = this.verifyParams(rest);
              if (error == "") {
                let x = parseFloat(rest["x"]);
                let y = parseFloat(rest["y"]);
                value = x - y;
                data.value = value;
                this.HttpContext.response.JSON(data);                break;
              } else {
                data.error = error;
                this.HttpContext.response.JSON(data);                break;
              }
            }
            case "*": {
              error = this.verifyParams(rest);
              if (error == "") {
                let x = parseFloat(rest["x"]);
                let y = parseFloat(rest["y"]);
                value = x * y;
                data.value = value;
                this.HttpContext.response.JSON(data);                break;
              } else {
                data.error = error;
                this.HttpContext.response.JSON(data);                break;
              }
            }
            case "/": {
              error = this.verifyParams(rest);
              if (error == "") {
                let x = parseFloat(rest["x"]);
                let y = parseFloat(rest["y"]);
                value = x / y;
                data.value = value;
                this.HttpContext.response.JSON(data);                break;
              } else {
                data.error = error;
                this.HttpContext.response.JSON(data);                break;
              }
            }
            case "%": {
              error = this.verifyParams(rest);
              if (error == "") {
                let x = parseFloat(rest["x"]);
                let y = parseFloat(rest["y"]);
                value = x % y;
                data.value = value;
                this.HttpContext.response.JSON(data);               break;
              } else {
                data.error = error;
                this.HttpContext.response.JSON(data);               break;
              }
            }
            case "!": {
              error = this.verifyParams(rest);
              if (error == "") {
                let n = parseInt(rest["n"]);
                value = factorial(n);

                data.value = value;
                this.HttpContext.response.JSON(data);              break;
              } else {
                data.error = error;
                this.HttpContext.response.JSON(data);              break;
              }
            }
            case "p": {
              error = this.verifyParams(rest);
              if (error == "") {
                let n = parseInt(rest["n"]);
                value = isPrime(n).toString();

                data.value = value;
                this.HttpContext.response.JSON(data);              break;
              } else {
                data.error = error;
                this.HttpContext.response.JSON(data);              break;
              }
            }
            case "np": {
              error = this.verifyParams(rest);
              if (error == "") {
                let n = parseInt(rest["n"]);
                value = findPrime(n);

                data.value = value;
                this.HttpContext.response.JSON(data);              break;
              } else {
                data.error = error;
                this.HttpContext.response.JSON(data);              break;
              }
            }
            default:
              error = "'op' parameter is invalid";
              data.error = error;
              this.HttpContext.response.JSON(data);
          }
        } else {
          error = "'op' parameter is a number";
          data.error = error;
          this.HttpContext.response.JSON(data);
        }
      } else {
        error = "'op' parameter is missing";
        data.error = error;
        this.HttpContext.response.JSON(data);
      }
    }
  }

  verifyParams(params) {
    let error = "";
    for (let param in params) {     
      if (isNaN(parseInt(params[param]))) {
        error = `'${param}' parameter is not a number`;
        break;
      }

      if (param == "x" || param == "y") {
        if (!("y" in params)) {
          error = `'y' parameter is missing`;
          break;
        }
        if (!("x" in params)) {
          error = `'x' parameter is missing`;
          break;
        }
        if (Object.keys(params).length > 2) {
          error = `too many parameters`;
          break;
        }
      } else if (param == "n") {
        if (Object.keys(params).length > 1) {
          error = `too many parameters`;
          break;
        }
        let n = parseFloat(params[param]);
        if (!Number.isInteger(n) || n < 0) {
          error = `'${param}' parameter must be an integer > 0`;
          break;
        }
      } else {
        error = `'x', 'y' and 'n' parameters missing`;
        break;
      }
    }
    return error;
  }
}
