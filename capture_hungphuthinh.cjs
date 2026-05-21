const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");

const BASE_URL = "https://hungphuthinh.vn";
const OUT_DIR = path.join(process.cwd(), "screenshots-hungphuthinh");
const CHUNK_OUT_DIR = path.join(process.cwd(), "screenshots-hungphuthinh-scroll");
const CHROME =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
const ONLY = process.env.ONLY || "";
const CHUNKS = process.env.CHUNKS === "1";

const MODES = {
  desktop: { width: 1440, height: 900, scale: 1, mobile: false },
  mobile: { width: 390, height: 844, scale: 2, mobile: true },
};

const TASKS = [
  {
    name: "01-home-desktop-top",
    url: `${BASE_URL}/`,
    mode: "desktop",
    shot: "viewport",
  },
  {
    name: "02-home-desktop-full",
    url: `${BASE_URL}/`,
    mode: "desktop",
    shot: "full",
  },
  {
    name: "03-home-desktop-menu-bao-gia",
    url: `${BASE_URL}/`,
    mode: "desktop",
    shot: "viewport",
    hoverText: "Bao gia",
  },
  {
    name: "04-home-mobile-top",
    url: `${BASE_URL}/`,
    mode: "mobile",
    shot: "viewport",
  },
  {
    name: "05-home-mobile-menu",
    url: `${BASE_URL}/`,
    mode: "mobile",
    shot: "viewport",
    openMobileMenu: true,
  },
  {
    name: "06-gioi-thieu-full",
    url: `${BASE_URL}/gioi-thieu`,
    mode: "desktop",
    shot: "full",
  },
  {
    name: "07-bao-gia-xay-nha-tron-goi-full",
    url: `${BASE_URL}/bao-gia-xay-nha-tron-goi`,
    mode: "desktop",
    shot: "full",
  },
  {
    name: "08-bao-gia-thiet-ke-nha-dep-full",
    url: `${BASE_URL}/bao-gia-thiet-ke-nha-dep`,
    mode: "desktop",
    shot: "full",
  },
  {
    name: "09-du-an-list-full",
    url: `${BASE_URL}/du-an`,
    mode: "desktop",
    shot: "full",
  },
  {
    name: "10-du-an-detail-full",
    url: `${BASE_URL}/biet-thu-2-tang-mai-nhat-hien-dai`,
    mode: "desktop",
    shot: "full",
  },
  {
    name: "11-cong-trinh-dang-thi-cong-full",
    url: `${BASE_URL}/cong-trinh-dang-thi-cong`,
    mode: "desktop",
    shot: "full",
  },
  {
    name: "12-thiet-ke-nha-dep-full",
    url: `${BASE_URL}/thiet-ke-nha-dep`,
    mode: "desktop",
    shot: "full",
  },
  {
    name: "13-tin-tuc-list-full",
    url: `${BASE_URL}/tin-tuc`,
    mode: "desktop",
    shot: "full",
  },
  {
    name: "14-blog-detail-full",
    url: `${BASE_URL}/chi-phi-xay-nha-cap-4-3-phong-ngu`,
    mode: "desktop",
    shot: "full",
  },
  {
    name: "15-lien-he-full",
    url: `${BASE_URL}/lien-he`,
    mode: "desktop",
    shot: "full",
  },
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForJson(url, timeoutMs = 15000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return await res.json();
    } catch (_) {
      // Chrome may still be booting.
    }
    await sleep(250);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

class CDP {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.seq = 0;
    this.pending = new Map();
    this.waiters = [];
  }

  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    this.ws.addEventListener("message", (event) => this.onMessage(event));
    await new Promise((resolve, reject) => {
      this.ws.addEventListener("open", resolve, { once: true });
      this.ws.addEventListener("error", reject, { once: true });
    });
  }

  onMessage(event) {
    const msg = JSON.parse(event.data);
    if (msg.id && this.pending.has(msg.id)) {
      const { resolve, reject, timer } = this.pending.get(msg.id);
      clearTimeout(timer);
      this.pending.delete(msg.id);
      if (msg.error) reject(new Error(msg.error.message));
      else resolve(msg.result || {});
      return;
    }
    if (!msg.method) return;
    const remaining = [];
    for (const waiter of this.waiters) {
      if (waiter.method === msg.method) {
        clearTimeout(waiter.timer);
        waiter.resolve(msg.params || {});
      } else {
        remaining.push(waiter);
      }
    }
    this.waiters = remaining;
  }

  send(method, params = {}, timeoutMs = 45000) {
    const id = ++this.seq;
    const payload = JSON.stringify({ id, method, params });
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`CDP timeout: ${method}`));
      }, timeoutMs);
      this.pending.set(id, { resolve, reject, timer });
      this.ws.send(payload);
    });
  }

  waitEvent(method, timeoutMs = 15000) {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        this.waiters = this.waiters.filter((w) => w.resolve !== resolve);
        resolve(null);
      }, timeoutMs);
      this.waiters.push({ method, resolve, timer });
    });
  }

  close() {
    this.ws.close();
  }
}

