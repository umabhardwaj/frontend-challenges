document.findByClass = function (requiredClass) {
  //console.log(this);    -consoles HTMLDocument #document ,means this contains whole document
  const root = this.body; // conatins body from the document and use this body to traverse the whole dom

  function search(node) {
    let result = [];
    if (node.classList.contains(requiredClass)) {
      return node;
    }
    for (const element of node.children) {
      result = result.concat(serach(element));
    }
    return result;
  }
  return search(root);
};
