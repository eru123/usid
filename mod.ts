import Numesis from "https://deno.land/x/numesis/mod.ts";

class USID {
	public n: Numesis;
	private readonly c: { i: number; l: number };
	constructor(
		private readonly charset: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	) {
		this.n = new Numesis(charset);
		this.c = {
			l: charset.length,
			i: charset.length - 1,
		};
	}

	private randInt(min: number, max: number) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	rand(len = 3): string {
		let res = "";
		for (let i = 0; i < len; i++)
			res += this.n.e(this.randInt(0, this.c.i));
		return res;
	}
	zeros(
		str: number | string,
		size: number = 2,
		left: boolean = false
	): string {
		str = String(str);
		let z = "";
		for (let i = 0; i < size - str.length; i++) z += "0";
		return left ? z + str : str + z;
	}
	uid(
		complexity: number = 3,
		hrtime: boolean = false,
		separator: string = "."
	) {
		const d = Date.now();
		let res = this.n.e(d);
		try {
			if (hrtime) res += this.n.e(Number(performance.now()));
		} catch (e) {
			res += this.rand(1) + "." + this.rand(4);
		}
		return String(res + this.rand(complexity)).replace(".", separator);
	}
	uuid(len:number = 15){
		const uid = this.uid(0,true).replace(".","")
		const rand = this.rand(len - uid.length)
		return String(uid + rand).slice(0,len)
	}
}

export default USID;
