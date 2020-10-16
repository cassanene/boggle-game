/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */
/**
 * Cassey Anene @02879027
 * trie code from: https://medium.com/@alexanderv/tries-javascript-simple-implementation-e2a4e54e4330
 */

function Trie() {
	this.head = {
		key: "",
		children: {},
	};
}

Trie.prototype.add = function (key) {
	var curNode = this.head;
	var newNode = null;
	var curChar = key.slice(0, 1);

	key = key.slice(1);

	while (
		typeof curNode.children[curChar] !== "undefined" &&
		curChar.length > 0
	) {
		curNode = curNode.children[curChar];
		curChar = key.slice(0, 1);
		key = key.slice(1);
	}

	while (curChar.length > 0) {
		newNode = {
			key: curChar,
			value: key.length === 0 ? null : undefined,
			children: {},
		};
		curNode.children[curChar] = newNode;

		curNode = newNode;

		curChar = key.slice(0, 1);
		key = key.slice(1);
	}
};

Trie.prototype.search = function (key) {
	var curNode = this.head;
	var curChar = key.slice(0, 1); //getting the first letter
	key = key.slice(1); //getting the last letters

	//if the first letter is not a child of the current node then return false
	if (typeof curNode.children[curChar] === "undefined" && curChar.length === 1)
		return false;

	while (
		typeof curNode.children[curChar] !== "undefined" &&
		curChar.length > 0
	) {
		curNode = curNode.children[curChar];
		curChar = key.slice(0, 1);
		if (typeof curNode.children[curChar] === "undefined" && curChar.length === 1)
			return false;
		key = key.slice(1);
	}
	return true;
};

function search(grid, trie, x, y, string, solutions, usedcoord, dictionary) {
	//all the places the coordinates can go
	const adjacentCoord = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, -1],
		[0, 1],
		[1, -1],
		[1, 0],
		[1, 1],
	];

	usedcoord[x][y] = true;
	//adding the next letter to the current string to check it in the trie
	string = string + grid[x][y].toLowerCase();

	//if the string is not a valid string meaning it isnt in the dictionary
	if (trie.search(string) === false) {
		usedcoord[x][y] = false;
		return;
	} else {
		if (dictionary.includes(string)) {
			if (!(string.length < 3) && !solutions.includes(string)) {
				solutions.push(string);
			}
		}
		// goes thorugh every adjacent coordinate to the tile that we are on
		for (const coord of adjacentCoord) {
			let coord1 = coord[0] + x;
			let coord2 = coord[1] + y;
			var notnegative = coord1 >= 0 && coord2 >= 0;
			var ongrid = coord1 < grid.length && coord2 < grid[0].length;
			if (notnegative && ongrid) {
				if (usedcoord[coord1][coord2]) {
					continue;
				}

				search(
					grid,
					trie,
					coord1,
					coord2,
					string,
					solutions,
					usedcoord,
					dictionary
				);
			}
		}
		usedcoord[x][y] = false;
	}
}

exports.findAllSolutions = function (grid, dictionary) {
	let solutions = [];
	let emptystring = "";
	let usedcoord = [];
	let trie = new Trie();
	let i, x, y;

	//if the grid or dictionary is empty return empty string
	if (grid.length === 0 || dictionary.length === 0) {
		console.log("error");
		return solutions;
	}

	for (i = 0; i < grid.length; i++) {
		if (grid.length !== grid[i].length) {
			console.log("error");
			return solutions;
		}
	}
	//add all the words in the dictionary
	for (i = 0; i < dictionary.length; i++) {
		dictionary[i] = dictionary[i].toLowerCase();
		trie.add(dictionary[i].toLowerCase());
	}

	//adding the empty array with falses so that we can check what tile was used
	for (x = 0; x < grid.length; x++) {
		let arr = new Array(grid.length);
		arr.fill(false);
		usedcoord.push(arr);
	}

	//going through every letter in the grid
	for (x = 0; x < grid.length; x++) {
		for (y = 0; y < grid.length; y++) {
			if (grid[x][y] === "") {
				return [];
			}
			if (grid[x][y][0].toLowerCase() === "q") {
				if (
					grid[x][y].toLowerCase() === "q" ||
					grid[x][y][1].toLowerCase() !== "u"
				) {
					return [];
				}
			}
			search(grid, trie, x, y, emptystring, solutions, usedcoord, dictionary);
		}
	}
	return solutions;
};

