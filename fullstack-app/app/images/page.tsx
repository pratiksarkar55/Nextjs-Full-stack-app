interface Photo {
  id: number;
  title: string;
  url: string;
}

import Image from "next/image";
import ClientComponent from "./clientComponent";

export default function slowGallery() {
  async function handleServerAction(value: string) {
    "use server";

    const photos = Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      title: `Random Image ${i + 1}`,
      url: `https://picsum.photos/seed/${i}/600/400`,
    }));
    const filtered = photos.filter((p) =>
      p.title.toLowerCase().includes(value.toLowerCase())
    );

    const input = filtered.length > 0 ? filtered : photos;

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {input.map((photo) => (
          <div
            key={photo.id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              background: "white",
              boxShadow: "0 0 20px rgba(0,0,0,0.1)",
            }}
          >
            {/* ❌ Large, unoptimized images */}
            <Image src={photo.url} alt={photo.title} width={300} height={200} />
            <p>{photo.title}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1>Client → Server (no form)</h1>
      <ClientComponent serverAction={handleServerAction} />
    </div>
  );
}
