const { expect } = require('chai')
const Trie = require('../lib/Trie.js')
const Node = require('../lib/Node.js')
// import fs from 'fs';
// const text = "/usr/share/dict/words"
// const dictionary = fs.readFileSync(text).toString().trim().split('\n')
// const completion = new Trie()
// completion.populate(dictionary);

describe('Binary TRIE', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  it('should start with zero elements', () => {
    expect(trie.count).to.eq(0);
  });

  it('should be able to count words', () => {
    expect(trie.count).to.eq(0);
    trie.insert('pizza');
    trie.insert('apple');
    console.log(trie.children);
    console.log('keys', Object.keys(trie.children))
    expect(trie.count).to.eq(2);
  })

  it('should insert a word into the tree', () => {
    const string = 'pie';
    trie.insert(string);
    expect(trie.children[string[0]].letter).to.eq('p')
    expect(trie.children[string[0]].children[string[1]].letter).to.eq('i')
    expect(trie.children[string[0]].children[string[1]].children[string[2]].letter).to.eq('e')
  })

  it('should suggest existing words', () => {
    const expected = ['pineapple', 'pinecone', 'pinhead'];
    //const actual = trie.suggest('pin');

    trie.insert('pineapple');
    trie.insert('pinecone');
    trie.insert('pinhead');
    trie.insert('pizza');
    trie.select('pinhead');
    trie.suggest('pin');
    console.log(trie.suggest('pin'));
    //expect(actual).to.eq(expected);
  })



})


