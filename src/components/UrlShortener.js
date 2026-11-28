import { useState } from "react";

export function UrlShortener() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setResult("");
    setMessage("");
    try {
      const response = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setResult(new URL(data.path, window.location.origin).href);
    } catch (error) {
      setMessage(error.message?.startsWith("Enter ") ? error.message : "Could not create a link. Please try again later.");
    } finally {
      setBusy(false);
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(result);
      setMessage("Copied to clipboard.");
    } catch {
      setMessage("Select the short link to copy it manually.");
    }
  }

  return (
    <main className="shortener">
      <a href="/#projects">Back to projects</a>
      <h1>URL shortener</h1>
      <form onSubmit={submit}>
        <label htmlFor="destination">Destination URL</label>
        <input id="destination" type="url" required maxLength={4096} placeholder="https://example.com" value={url}
          disabled={busy} onChange={event => { setUrl(event.target.value); setResult(""); setMessage(""); }} />
        <button className="vvd" disabled={busy}>{busy ? "Creating link..." : "Shorten URL"}</button>
      </form>
      <div aria-live="polite">
        {result && <div className="short-result"><a href={result}>{result}</a><button className="vvd" onClick={copy}>Copy link</button></div>}
        {message && <p>{message}</p>}
      </div>
    </main>
  );
}
