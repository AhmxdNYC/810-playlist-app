const getId = require("../utils/getId")

// the comments are useful and most likely better then
//what I would write so I just had to keep them lol

/* 
This class provides an interface for managing Fellow data. 
Instances of this class can't do much really. They just store data.

The class itself provides static methods for CRUD actions on 
the collection of fellows.
*/
class Song {
  static #all = []

  constructor(name) {
    // Create
    this.id = getId()
    this.name = name

    Song.#all.push(this)
  }

  static list() {
    // Get all
    return Song.#all
  }

  static find(id) {
    // Get one
    return Song.#all.find((song) => song.id === id)
  }

  static editName(id, newName) {
    // Update
    const song = Song.find(id)
    if (!song) return null
    song.name = newName
    return song
  }

  static delete(id) {
    // Delete
    const songIndex = Song.#all.findIndex((song) => song.id === id)
    if (songIndex < 0) return null

    Song.#all.splice(songIndex, 1)
    return true
  }

  static deleteAll() {
    // Delete All
    if (!Song.#all.length) return null

    Song.#all.length = 0
    return Song.#all
  }
}

const print = console.log()
/* 
Take a moment and play with these class methods. Try the following and
run this file with `node Song.js`:

const ben = new Song('ben');
const zo = new Song('zo');
const carmen = new Song('carmen');
const gonzalo = new Song('gonzalo');

print(Song.list())
print(Song.find(1))
print(Song.editName(1, 'ZO!!'))
print(Song.delete(2))
print(Song.list())
*/

module.exports = Song
