import React, { useState } from "react";

import { BbcfRoster } from "../assets";

const Characters = () => {
  const [charSelect, setCharSelect] = useState(null);

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
