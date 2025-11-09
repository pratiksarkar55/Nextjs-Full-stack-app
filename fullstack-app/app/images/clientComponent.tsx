"use client";

import { useEffect, useState, useTransition } from "react";

export default function ClientComponent({
  serverAction,
}: {
  serverAction: (value: string) => Promise<React.ReactNode>;
}) {
  const [search, setSearch] = useState("");
  const [serverHtml, setServerHtml] = useState<React.ReactNode>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function fetch() {
      const html = await serverAction("");
      setServerHtml(html);
    }
    fetch();
  }, []);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearch(value);

    // Call server action directly
    startTransition(async () => {
      const html = await serverAction(value);
      setServerHtml(html);
    });
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🖼️ Massive Unoptimized Gallery</h1>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleChange}
        style={{
          marginBottom: 20,
          padding: 10,
          width: "100%",
          fontSize: 18,
        }}
      />
      {isPending && <p>Loading...</p>}
      <div className="mt-4">{serverHtml}</div>
    </div>
  );
}
