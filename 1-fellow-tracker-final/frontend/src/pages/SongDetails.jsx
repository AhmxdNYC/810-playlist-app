import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import fetchData from "../utils/fetchData";

const SongDetails = () => {
  const [song, setSong] = useState({});
  const [newSongName, setNewSongName] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const doFetch = async () => {
      try {
        const [data, error] = await fetchData(`/api/songs/${id}`);
        if (data) setSong(data);
      } catch (error) {
        console.log(error);
      }
    };
    doFetch();
  }, []);

  // The delete does actually work it's just very random
  // sometimes 1 click sometimes 2-3 might just be a lag issue
  // I'm not sure if window.confirm runs async or not from my code I
  // tried useEffect & state last commit and it still requires 2 clicks minimum
  // to activate let me know if you have any ideas on how to fix this !
  //
  const confirmAndDelete = async () => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this song?",
    );
    if (confirmDeletion) {
      await deleteSong();
    }
  };

  const deleteSong = async () => {
    try {
      const options = {
        method: "DELETE",
      };
      const [data, error] = await fetchData(`/api/songs/${id}`, options);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const changeSongName = async (e) => {
    e.preventDefault();
    if (!newSongName.trim()) {
      setError("Please enter a song name before submitting.");
      return;
    }
    try {
      const options = {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ songName: newSongName }),
      };
      const [data, error] = await fetchData(`/api/songs/${id}`, options);
      if (data) setSong(data);
    } catch (error) {
      console.log(error);
    }
    setNewSongName("");
  };

  return (
    <>
      <div className="flex flex-col gap-5 text-center">
        <h1 className="pt-10 text-purple-500">Song Details</h1>
        <p className="font-light">song name : {song.name}</p>
        <p className="font-light">num: {song.id}</p>
        <button onClick={confirmAndDelete} className="mx-auto w-[30%]">
          Delete Song
        </button>

        <form
          onSubmit={changeSongName}
          className="mx-auto flex w-[30%] flex-col gap-5"
        >
          <label htmlFor="name" className="font-light">
            Update Song Name
          </label>
          <input
            className="rounded-md border border-neutral-500"
            type="text"
            name="name"
            id="name"
            value={newSongName}
            onChange={(e) => {
              setNewSongName(e.target.value);
              setError(""); // clears when user starts typing
            }}
          />
          <button type="submit">Submit</button>
          {error && <p className="font-extrabold text-red-500">{error}</p>}
        </form>
        <Link to="/">
          <button>Go Home</button>
        </Link>
      </div>
    </>
  );
};

export default SongDetails;
