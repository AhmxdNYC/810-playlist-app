const getId = require('../utils/getId');


/* 
This class provides an interface for managing Fellow data. 
Instances of this class can't do much really. They just store data.

The class itself provides static methods for CRUD actions on 
the collection of fellows.
*/
class Song {
  static #all = [];

  constructor(name) { // Create
    this.id = getId();
    this.name = name;

    Song.#all.push(this);
  }

  static list() { // Get all
    return Song.#all;
  }

  static find(id) { // Get one
    return Song.#all.find((song) => song.id === id);
  }

  static editName(id, newName) { // Update
    const song = Song.find(id);
    if (!song) return null;
    song.name = newName;
    return song;
  }

  static delete(id) { // Delete
    const songIndex = Song.#all.findIndex((song) => song.id === id);
    if (songIndex < 0) return null;

    Song.#all.splice(songIndex, 1);
    return true;
  }

  static deleteAll() { // Delete All
    if (!Song.#all.length) return null;

    Song.#all.length = 0;
    return Song.#all;
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

module.exports = Song;