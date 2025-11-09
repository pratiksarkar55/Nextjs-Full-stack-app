//"use client";

//import { useState } from "react";

export default function Whatever() {
  //const [test, setTest] = useState<number>(0);

  return (
    <div>
      <button
        onClick={() => {
          //setTest(test + 1);
          console.log("test");
        }}
      >
        Click Me
      </button>
    </div>
  );
}
