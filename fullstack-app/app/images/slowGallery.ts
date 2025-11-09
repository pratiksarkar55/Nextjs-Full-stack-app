"use server";

export default async function showGallery(search: String) {
  const sendData = async () => {
    await fetch("/images", {
      method: "POST",
      body: JSON.stringify({ search }),
    });
  };
  return sendData;
}