function normalizeExpr(value) {
  return JSON.stringify(value)
    .replace(/Bao/g, "B[áaảãạàằắẳẵặầấẩẫậ]")
    .replace(/gia/g, "gi[áaảãạàằắẳẵặầấẩẫậ]");
}

async function preparePage(client, mode) {
  const metrics = MODES[mode];
  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await client.send("Network.enable");
  await client.send("Network.setUserAgentOverride", { userAgent: USER_AGENT });
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: metrics.width,
    height: metrics.height,
    deviceScaleFactor: metrics.scale,
    mobile: metrics.mobile,
  });
  await client.send("Emulation.setTouchEmulationEnabled", {
    enabled: metrics.mobile,
  });
}

async function navigate(client, url) {
  const waitLoad = client.waitEvent("Page.loadEventFired", 20000);
  await client.send("Page.navigate", { url });
  await waitLoad;
  await sleep(1200);
  await client.send(
    "Runtime.evaluate",
    {
      awaitPromise: true,
      expression: `
        new Promise((resolve) => {
          const style = document.createElement('style');
          style.textContent = '.loader-wrap,.preloader,.dv-popup-new{display:none!important}';
          document.head.appendChild(style);
          window.scrollTo(0, 0);
          setTimeout(resolve, 300);
        })
      `,
    },
    15000
  );
}

async function lazyLoadPage(client) {
  await client.send(
    "Runtime.evaluate",
    {
      awaitPromise: true,
      expression: `
        new Promise((resolve) => {
          let y = 0;
          const step = Math.max(500, Math.round(window.innerHeight * 0.8));
          const max = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
          const tick = () => {
            window.scrollTo(0, y);
            y += step;
            if (y < max + step) {
              setTimeout(tick, 180);
            } else {
              window.scrollTo(0, 0);
              setTimeout(resolve, 900);
            }
          };
          tick();
        })
      `,
    },
    90000
  );
}

