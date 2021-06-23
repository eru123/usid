import USID from "../mod.ts";

const usid = new USID();
const uids: string[] = [];

const duplicates = (arr: string[]): string[] => {
	let sorted_arr = arr.slice().sort();
	let results = [];
	for (let i = 0; i < sorted_arr.length - 1; i++) {
		if (sorted_arr[i + 1] == sorted_arr[i]) {
			results.push(sorted_arr[i]);
		}
	}
	return results;
};

const timeStart: number = Date.now();
for (let i = 0; i < 100000; i++) uids.push(usid.uuid());
const timeEnd: number = Date.now();
const dups = duplicates(uids).length;
console.log("Total ID's:", uids.length);
console.log("Duplicated:", dups);
console.log("Elapsed Time:", (timeEnd - timeStart) / 1000, "secs");
