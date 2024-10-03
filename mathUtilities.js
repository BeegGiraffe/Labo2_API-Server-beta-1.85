export default class mathUtilities {
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
}