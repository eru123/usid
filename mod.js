const Numesis = require("numesis");

class USID {
    charset;
    n;
    c;
    constructor(
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    ) {
        this.charset = charset;
        this.n = new Numesis(charset);
        this.c = {
            l: charset.length,
            i: charset.length - 1,
        };
    }
    randInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    rand(len = 3) {
        let res = "";
        for (let i = 0; i < len; i++)
            res += this.n.e(this.randInt(0, this.c.i));
        return res;
    }
    zeros(str, size = 2, left = false) {
        str = String(str);
        let z = "";
        for (let i = 0; i < size - str.length; i++) z += "0";
        return left ? z + str : str + z;
    }
    uid(complexity = 3, hrtime = false, separator = ".") {
        const d = Date.now();
        let res = this.n.e(d);
        try {
            if (hrtime) res += this.n.e(Number(performance.now()));
        } catch (e) {
            res += this.rand(1) + "." + this.rand(4);
        }
        return String(res + this.rand(complexity)).replace(".", separator);
    }
    uuid(len = 15) {
        const uid = this.uid(0, true).replace(".", "");
        const rand = this.rand(len - uid.length);
        return String(uid + rand).slice(0, len);
    }
}
module.exports = USID;
