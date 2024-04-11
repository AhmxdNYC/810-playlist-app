const Song = require("../model/Song")

/* 
These controllers take incoming requests and utilize the
methods provided by the Fellow "model" before sending a
response back to the client (or an error message).
*/

const serveSongs = (req, res) => {
  const songsList = Song.list()
  res.send(songsList)
}

const serveSong = (req, res) => {
  const { id } = req.params
  const song = Song.find(Number(id))

  if (!song) return res.status(404).send(`No song with the id ${id}`)
  res.send(song)
}

const createSong = (req, res) => {
  const { songName } = req.body // The POST request body will be an object: `{ fellowName: 'name' }`
  if (!songName) return res.status(400).send("Please provide a song name")
  const newSong = new Song(songName)
  res.send(newSong)
}

const updateSong = (req, res) => {
  const { songName } = req.body
  const { id } = req.params
  const updatedSong = Song.editName(Number(id), songName)
  // sendStatus sends just the status with no message body
  if (!updatedSong) return res.sendStatus(404)
  res.send(updatedSong)
}

const deleteSong = (req, res) => {
  const { id } = req.params
  const didDelete = Song.delete(Number(id))
  const statusCode = didDelete ? 204 : 404
  res.sendStatus(statusCode)
}

module.exports = {
  serveSongs,
  serveSong,
  createSong,
  updateSong,
  deleteSong,
}
