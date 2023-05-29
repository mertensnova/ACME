export const API_URL =
   process.env.NODE_ENV == "production"
      ? "https://go-services.onrender.com"
      : "http://localhost:8080";
