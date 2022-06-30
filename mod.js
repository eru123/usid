const Numesis = require('numesis');

/**
 * @type {string} DEFAULT_CHARSET The default charset for USID
 */
const DEFAULT_CHARSET = Numesis.DEFAULT;

/**
 * @param min The minimum number
 * @param max The maximum number
 * @returns A number between min and max
 */
const randInt = (min, max) => parseInt(Math.random() * (max - min + 1) + min + "");

/**
 * @param len The length of the string
 * @param charset The charset for the string
 * @returns A random string with len length
 */
const rand = (len = 3, charset = null) => {
    charset = charset || DEFAULT_CHARSET;
    const n = new Numesis(charset);
    const c = n.charset.length;
    const min = c ** (len - 1) - (len > 1 ? 0 : 1);
    const max = c ** len - 1;
    return n.e(randInt(min, max));
};

/**
 * @param out_len The length of the output string
 * @param real_len The length of the initial int value to be encoded
 * @param charset The charset for the string
 * @returns A random string with out_len length
 */
const uid = (out_len = 24, real_len = 18, charset = DEFAULT_CHARSET) => {
    charset = charset || DEFAULT_CHARSET;
    const n = new Numesis(charset);
    let y = performance.now().toString();
    y = (y.length < real_len ? y + "0".repeat(real_len - y.length - 1) + "1" : y).replace(".", "0");
    let r = n.e(y);
    return r.length < out_len ? r + rand(out_len - r.length) : r;
};

/**
 * 
 * @param opts The options for the USID
 * @returns A callback function that generates an index based ID
 */
const createIndex = (opts) => {
    
    /**
     * @return encoded latest index
     */
    return () => {
        
        let { get, set, charset, min } = opts;
        min = min || 0;
        charset = charset || DEFAULT_CHARSET;
        const n = new Numesis(opts.charset);
        const lastIndex = get();
        const index = lastIndex + 1;
        set(index);
        return n.t(min, index);
    };
};

module.exports = {
    DEFAULT_CHARSET,
    randInt,
    rand,
    uid,
    createIndex
};