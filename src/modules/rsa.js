export default class RSA {

    constructor() {
        const primes = this.erathostenes(10000);
        let p = primes[Math.floor(Math.random() * (90 - 70)) + 70];
        let q = p;
        while (q == p) {
            q = primes[Math.floor(Math.random() * (90 - 70)) + 70];
        }
        this.n = p*q;
        this.phiN = (p-1)*(q-1);
        
        this.e = 1;
        for (let i = 2; i <= this.phiN; i++) {
            if (this.MCD(i, this.phiN) == 1) {
                this.e = i;
                break;
            }
        }

        let k = 0;
        // eslint-disable-next-line
        while(true) {
            let z = (k*this.phiN)+1;
            if (z%this.e) {
                k++;
                continue;
            }
            this.d = Math.floor(((k*this.phiN)+1)/this.e);
            break;
        }
    }

    get publicKey () {
        return {n: this.n, e: this.e};
    }

    get privateKey() {
        return this.d;
    }

    MCD(a, b) {
        if (a === 0) {
            return b;
        }
        return this.MCD(b%a, a);
    }
    
    phi(m) {
        let res = 0;
        for (let i = 0; i < m; i++) {
            if (this.MCD(i, m) === 1) res++;
        }
        return res;
    }
    
    erathostenes(m) {
        let res = [];
        let nums = new Array(m).fill(true);
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

    encrypt_helper(x, n, e) {
        return this.fastPow(x, e, n)%n;
    }
    
    encrypt(x, n, e) {
        let result = "";
        for (let char of x) {
            let y = this.encrypt_helper(char.codePointAt(0), n, e);
            result += String.fromCodePoint(y);
        }
        return result;
    }
    
    decrypt_helper(y) {
        return this.fastPow(y, this.d, this.n)%this.n;
    }

    decrypt(y) {
        let original = "";
        for (let char of y) {
            let y = this.decrypt_helper(char.codePointAt(0));
            original += String.fromCodePoint(y);
        }
        return original;
    }
    
    dec2bin(dec){
        return (dec >>> 0).toString(2);
    }
    
    fastPow(x, e, n) {
        let dec = this.dec2bin(e);
        let r = x;
        for (let i = 1; i < dec.length; i++) {
            r = Math.pow(r, 2)%n;
            if (dec[i] == 1) {
                r = r*x%n;
            }
        }
        return r;
    }
}