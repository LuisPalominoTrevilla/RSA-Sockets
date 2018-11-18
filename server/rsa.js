function MCD(a, b) {
    if (a === 0) {
        return b;
    }
    return MCD(b%a, a);
}

function phi(m) {
    res = 0;
    for (let i = 0; i < m; i++) {
        if (MCD(i, m) === 1) res++;
    }
    return res;
}

function erathostenes(m) {
    res = [];
    nums = new Array(m).fill(true);
    for (let i = 2; i < m; i++) {
        if (nums[i]) {
            for (let j = i+i; j < m; j+=i) {
                nums[j] = false;
            }
        }
    }
    for (let i = 2; i < m; i++) {
        if (nums[i]) {
            res.push(i);
        }
    }
    return res;
}

const primes = erathostenes(10000);
let p = primes[Math.floor(Math.random() * (120 - 80)) + 80];
let q = p;
while (q == p) {
    q = primes[Math.floor(Math.random() * (120 - 80)) + 80];
}

let n = p*q;
let phiN = (p-1)*(q-1);

let e = 1;
for (let i = 2; i <= phiN; i++) {
    if (MCD(i, phiN) == 1) {
        e = i;
    }
}

let k = 0;
while(true) {
    let z = (k*phiN)+1;
    if (z%e) {
        k++;
        continue;
    }
    var d = Math.floor(((k*phiN)+1)/e);
    break;
}

function encrypt(n, e, x) {
    return fastPow(x, e, n)%n;
}

function decrypt(d, y, n) {
    return fastPow(y, d, n)%n;
}

function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

function fastPow(x, e, n) {
    let dec = dec2bin(e);
    let r = x;
    for (let i = 1; i < dec.length; i++) {
        r = Math.pow(r, 2)%n;
        if (dec[i] == 1) {
            r = r*x%n;
        }
    }
    return r;
}
let stri = "la -9neta chingas a toda家 tu puta madre puto imbécil";
let result = "";
for (char of stri) {
    let y = encrypt(n, e, char.codePointAt(0));
    result += String.fromCodePoint(y);
}
console.log(result);
original = "";
for (char of result) {
    let y = decrypt(d, char.codePointAt(0), n);
    original += String.fromCodePoint(y);
}
console.log(original);