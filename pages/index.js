import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateImage = async () => {
    if (!prompt) return;

    setLoading(true);
    setError("");
    setImageUrl("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/generate-image`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        }
      );

      if (!res.ok) {
        throw new Error("Backend error");
      }

      const data = await res.json();
      setImageUrl(data.image_url);
    } catch (err) {
      setError("Bir hata oluştu, tekrar dene.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Shamsart AI Studio</h1>
      <p>Text → Image</p>

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Prompt gir..."
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <button onClick={generateImage} disabled={loading}>
        {loading ? "Üretiliyor..." : "Generate Image"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {imageUrl && (
        <div style={{ marginTop: 20 }}>
          <img src={imageUrl} alt="Generated" width={512} />
        </div>
      )}
    </main>
  );
}
