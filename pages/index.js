export default function Home() {
  return (
    <main style={{ fontFamily: "Arial, sans-serif", padding: "40px" }}>
      <h1>Shamsart AI Studio</h1>
      <p>Backend bağlantı testi</p>

      <button
        onClick={async () => {
          const res = await fetch(
            "https://shamsart-backend.onrender.com"
          );
          const data = await res.json();
          alert(JSON.stringify(data, null, 2));
        }}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        Backend Test Et
      </button>
    </main>
  );
}
