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
    const lowerCase = word.toLowerCase();
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

    addWord(this, lowerCase);
  }

  getLastNode(string) {
    let currentNode = this.children[string[0]];
    let count = 0;

    while(count + 1 < string.length) {
      if(currentNode.letter !== string[count]) {
        return
      }
      currentNode = currentNode.children[string[count + 1]]
      count++;
    }

    return currentNode;
  }

  suggest(string) {
    const lastNode = this.getLastNode(string);
    const allWords = [];
    
    const getWord = (node, string) => {
      if(node.endWord) {
        allWords.push({word: string, count: node.selectCount});
      }
      const otherBranches = Object.keys(node.children);
      
      otherBranches.forEach((branch) => { 
        const newString = string + branch;
        getWord(node.children[branch], newString)
      })
    }

    getWord(lastNode, string);
    const sortedWords = this.sortSuggestions(allWords)

    return sortedWords;
  }

  select(string) {
    const lastNode = this.getLastNode(string);
    lastNode.selectCount++;
  }

  sortSuggestions(array) {
    array.sort((a, b) => b.count - a.count);

    return array.map(item => item.word)
  }

  delete(string) {
    const lastNode = this.getLastNode(string);
    this._count--;
    lastNode.endWord = null;
  }

  populate(array) {
    // const fs = require('fs');
    // const text = "/usr/share/dict/words";
    // const dictionary = fs.readFileSync(text).toString().trim().split('\n');
    array.forEach((word)=>{
      this.insert(word);
    });
  }

  // lastNode(word) {
  //   let currNode = this.children;

  //   word = word.split('');
  //   word.forEach( letter => currNode = currNode.children[letter]);
  //   return currNode;
  // }

}
