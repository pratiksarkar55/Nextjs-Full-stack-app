"use client";
import { useEffect, useState } from "react";
import slowGallery from "./page";

const InputComp = () => {
  const [search, setSearch] = useState("");
  // ❌ Heavy computation on mount
  useEffect(() => {
    console.log("Simulating heavy computation...");
    const start = performance.now();
    while (performance.now() - start < 3000) {
      // 3 seconds CPU block 😬
      Math.sqrt(Math.random() * 9999999);
    }
    async function fetchUser() {
      await slowGallery("");
    }
    fetchUser();
  }, []);

  return (
    <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={async (e) => {
        setSearch(e.target.value);
        await slowGallery(e.target.value);
      }}
      style={{
        marginBottom: 20,
        padding: 10,
        width: "100%",
        fontSize: 18,
      }}
    />
  );
};

export default InputComp;
