import { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const STORAGE_KEY = "vi_fp";

export function useFingerprint() {
  const [fingerprint, setFingerprint] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      // Check cache first
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        setFingerprint(cached);
        setIsLoading(false);
        return;
      }

      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        const visitorId = result.visitorId;
        localStorage.setItem(STORAGE_KEY, visitorId);
        setFingerprint(visitorId);
      } catch {
        // Fallback: generate a random ID
        const fallback = crypto.randomUUID();
        localStorage.setItem(STORAGE_KEY, fallback);
        setFingerprint(fallback);
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, []);

  return { fingerprint, isLoading };
}