async function hoverText(client, text) {
  const expr = `
    (function() {
      const pattern = new RegExp(${normalizeExpr(text)}, 'i');
      const normalize = (s) => (s || '').replace(/\\s+/g, ' ').trim();
      const els = Array.from(document.querySelectorAll('a'));
      for (const el of els) {
        if (!pattern.test(normalize(el.textContent))) continue;
        const rect = el.getBoundingClientRect();
        const style = getComputedStyle(el);
        if (rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none') {
          return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        }
      }
      return null;
    })()
  `;
  const result = await client.send("Runtime.evaluate", {
    expression: expr,
    returnByValue: true,
  });
  const point = result.result && result.result.value;
  if (!point) return;
  await client.send("Input.dispatchMouseEvent", {
    type: "mouseMoved",
    x: point.x,
    y: point.y,
  });
  await client.send("Runtime.evaluate", {
    expression: `
      (function() {
        const strip = (s) => (s || '')
          .normalize('NFD')
          .replace(/[\\u0300-\\u036f]/g, '')
          .replace(/\\s+/g, ' ')
          .trim()
          .toLowerCase();
        const wanted = strip(${JSON.stringify(text)});
        const links = Array.from(document.querySelectorAll('.menu > li > a'));
        for (const link of links) {
          const rect = link.getBoundingClientRect();
          if (rect.width <= 0 || rect.height <= 0) continue;
          if (!strip(link.textContent).includes(wanted)) continue;
          const li = link.parentElement;
          const submenu = Array.from(li.children).find((child) => child.tagName === 'UL');
          if (!submenu) return false;
          link.style.background = '#f89520';
          link.style.color = '#fff';
          submenu.style.opacity = '1';
          submenu.style.visibility = 'visible';
          submenu.style.transform = 'none';
          submenu.style.webkitTransform = 'none';
          submenu.style.zIndex = '9999';
          return true;
        }
        return false;
      })()
    `,
  });
  await sleep(700);
}

async function openMobileMenu(client) {
  const result = await client.send("Runtime.evaluate", {
    expression: `
      (function() {
        const el = document.querySelector('.menu-bar a, a[href="#nav-mobile"]');
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      })()
    `,
    returnByValue: true,
  });
  const point = result.result && result.result.value;
  if (!point) return;
  await client.send("Input.dispatchMouseEvent", {
    type: "mousePressed",
    x: point.x,
    y: point.y,
    button: "left",
    clickCount: 1,
  });
  await client.send("Input.dispatchMouseEvent", {
    type: "mouseReleased",
    x: point.x,
    y: point.y,
    button: "left",
    clickCount: 1,
  });
  await sleep(1000);
}

async function capture(client, filePath, shot, mode) {
  const metrics = MODES[mode];
  let params = { format: "png", fromSurface: true };
  if (shot === "full") {
    const layout = await client.send("Page.getLayoutMetrics");
    const content = layout.cssContentSize || layout.contentSize;
    const maxHeight = 18000;
    params = {
      ...params,
      captureBeyondViewport: true,
      clip: {
        x: 0,
        y: 0,
        width: Math.ceil(Math.min(content.width, metrics.width)),
        height: Math.ceil(Math.min(content.height, maxHeight)),
        scale: 1,
      },
    };
  }
  const result = await client.send("Page.captureScreenshot", params, 90000);
  fs.writeFileSync(filePath, Buffer.from(result.data, "base64"));
}

async function captureScrollChunks(client, task, outDir) {
  const folder = path.join(outDir, task.name);
  fs.mkdirSync(folder, { recursive: true });
  const metrics = MODES[task.mode];
  const layout = await client.send("Page.getLayoutMetrics");
  const content = layout.cssContentSize || layout.contentSize;
  const totalHeight = Math.ceil(content.height);
  const viewportHeight = metrics.height;
  const positions = [];
  for (let y = 0; y < totalHeight; y += viewportHeight) {
    positions.push(y);
  }
  const lastY = Math.max(0, totalHeight - viewportHeight);
  if (!positions.includes(lastY)) positions.push(lastY);

  const uniquePositions = Array.from(new Set(positions)).sort((a, b) => a - b);
  let index = 1;
  for (const y of uniquePositions) {
    await client.send("Runtime.evaluate", {
      expression: `window.scrollTo(0, ${y});`,
    });
    await sleep(350);
    const result = await client.send(
      "Page.captureScreenshot",
      { format: "png", fromSurface: true },
      45000
    );
    const file = path.join(folder, `part-${String(index).padStart(2, "0")}.png`);
    fs.writeFileSync(file, Buffer.from(result.data, "base64"));
    index += 1;
  }
  await client.send("Runtime.evaluate", { expression: "window.scrollTo(0, 0);" });
  return {
    folder: path.relative(process.cwd(), folder),
    parts: uniquePositions.length,
    height: totalHeight,
    viewport: `${metrics.width}x${metrics.height}`,
  };
}

