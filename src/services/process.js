// src/services/process.js

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

/**
 * Envía la URL de Google Slides a tu backend.
 * Backend espera: { slidesUrl: string }
 */
export async function analyzeSlideUrl(slidesUrl) {
    const res = await fetch(`${API_URL}/process`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slidesUrl }), // ✅ igual que tu curl
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Error HTTP ${res.status}`);
    }

    return res.json();
}
