import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fetchData from "../utils/fetchData";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [newSongName, setNewSongName] = useState("");
  const [newlyAddedSong, setNewlyAddedSong] = useState({});

  useEffect(() => {
    const doFetch = async () => {
      try {
        const [data, error] = await fetchData("/api/songs/");
        if (data) setSongs(data);
      } catch (error) {
        console.log(error);
      }
    };
    doFetch();
  }, [newlyAddedSong]);

  const createSong = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ songName: newSongName }),
      };
      const [data, error] = await fetchData(`/api/songs/`, options);
      if (data) setNewlyAddedSong(data);
    } catch (error) {
      console.log(error);
    }
    setNewSongName("");
  };

  return (
    <>
      <div className="flex flex-col gap-5 text-center">
        <h1 className="pt-10 text-purple-500">Home</h1>
        <form
          onSubmit={createSong}
          className="mx-auto flex w-[30%] flex-col gap-5"
        >
          <label
            htmlFor="name"
            className=" text-purple-500 underline underline-offset-8"
          >
            Add A New Song
          </label>
          <input
            className="rounded-md border border-neutral-500"
            type="text"
            name="name"
            id="name"
            value={newSongName}
            onChange={(e) => setNewSongName(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <h2 className=" text-center font-light text-purple-500 underline underline-offset-8">
          Songs
        </h2>
        {songs.length > 0 ? (
          <ul className="mx-auto flex flex-col gap-1 border border-neutral-500 p-7">
            {songs.map((song) => {
              return (
                <li className="w-full font-light" key={song.id}>
                  <Link to={`/songs/${song.id}`}>
                    {song.name} - {song.id}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="w-full text-center font-light">No songs yet</p>
        )}
      </div>
    </>
  );
};

export default Home;
