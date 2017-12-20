const Node = require('./Node.js')

module.exports = class Trie {
  constructor() {
    this.children = {};
    this._count = 0;
  }

  get count() {
    return this._count;
  }

  insert(word) {
    const addWord = (node, string) => {
      const firstLetter = string[0];
      if (!node.children[firstLetter]) {
        node.children[firstLetter] = new Node(firstLetter);
        if (string.length === 1) {
          this._count++;
          node.children[firstLetter].endWord = 1;
        }
      }

      if (string.length > 1) {
        addWord(node.children[firstLetter], string.slice(1));
      }
    }
    addWord(this, word);
  }

  suggest(string) {
    let currentNode = this.children[string[0]];
    let count = 0;

    while(count + 1 < string.length) {
      if(currentNode.letter !== string[count]) {
        return
      }
      currentNode = currentNode.children[string[count + 1]]
      count++;
    }
    //have last node, part 2:
    const allWords = [];
    
    const getWord = (node, string) => {
      if(node.endWord) { // && !node.children
        allWords.push({word: string, count: node.selectCount});
        return
      }
      const otherBranches = Object.keys(node.children);
      
      otherBranches.forEach((branch) => { 
        const newString = string + branch;
        getWord(node.children[branch], newString)
      })
    }
    getWord(currentNode, string);
    const sortedWords = this.sortSuggestions(allWords)
    return sortedWords;
  }

  select(string) {
    let currentNode = this.children[string[0]];
    let count = 0;

    while(count + 1 < string.length) {
      if(currentNode.letter !== string[count]) {
        return
      }
      currentNode = currentNode.children[string[count + 1]]
      count++;
    }
    currentNode.selectCount++;
  }

  sortSuggestions(array) {
    array.sort((a, b) => b.count - a.count);
    return array.map(item => item.word)
  }

  delete(string) {
    let currentNode = this.children[string[0]];
    let count = 0;

    while(count + 1 < string.length) {
      if(currentNode.letter !== string[count]) {
        return
      }
      currentNode = currentNode.children[string[count + 1]]
      count++;
    }
    currentNode.endWord = null;
  }

}
