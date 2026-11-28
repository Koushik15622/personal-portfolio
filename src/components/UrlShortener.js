import { backendUrl } from "../backendUrl";
import { useState } from "react";
import { Files } from "react-bootstrap-icons";

export function UrlShortener() {
  const [url, setUrl] = useState("");
  const [suffix, setSuffix] = useState("");
  const [result, setResult] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setResult("");
    setMessage("");
    try {
      const response = await fetch(backendUrl("/api/links"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, suffix })
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.path) {
        setMessage(data?.error || "The shortener API returned an unexpected response.");
        return;
      }
      setResult(new URL(data.path, window.location.origin).href);
    } catch {
      setMessage("Could not reach the shortener API. Check the backend URL and connection.");
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
        <div className="short-field">
          <label htmlFor="destination">Destination URL</label>
          <input id="destination" type="url" required maxLength={4096} placeholder="https://example.com" value={url}
            disabled={busy} onChange={event => { setUrl(event.target.value); setResult(""); setMessage(""); }} />
        </div>
        <div className="short-field">
          <label htmlFor="suffix">Custom suffix <small>(optional)</small></label>
          <div className="suffix-input">
            <span aria-hidden="true">/s/</span>
            <input id="suffix" type="text" value={suffix} maxLength={64} pattern="[A-Za-z0-9_\-]{1,64}"
              title="Use letters, numbers, hyphens or underscores." placeholder="Auto-generate" autoCapitalize="none" spellCheck={false}
              disabled={busy} onChange={event => { setSuffix(event.target.value); setResult(""); setMessage(""); }} />
            <button type="submit" className="vvd" disabled={busy}>{busy ? "Creating..." : "Generate link"}</button>
          </div>
        </div>
      </form>
      <div aria-live="polite">
        {result && (
          <div className="short-result">
            <a href={result}>{result}</a>
            <button type="button" className="vvd" onClick={copy} aria-label="Copy link" title="Copy link">
              <Files size={18} aria-hidden="true" />
            </button>
          </div>
        )}
        {message && <p>{message}</p>}
      </div>
    </main>
  );
}
