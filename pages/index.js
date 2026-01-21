import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt) return;

    setLoading(true);
    setImageUrl("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/generate-image`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        }
      );

      const data = await res.json();
      setImageUrl(data.image_url);
    } catch (err) {
      alert("Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Shamsart AI Studio</h1>

      <input
        type="text"
        placeholder="Prompt yaz..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <button onClick={generateImage} disabled={loading}>
        {loading ? "Oluşturuluyor..." : "Görsel Oluştur"}
      </button>

      {imageUrl && (
        <div style={{ marginTop: 20 }}>
          <img src={imageUrl} alt="Generated" width="512" />
        </div>
      )}
    </div>
  );
}
