import React, { useState, useEffect } from "react";
import axios from "axios";

import { styles } from "../styles";
import { characterKeys } from "../constants";

const Home = () => {
  const [allReplays, setAllReplays] = useState([]);
  const [page, setPage] = useState(1);

  const fetchReplays = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/allreplays?page_num=${page}`
      );
      setAllReplays(response.data.replays);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReplays();
  }, [page]);

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
        </div>
        <div className="max-w-7xl my-20 gap-5 mx-auto">
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
                <p className={`text-xs sm:text-xl px-5 text-white-100 capitalize font-bold bg-inherit`}>
                  {data.p1.toUpperCase()}
                  {data.winner === 0 ? "🏆" : null}
                </p>
              </div>
              <div className="bg-inherit flex flex-row justify-between items-center">
                <p className={`text-xs px-5 sm:text-xl text-white-100 capitalize font-bold bg-inherit`}>
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
