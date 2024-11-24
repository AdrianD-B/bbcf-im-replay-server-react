import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

import { styles } from "../styles";
import { characterKeys, characterArray } from "../constants";

const Home = () => {
  const [allReplays, setAllReplays] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [p1Name, setP1Name] = useState("");
  const [p2Name, setP2Name] = useState("");
  const [p1Char, setP1Char] = useState("");
  const [p2Char, setP2Char] = useState("");
  const [selectedOptionP1, setSelectedOptionP1] = useState("");
  const [selectedOptionP2, setSelectedOptionP2] = useState("");

  const fetchReplays = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/allreplays?page_num=${page}${p1Name != "" ? `&p1_name=${p1Name}` : ""}&p1_char=${p1Char}${p2Name != "" ? `&p2_name=${p2Name}` : ""}&p2_char=${p2Char}`
      );
      setAllReplays(response.data.replays);
    } catch (error) {
      console.log(error);
    }
  };

  /* const fetchPlayers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/allplayers`
      );
      setAllPlayers(response.data.players);
    } catch (error) {
      console.log(error);
    }
  }; */

  useEffect(() => {
    fetchReplays();
  }, [page,refresh]);

  /* useEffect(() => {
    fetchPlayers();
  }, []); */

  const p1HandleChange = (selected) => {
    setSelectedOptionP1(selected);
    setP1Char(selected.value.id)
  };
  const p2HandleChange = (selected) => {
    setSelectedOptionP2(selected);
    setP2Char(selected.value.id)
  };

  const characterOptions = characterArray.map((data) => ({
    value: data,
    label: (
      <div className="flex items-center">
        <img
          src={`/${data.name}.png`}
          alt={data.name}
          width={50}
          height={50}
          className="mr-1"
        />
        {data.name}
      </div>
    ),
  }));

  /* const playerOptions = allPlayers.map((data) => ({
    value: data,
    label: (
      <div className="flex items-center">
        <img
          src={`/${data.name}.png`}
          alt={data.name}
          width={50}
          height={50}
          className="mr-1"
        />
        {data}
      </div>
    ),
  })); */

  return (
    <section className="relative w-full h-screen mx-auto">
      <div className={`my-20 mx-auto w-full gap-5`}>
        <div className="flex flex-col items-center">
          <h1 className={`${styles.mainHeadText} text-white mt-2`}>
            Welcome to the BBCF IM Replay Database!
          </h1>
          <p className={`${styles.mainSubText} text-[#aaa6c3]`}>
            This listing shows all recent Blazblue games from the Improvement
            mod.
          </p>
          <div className="max-w-7xl min-h-32 p-7 my-5 gap-5 mx-auto flex rounded bg-blue-900">
            <div className="h-10 bg-blue-900">
              <h1 className="bg-blue-900 my-auto">Player1 Name</h1>
              <input onChange={(e) => setP1Name(e.target.value)} />
            </div>
            <div className="bg-transparent">
              <h1 className="bg-blue-900">Character</h1>
              <Select 
                options={characterOptions} 
                onChange={p1HandleChange}
                value={selectedOptionP1}
                className="w-48"
                styles={{singleValue: (provided) => ({
                  ...provided,
                  zIndex: "10",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }),}}
              />
            </div>
            <div className="h-10 bg-blue-900">
              <h1 className="bg-blue-900 my-auto">Player2 Name</h1>
              <input onChange={(e) => setP2Name(e.target.value)} />
            </div>
            <div className="bg-transparent">
              <h1 className="bg-blue-900">Character</h1>
              <Select 
                options={characterOptions} 
                onChange={p2HandleChange}
                value={selectedOptionP2}
                className="w-48"
                styles={{singleValue: (provided) => ({
                  ...provided,
                  zIndex: "10",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }),}}
              />
            </div>
            <button
              className="font-bold h-10 my-auto px-4 rounded bg-[#25282c] text-white hover:bg-tertiary"
              onClick={() => {page === 1 ? setRefresh(!refresh): setPage(1)}}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="max-w-7xl my-5 gap-5 mx-auto">
          <div
            className={` mx-auto w-1/4 h-20 flex flex-row gap-5 justify-center items-center`}
          >
            <button
              className="font-bold py-2 px-4 rounded bg-blue-900 text-white hover:bg-tertiary"
              onClick={() => (page === 1 ? null : setPage(page - 1))}
            >
              {"<"} Back
            </button>
            <button
              className="font-bold py-2 px-4 rounded bg-blue-900 text-white hover:bg-tertiary"
              onClick={() => setPage(page + 1)}
            >
              Next {">"}
            </button>
          </div>
          {allReplays.map((data) => (
            <div
              className={`m-10 p-5 flex flex-row gap-5 justify-between items-center rounded-[20px] result-gradient-${data.winner} drop-shadow-2xl`}
            >
              <div className="bg-inherit flex flex-row items-center">
                <img
                  src={`/${characterKeys[data.p1Toon]}.png`}
                  width={75}
                  height={75}
                  className="bg-transparent"
                />
                <p
                  className={`text-xs sm:text-xl px-5 text-white-100 capitalize font-bold bg-inherit`}
                >
                  {data.p1.toUpperCase()}
                  {data.winner === 0 ? "🏆" : null}
                </p>
              </div>
              <div className="bg-inherit flex flex-row justify-between items-center">
                <p
                  className={`text-xs px-5 sm:text-xl text-white-100 capitalize font-bold bg-inherit`}
                >
                  {data.p2.toUpperCase()}
                  {data.winner === 1 ? "🏆" : null}
                </p>
                <img
                  src={`/${characterKeys[data.p2Toon]}.png`}
                  width={75}
                  height={75}
                  className="bg-transparent"
                />
              </div>
            </div>
          ))}
          <div
            className={` mx-auto w-1/4 h-20 flex flex-row gap-5 justify-center items-center`}
          >
            <button
              className="font-bold py-2 px-4 rounded bg-blue-900 text-white hover:bg-tertiary"
              onClick={() => (page === 1 ? null : setPage(page - 1))}
            >
              {"<"} Back
            </button>
            <button
              className="font-bold py-2 px-4 rounded bg-blue-900 text-white hover:bg-tertiary"
              onClick={() => setPage(page + 1)}
            >
              Next {">"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
