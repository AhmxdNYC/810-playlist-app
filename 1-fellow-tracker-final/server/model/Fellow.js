const getId = require('../utils/getId');


/* 
This class provides an interface for managing Fellow data. 
Instances of this class can't do much really. They just store data.

The class itself provides static methods for CRUD actions on 
the collection of fellows.
*/
class Fellow {
  static #all = [];

  constructor(name) { // Create
    this.id = getId();
    this.name = name;

    Fellow.#all.push(this);
  }

  static list() { // Get all
    return Fellow.#all;
  }

  static find(id) { // Get one
    return Fellow.#all.find((fellow) => fellow.id === id);
  }

  static editName(id, newName) { // Update
    const fellow = Fellow.find(id);
    if (!fellow) return null;
    fellow.name = newName;
    return fellow;
  }

  static delete(id) { // Delete
    const fellowIndex = Fellow.#all.findIndex((fellow) => fellow.id === id);
    if (fellowIndex < 0) return null;

    Fellow.#all.splice(fellowIndex, 1);
    return true;
  }

  static deleteAll() { // Delete All
    if (!Fellow.#all.length) return null;

    Fellow.#all.length = 0;
    return Fellow.#all;
  }
}

/* 
Take a moment and play with these class methods. Try the following and
run this file with `node Fellow.js`:

const ben = new Fellow('ben');
const zo = new Fellow('zo');
const carmen = new Fellow('carmen');
const gonzalo = new Fellow('gonzalo');

console.log(Fellow.list())
console.log(Fellow.find(1))
console.log(Fellow.editName(1, 'ZO!!'))
console.log(Fellow.delete(2))
console.log(Fellow.list())
*/

module.exports = Fellow;