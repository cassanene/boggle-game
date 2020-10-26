const boggle_solver = require("/Users/cassanene/Documents/sweassig1/boggle_solver.js");
// const boggle_solver = require("/home/codio/workspace/Boggle_Impl2_After_CodeReview/boggle_solver.js");

// Cassey Anene @02879027

function lowercaseStringArray(stringArray) {
	for (let i = 0; i < stringArray.length; i++)
		stringArray[i] = stringArray[i].toLowerCase();
}

describe("Boggle Solver tests suite:", () => {
	describe("Normal Input", () => {
		test("Normal 5x5 Grid ", () => {
			const grid = [
				["T", "W", "Y", "R"],
				["E", "N", "P", "H"],
				["G", "Z", "Qu", "R"],
				["O", "N", "T", "A"],
			];
			const dictionary = [
				"art",
				"ego",
				"gent",
				"get",
				"net",
				"new",
				"newt",
				"prat",
				"pry",
				"qua",
				"quart",
				"quartz",
				"rat",
				"tar",
				"tarp",
				"ten",
				"went",
				"wet",
				"arty",
				"egg",
				"not",
				"quar",
			];
			const expected = [
				"ten",
				"wet",
				"went",
				"ego",
				"net",
				"new",
				"newt",
				"pry",
				"prat",
				"get",
				"gent",
				"qua",
				"quar",
				"quart",
				"quartz",
				"rat",
				"tar",
				"tarp",
				"art",
			];

			let solutions = boggle_solver.findAllSolutions(grid, dictionary);
			lowercaseStringArray(solutions);
			lowercaseStringArray(expected);
			expect(solutions.sort()).toEqual(expected.sort());
		});

		test("Duplication - the implementation wont pick the same letters when finding duplicate letters.", () => {
			const grid = [
				["h", "a", "p", "e", "l"],
				["u", "n", "i", "s", "l"],
				["e", "qu", "b", "e", "a"],
				["a", "s", "g", "d", "c"],
				["e", "e", "qu", "o", "h"],
			];
			const dictionary = [
				"egg",
				"cassey",
				"well",
				"call",
				"will",
				"dogg",
				"happy",
				"unique",
				"see",
				"dell",
			];

			const expected = ["call", "see", "unique", "dell"];

			let solutions = boggle_solver.findAllSolutions(grid, dictionary);

			lowercaseStringArray(solutions);
			lowercaseStringArray(expected);
			expect(solutions.sort()).toEqual(expected.sort());
		});

		test("Diagonal - testing if the implementation can find words diagnoally. ", () => {
			const grid = [
				["c", "m", "y", "s"],
				["qu", "o", "a", "b"],
				["b", "v", "o", "n"],
				["e", "c", "t", "l"],
			];
			const dictionary = ["cool", "man", "boy", "save", "cob", "know"];

			const expected = ["cool", "man", "boy", "save", "cob"];

			let solutions = boggle_solver.findAllSolutions(grid, dictionary);

			lowercaseStringArray(solutions);
			lowercaseStringArray(expected);
			expect(solutions.sort()).toEqual(expected.sort());
		});

		test("Adjacent - testing if the implementation can find words adjacent to eachother. ", () => {
			const grid = [
				["s", "w", "a", "m"],
				["qu", "a", "n", "s"],
				["b", "l", "u", "e"],
				["e", "c", "t", "l"],
			];
			const dictionary = ["swam", "quan", "blue", "cob", "know"];

			const expected = ["swam", "quan", "blue"];

			let solutions = boggle_solver.findAllSolutions(grid, dictionary);

			lowercaseStringArray(solutions);
			lowercaseStringArray(expected);
			expect(solutions.sort()).toEqual(expected.sort());
		});
	});

	describe("Problem Constraints", () => {
		test("Qu Test", () => {
			const grid = [
				["u", "qu", "a", "i", "c"],
				["b", "d", "l", "t", "f"],
				["e", "qu", "r", "a", "g"],
				["w", "a", "j", "i", "h"],
				["s", "k", "l", "m", "n"],
			];
			const dictionary = [
				"quail",
				"quadratic",
				"uquail",
				"swequa",
				"qube",
				"cool",
				"dog",
			];

			const expected = ["quail", "quadratic", "uquail", "swequa", "qube"];

			let solutions = boggle_solver.findAllSolutions(grid, dictionary);

			lowercaseStringArray(solutions);
			lowercaseStringArray(expected);
			expect(solutions.sort()).toEqual(expected.sort());
		});

		test("Q Test", () => {
			const grid = [
				["u", "z", "a"],
				["b", "d", "l"],
				["e", "q", "r"],
			];
			const dictionary = [
				"quail",
				"quadratic",
				"uquail",
				"swequa",
				"qube",
				"cool",
				"dog",
			];

			const expected = [];

			let solutions = boggle_solver.findAllSolutions(grid, dictionary);

			lowercaseStringArray(solutions);
			lowercaseStringArray(expected);
			expect(solutions.sort()).toEqual(expected.sort());
		});

		test("Qx test", () => {
			const grid = [
				["u", "e", "s"],
				["b", "qb", "a"],
				["s", "k", "l"],
			];
			const dictionary = [
				"versace",
				"winner",
				"never",
				"school",
				"turbo",
				"cool",
				"dog",
			];

			const expected = [];

			let solutions = boggle_solver.findAllSolutions(grid, dictionary);

			lowercaseStringArray(solutions);
			lowercaseStringArray(expected);
			expect(solutions.sort()).toEqual(expected.sort());
		});

		test("Only use letter once", () => {
			const grid = [];

			const dictionary = [];
			const expected = [];

			let solutions = boggle_solver.findAllSolutions(grid, dictionary);

			lowercaseStringArray(solutions);
			lowercaseStringArray(expected);
			expect(solutions.sort()).toEqual(expected.sort());
		});

		test("Palidromes - Should only count words once", () => {
			const grid = [
				["K", "D", "I", "H", "A", "Y"],
				["R", "A", "C", "E", "C", "R"],
				["G", "A", "Y", "T", "I", "A"],
				["Qu", "B", "W", "A", "O", "N"],
				["I", "C", "R", "N", "K", "S"],
				["W", "I", "N", "D", "F", "G"],
			];
			const dictionary = [
				"racecar",
				"dictionary",
				"kayak",
				"wind",
				"school",
				"univerisity",
				"words",
			];
			const expected = ["racecar", "dictionary", "kayak", "wind"];

			// let solutions = boggle_solver.findAllSolutions(grid, dictionary);
			let solutions = boggle_solver.findAllSolutions(grid, dictionary);

			// Lowercasing for case-insensitive string array matching.
			lowercaseStringArray(solutions);
			lowercaseStringArray(expected);
			expect(solutions.sort()).toEqual(expected.sort());
		});
	});

	describe("Edge Cases", () => {
		test("Empty Grid Tiles", () => {
			const grid = [
				["a", "b", "c", "d"],
				["e", "f", "g", "h"],
				["i", "j", "k", "l"],
				["o", "p", "", "w"],
			];
			const dictionary = ["applesauce", "cranberry", "cool", "school", "happy"];

			const expected = [];

			let solutions = boggle_solver.findAllSolutions(grid, dictionary);

			expect(solutions).toEqual(expected);
		});
		test("Empty Dictionary", () => {
			const grid = [
				["A", "B", "C", "D"],
				["E", "F", "G", "H"],
				["I", "J", "K", "L"],
				["M", "N", "O", "P"],
			];
			const dictionary = [];
			const expected = [];

			let solutions = boggle_solver.findAllSolutions(grid, dictionary);

			lowercaseStringArray(solutions);
			lowercaseStringArray(expected);
			expect(solutions.sort()).toEqual(expected.sort());
		});

		test("Empty Grid", () => {
			const grid = [];
			const dictionary = [
				"daughter",
				"class",
				"solutions",
				"change",
				"testing",
				"study",
			];
			const expected = [];

			let solutions = boggle_solver.findAllSolutions(grid, dictionary);

			lowercaseStringArray(solutions);
			lowercaseStringArray(expected);
			expect(solutions.sort()).toEqual(expected.sort());
		});

		test("Uneven Grid", () => {
			const grid = [
				["a", "b", "c", "d"],
				["e", "f", "g", "h"],
				["i", "j", "k", "l"],
				["o", "p", "qu"],
			];
			const dictionary = ["abc", "def", "ghi", "jkl"];

			const expected = [];

			let solutions = boggle_solver.findAllSolutions(grid, dictionary);

			lowercaseStringArray(solutions);
			lowercaseStringArray(expected);
			expect(solutions.sort()).toEqual(expected.sort());
		});

		test("Short Words", () => {
			const grid = [
				["a", "p", "y", "m"],
				["p", "p", "u", "c"],
				["l", "e", "b", "a"],
				["e", "qu", "z", "m"],
			];
			const dictionary = [
				"a",
				"apple",
				"cup",
				"bee",
				"my",
				"glasses",
				"ruler",
				"phone",
				"switch",
				"mac",
			];

			const expected = ["apple", "cup", "bee", "mac"];

			let solutions = boggle_solver.findAllSolutions(grid, dictionary);

			lowercaseStringArray(solutions);
			lowercaseStringArray(expected);
			expect(solutions.sort()).toEqual(expected.sort());
		});

		test("10 x 10 Grid", () => {
			const grid = [
				["l", "v", "e", "r", "s", "t", "c", "e", "l", "e"],
				["o", "l", "qu", "e", "a", "o", "w", "e", "y", "w"],
				["n", "b", "k", "c", "y", "p", "n", "o", "m", "e"],
				["d", "j", "d", "w", "m", "w", "j", "y", "r", "t"],
				["o", "y", "j", "o", "h", "u", "y", "v", "v", "n"],
				["n", "c", "c", "l", "d", "b", "r", "r", "a", "qu"],
				["f", "z", "s", "h", "l", "h", "o", "z", "u", "y"],
				["x", "t", "k", "x", "qu", "y", "h", "u", "u", "l"],
				["c", "r", "qu", "e", "r", "e", "f", "l", "qu", "h"],
				["x", "p", "o", "b", "r", "u", "e", "x", "x", "j"],
			];

			const dictionary = [
				"versace",
				"london",
				"compost",
				"money",
				"horray",
				"pobre",
				"human",
				"space",
			];

			const expected = [
				"versace",
				"london",
				"compost",
				"money",
				"horray",
				"pobre",
			];
			let solutions = boggle_solver.findAllSolutions(grid, dictionary);

			lowercaseStringArray(solutions);
			lowercaseStringArray(expected);
			expect(solutions.sort()).toEqual(expected.sort());
		});
	});
});

