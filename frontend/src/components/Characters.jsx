import React, { useState, useEffect } from "react";
import axios from "axios";

import { BbcfRoster } from "../assets";
import { characterArray } from "../constants";
import { styles } from "../styles";

const Characters = () => {
  const [charSelect, setCharSelect] = useState();
  const [stats, setStats] = useState();

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/stats?char=${
          characterArray.find((obj) => obj.name === charSelect)?.id
        }`
      );
      setStats(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [charSelect]);

  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        id="charbg"
        style={{ backgroundImage: `url(/${charSelect}bg.png)` }}
        className={`absolute flex items-center flex-col py-20 mx-auto w-full bg-contain bg-no-repeat bg-fixed bg-left bg-blend-overlay`}
      >
        <BbcfRoster setCharSelect={setCharSelect} charSelect={charSelect} />
        <div className="flex rounded-lg items-center flex-col w-9/12 bg-gray-700/50 p-5">
          <div className="bg-transparent items-center flex flex-col">
            <h1 className={`${styles.mainHeadText} text-white mt-2 bg-inherit`}>
              Character Winrates
            </h1>
            <p className={`${styles.mainSubText} text-[#aaa6c3] bg-inherit`}>
              The winrates shown are for the characters listed vs the character
              you selected
            </p>
          </div>
          {stats
            ? stats.map((data, index) => (
                <div
                  className="flex items-center justify-between w-full bg-transparent"
                  key={index}
                >
                  <div className="flex flex-row items-center bg-inherit w-[100px]">
                    <img
                      src={`/${characterArray[data.character]?.name}.png`}
                      width={75}
                      height={75}
                      className="bg-transparent"
                    />
                    <p className="bg-transparent">
                      {characterArray[data.character]?.name}
                    </p>
                  </div>
                  <div
                    style={{
                      background: `linear-gradient(90deg,darkgreen 0%, darkgreen ${
                        data.wins + data.losses > 0
                          ? (data.wins / (data.wins + data.losses)) * 100
                          : 50
                      }%, darkred ${
                        data.wins + data.losses > 0
                          ? (data.wins / (data.wins + data.losses)) * 100
                          : 50
                      }%),darkred 100%`,
                    }}
                    className="p-3 w-[300px]"
                  />
                  <div className="bg-transparent min-w-[200px] flex flex-row items-center justify-between">
                    <p className="text-green-500 bg-inherit">{data.wins}</p>
                    <p className="text-red-500 bg-inherit">{data.losses}</p>
                    <p className="bg-inherit">{data.wins + data.losses}</p>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
    </section>
  );
};

export default Characters;
