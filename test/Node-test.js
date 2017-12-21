const { expect } = require('chai')
const Node = require('../lib/Node.js')

describe('NODE', () => {
  let node;

  beforeEach(() => {
    node = new Node('b');
  });

  it('should be able to hold a letter', () => {
    expect(node.letter).to.eq('b');
  });

  it('should not be a word end by default', () => {
    expect(node.wordEnd).to.eq(undefined);
  })

  it('should be able to connect another node in the children object', () => {
    node.children['r'] = new Node('r')
    expect(node.children['r'].letter).to.eq('r');
  });

  it('should be able to increment selectCount', () => {
    expect(node.selectCount).to.eq(0);
    node.selectCount++;
    expect(node.selectCount).to.eq(1);
  });

})