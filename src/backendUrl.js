const defaultOrigin = process.env.NODE_ENV === "development"
  ? "http://localhost:5001"
  : "https://personal-portfolio-7dt4.vercel.app";

export function backendUrl(path) {
  return new URL(path, process.env.REACT_APP_BACKEND_URL || defaultOrigin).href;
}
