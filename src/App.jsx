import { useState } from "react";
import "./App.css";
import logo from "./assets/img/logo.png";
import justfuku from "./assets/img/justfuku.png";

import { analyzeSlideUrl } from "./services/process";

function App() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState(null);

  function isValidGoogleSlidesUrl(url) {
    return /^https:\/\/docs\.google\.com\/presentation\/d\/[a-zA-Z0-9-_]+/.test(url);
  }

  async function handleAnalyze(e) {
    e.preventDefault();
    setErrorMsg("");
    setResult(null);

    const url = text.trim();

    if (!url) {
      setErrorMsg("Pega una URL primero.");
      return;
    }
    if (!isValidGoogleSlidesUrl(url)) {
      setErrorMsg("Esa no parece una URL válida de Google Slides.");
      return;
    }

    try {
      setIsLoading(true);
      const data = await analyzeSlideUrl(text.trim());
      setResult(data);
    } catch (err) {
      setErrorMsg(err?.message || "Ocurrió un error.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-6 w-full">
      <div className="w-full max-w-xl flex flex-col items-center gap-8 mt-32">
        <img src={logo} alt="Logo" className="w-12 mb-[20px] md:w-32" />

        {/* FORM para que Enter también ejecute */}
        <form
          onSubmit={handleAnalyze}
          className="relative z-10 flex h-full w-full items-center p-2 rounded-3xl border-2 bg-white"
        >
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Pega la URL de Google Sheets…"
            className="flex-1 h-full bg-transparent px-4 text-gray-800 placeholder:text-gray-500 outline-none"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="
              h-[40px] px-7 rounded-full
              bg-[#2E5BFF] text-white font-semibold transition
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            {isLoading ? "ANALIZANDO..." : "ANALIZAR"}
          </button>
        </form>

        <p className="text-sm text-gray-500">
          Pega la URL de tu presentación de Google y analízala en base a criterios de coherencia
        </p>

        {/* Errores */}
        {errorMsg && (
          <p className="w-full text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-xl p-3">
            {errorMsg}
          </p>
        )}

        {/* Resultado (debug) */}
        {result && (
          <pre className="w-full text-xs text-green-200 bg-green-950/30 border border-green-900 rounded-xl p-3 overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>

      <div className="mt-64 mb-8 text-white flex items-center gap-2">
        Hecho por <img src={justfuku} alt="Fuku" className="h-6 w-auto" />
      </div>
    </div>
  );
}

export default App;
