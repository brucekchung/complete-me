const { expect } = require('chai')
const Trie = require('../lib/Trie.js')
const Node = require('../lib/Node.js')


describe('TRIE', () => {
  let trie;

  function populate() {
    const fs = require('fs');
    const text = "/usr/share/dict/words";
    const dictionary = fs.readFileSync(text).toString().trim().split('\n');
    dictionary.forEach((word)=>{
      trie.insert(word);
    });
  }

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
    expect(trie.count).to.eq(2);
  })

  it('should be able to count a lot of words', () => {
    expect(trie.count).to.eq(0);
    populate();
    expect(trie.count).to.eq(235886);
  })

  it('should insert a word into the tree', () => {
    const string = 'pie';
    trie.insert(string);
    expect(trie.children[string[0]].letter).to.eq('p')
    expect(trie.children[string[0]].children[string[1]].letter).to.eq('i')
    expect(trie.children[string[0]].children[string[1]].children[string[2]].letter).to.eq('e')
  })

  it('should should suggest words that complete it', () => {
    trie.insert('pineapple');
    trie.insert('pinecone');
    trie.insert('pinhead');

    const actual = trie.suggest('pine')
    const expected = [ 'pineapple', 'pinecone' ]

    expect(actual).to.deep.eq(expected)
  })

  it('should should suggest words from the dictionary', () => {
    populate();

    const actual = trie.suggest('charg')
    const expected = ['chargeless',
                      'charge',
                      'chargeable',
                      'chargeableness',
                      'chargeably',
                      'chargee',
                      'chargeability',
                      'chargeling',
                      'chargeman',
                      'charger',
                      'chargeship',
                      'charging']

    expect(actual).to.deep.eq(expected)
  })

  it('should should find words that have endings after returned words', () => {
    trie.insert('pineapple');
    trie.insert('pineapples');
    trie.insert('pinecone');
    trie.insert('pinecones');

    const actual = trie.suggest('pine')
    const expected = [ 'pineapple', 'pineapples', 'pinecone', 'pinecones' ]

    expect(actual).to.deep.eq(expected)
  })

  it('should should bump suggested words to the top of the list', () => {
    trie.insert('pineapple');
    trie.insert('pinecone');
    trie.insert('pinhead');

    let actual = trie.suggest('pin')
    let expected = [ 'pineapple', 'pinecone', 'pinhead' ]
    expect(actual).to.deep.eq(expected)

    trie.select('pinecone')
    actual = trie.suggest('pin');
    expected = [ 'pinecone', 'pineapple', 'pinhead' ]
    expect(actual).to.deep.eq(expected)
  })

  it('should should not return deleted words', () => {
    trie.insert('pineapple');
    trie.insert('pinecone');
    trie.insert('pinhead');

    let actual = trie.suggest('pin')
    let expected = [ 'pineapple', 'pinecone', 'pinhead' ]
    expect(actual).to.deep.eq(expected)

    trie.delete('pineapple')
    trie.delete('pinecone')
    actual = trie.suggest('pin')
    expected = [ 'pinhead' ]
    expect(actual).to.deep.eq(expected)
  })

  it('deleting words should decrement the count', () => {
    expect(trie.count).to.eq(0);
    trie.insert('pizza');
    trie.insert('apple');
    expect(trie.count).to.eq(2);

    trie.delete('pizza');
    expect(trie.count).to.eq(1);
  })

})


