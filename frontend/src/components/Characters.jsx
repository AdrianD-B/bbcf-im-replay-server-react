import React, { useState, useEffect } from "react";
import axios from "axios";

import { BbcfRoster } from "../assets";

const Characters = () => {
  const [charSelect, setCharSelect] = useState(null);
  const [stats, setStats] = useState(0)

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/stats?char=${stats}`
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
      fetchStats();
  }, []);

  return (
    <section className="relative w-full h-screen mx-auto" >
        <div
          id="charbg"
          style={{backgroundImage: `url(/${charSelect}bg.png)`}}
          className={`absolute h-screen flex items-center flex-col py-20 mx-auto w-full bg-contain bg-no-repeat bg-fixed bg-left bg-blend-overlay`}
        >
          <BbcfRoster setCharSelect={setCharSelect} charSelect={charSelect} />
      </div>
    </section>
  );
};

export default Characters;