async function main() {
  if (!fs.existsSync(CHROME)) {
    throw new Error(`Chrome not found: ${CHROME}`);
  }

  const targetDir = CHUNKS ? CHUNK_OUT_DIR : OUT_DIR;
  if (!ONLY) fs.rmSync(targetDir, { recursive: true, force: true });
  fs.mkdirSync(targetDir, { recursive: true });

  const port = 9300 + Math.floor(Math.random() * 500);
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "hpt-chrome-"));
  const chrome = spawn(
    CHROME,
    [
      "--headless=new",
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${profile}`,
      "--disable-background-networking",
      "--disable-default-apps",
      "--disable-extensions",
      "--disable-gpu",
      "--disable-popup-blocking",
      "--hide-scrollbars",
      "--no-first-run",
      "about:blank",
    ],
    { stdio: "ignore" }
  );

  const notes = [];
  try {
    await waitForJson(`http://127.0.0.1:${port}/json/version`);
    const tab = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, {
      method: "PUT",
    }).then((res) => res.json());
    const client = new CDP(tab.webSocketDebuggerUrl);
    await client.connect();

    const tasks = ONLY
      ? TASKS.filter((task) => task.name.includes(ONLY))
      : TASKS;
    for (const task of tasks) {
      const file = `${task.name}.png`;
      const out = path.join(targetDir, file);
      console.log(`Capturing ${CHUNKS ? "scroll chunks for " : ""}${file}`);
      await preparePage(client, task.mode);
      await navigate(client, task.url);
      await lazyLoadPage(client);
      if (task.hoverText) await hoverText(client, task.hoverText);
      if (task.openMobileMenu) await openMobileMenu(client);
      let chunkInfo = null;
      if (CHUNKS) {
        chunkInfo = await captureScrollChunks(client, task, targetDir);
      } else {
        await capture(client, out, task.shot, task.mode);
      }
      const title = await client.send("Runtime.evaluate", {
        expression: "document.title",
        returnByValue: true,
      });
      notes.push({
        file: CHUNKS ? chunkInfo.folder : file,
        url: task.url,
        mode: task.mode,
        shot: CHUNKS
          ? `${chunkInfo.parts} parts, page height ${chunkInfo.height}px, viewport ${chunkInfo.viewport}`
          : task.shot,
        title: title.result ? title.result.value : "",
      });
    }

    client.close();
  } finally {
    try {
      chrome.kill();
    } catch (_) {
      // Ignore cleanup races.
    }
    await Promise.race([
      new Promise((resolve) => chrome.once("exit", resolve)),
      sleep(2000),
    ]);
    try {
      fs.rmSync(profile, { recursive: true, force: true });
    } catch (_) {
      // Windows may keep Chrome profile locks for a moment after exit.
    }
  }

  const md = [
    "# Hung Phu Thinh screenshot set",
    "",
    `Captured from ${BASE_URL}/`,
    "",
    "| File | Mode | Type | Source | Page title |",
    "| --- | --- | --- | --- | --- |",
    ...notes.map(
      (n) =>
        `| ${n.file} | ${n.mode} | ${n.shot} | ${n.url} | ${(n.title || "").replace(/\|/g, "/")} |`
    ),
    "",
    "Suggested demo mapping:",
    "- Use home/top, menu, and mobile shots for header/navigation/responsive reference.",
    "- Use quote pages for service pricing and long-form SEO content structure.",
    "- Use project list/detail pages for portfolio, gallery, and project taxonomy.",
    "- Use news list/detail pages for blog SEO and internal-link content patterns.",
    "- Use contact page for lead form, map/contact block, hotline/Zalo/social CTA.",
    "",
  ].join("\n");
  fs.writeFileSync(path.join(targetDir, "README.md"), md, "utf8");

  console.log(`Done: ${targetDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
