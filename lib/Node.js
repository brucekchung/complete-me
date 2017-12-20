
module.exports = class Node {
  constructor(letter) {
    this.letter = letter;
    this.children = {};
    this.endWord = null;
    this.selectCount = 0;
  }
}

