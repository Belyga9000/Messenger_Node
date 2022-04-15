const colors = require("colors/safe");

const isPrime = (number) => {
    if (number < 2) return false;

    for (let i = 2; i <= number / 2; i++) {
        if(number % i === 0) return false;
    }
    return true;
}

const from = process.argv[2];
const to = process.argv[3];
let count = 1;
let primeCount = 0;

console.log(typeof(to));

for (let number = from; number <= to; number++) {

    let colorer = colors.green;
// все инпуты принимаются за тип string
    if (typeof number !== "number" || typeof to !== "number") {
        colorer = colors.red;
        console.log(colorer("Input is not a number"))
        primeCount ++
        break
    }

    if (isPrime(number)) {
        primeCount ++;
        if (count % 2 === 0) {
            colorer = colors.yellow;
            count += 1;
        } else if ( count % 3 === 0) {
            colorer = colors.red;
            count = 1;
        } else {
            count += 1;
        }
        console.log(colorer(number));
    } 
}

if (primeCount === 0 ) {
    colorer = colors.red
    console.log(colorer("Error no prime numbers in the current interval"))
}
