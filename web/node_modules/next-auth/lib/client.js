"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchData = fetchData;
exports.apiBaseUrl = apiBaseUrl;
exports.now = now;
exports.BroadcastChannel = BroadcastChannel;

async function fetchData(path, __NEXTAUTH, logger, {
  ctx,
  req = ctx === null || ctx === void 0 ? void 0 : ctx.req
} = {}) {
  try {
    const options = req !== null && req !== void 0 && req.headers.cookie ? {
      headers: {
        cookie: req.headers.cookie
      }
    } : {};
    const res = await fetch(`${apiBaseUrl(__NEXTAUTH)}/${path}`, options);
    const data = await res.json();
    if (!res.ok) throw data;
    return Object.keys(data).length > 0 ? data : null;
  } catch (error) {
    logger.error("CLIENT_FETCH_ERROR", {
      error,
      path,
      ...(req ? {
        header: req.headers
      } : {})
    });
    return null;
  }
}

function apiBaseUrl(__NEXTAUTH) {
  if (typeof window === "undefined") {
    return `${__NEXTAUTH.baseUrlServer}${__NEXTAUTH.basePathServer}`;
  }

  return __NEXTAUTH.basePath;
}

function now() {
  return Math.floor(Date.now() / 1000);
}

function BroadcastChannel(name = "nextauth.message") {
  return {
    receive(onReceive) {
      const handler = event => {
        if (event.key !== name) return;
        const message = JSON.parse(event.newValue);
        if ((message === null || message === void 0 ? void 0 : message.event) !== "session" || !(message !== null && message !== void 0 && message.data)) return;
        onReceive(message);
      };

      window.addEventListener("storage", handler);
      return () => window.removeEventListener("storage", handler);
    },

    post(message) {
      if (typeof window === "undefined") return;
      localStorage.setItem(name, JSON.stringify({ ...message,
        timestamp: now()
      }));
    }

  };
}