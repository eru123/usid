import Numesis from "https://deno.land/x/numesis/mod.ts";

/**
 * @type {string} DEFAULT_CHARSET The default charset for USID
 */
export const DEFAULT_CHARSET = Numesis.DEFAULT;

/**
 * @param min The minimum number
 * @param max The maximum number
 * @returns A number between min and max
 */
export const randInt = (min: number, max: number) => parseInt((Math.random() * (max - min + 1) + min) + "");

/**
 * @param len The length of the string
 * @param charset The charset for the string
 * @returns A random string with len length
 */
export const rand = (len: number = 3, charset: string | null = null): string => {
	charset = charset || DEFAULT_CHARSET;
	const n = new Numesis(charset);
	const c = n.charset.length;
	const min = c ** (len - 1) - (len > 1 ? 0 : 1)
	const max = c ** len - 1
	return n.e(randInt(min, max))
}

/**
 * @param out_len The length of the output string
 * @param real_len The length of the initial int value to be encoded
 * @param charset The charset for the string
 * @returns A random string with out_len length
 */
export const uid = (out_len: number = 24, real_len: number = 18, charset: string = DEFAULT_CHARSET): string => {
	charset = charset || DEFAULT_CHARSET;
	const n = new Numesis(charset);
	let y = performance.now().toString()
	y = (y.length < real_len ? (y + "0".repeat(real_len - y.length - 1) + "1") : y).replace(".", "0")
	let r = n.e(y)
	return r.length < out_len ? r + rand(out_len - r.length) : r;
}

/**
 * Options for createIndex function
 */
export type CreateIndexOptions = {
	/**
	 * @type {string} charset The charset for the string
	 */
	charset: string,

	/**
	 * @type {Function} a callback function that will be called to get the latest index
	 */
	get: Function,

	/**
	 * @type {Function} a callback function that will be called to set the latest index
	 */
	set: Function,

	/**
	 * @type {number} The min length of the output string
	 */
	min?: number
}

/**
 * 
 * @param opts The options for the USID
 * @returns A callback function that generates an index based ID
 */
export const createIndex = (opts: CreateIndexOptions): Function => {

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
		return n.t(min, index)
	}
}

export default uid