export const API_URL =
  process.env.ENV !== "production"
    ? "http://localhost:8080"
    : "https://go-services.onrender.com";
