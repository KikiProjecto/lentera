"use client";

import { useEffect, useState } from "react";

export function useServiceWorker() {
  const [isReady, setIsReady] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    const registerSW = async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });
        
        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                console.log("New content available, please refresh.");
              }
            });
          }
        });

        setRegistration(reg);
        setIsReady(true);
      } catch (err) {
        console.error("Service worker registration failed:", err);
        setError(err instanceof Error ? err.message : "Registration failed");
      }
    };

    registerSW();
  }, []);

  const update = async () => {
    if (registration) {
      await registration.update();
    }
  };

  return { isReady, registration, error, update };
}

export function useVisibilityChange() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isVisible;
}