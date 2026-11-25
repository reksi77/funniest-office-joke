// The Funniest Office Joke, Judged Head to Head
// (make.fun — u-kevin-the-funniest-office-joke-judged-head-to-head-3dc3233c)
//
// Writes exactly one line — one office joke, setup then turn, punchline
// last — to /output/entry.txt. Deterministic: same input, same bytes,
// every run. No network, no randomness, no timestamps.

import { mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I replied-all asking everyone to stop replying-all; 400 people have now agreed with me, all by replying-all.";

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

// Gate the joke the same way the sealed scorer does: UTF-8 text of
// 1-200 characters, not only white space, a single line.
const chars = [...JOKE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`joke is ${chars.length} chars, must be 1-200`);
}
if (JOKE.trim().length === 0) {
  throw new Error("joke must not be only white space");
}
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  throw new Error("joke must be a single line with no newline");
}

mkdirSync(OUT_DIR, { recursive: true });
const tmp = join(OUT_DIR, `.entry.txt.tmp-${process.pid}`);
try {
  writeFileSync(tmp, JOKE, "utf8");
  renameSync(tmp, OUT_FILE);
} catch (err) {
  try {
    rmSync(tmp, { force: true });
  } catch {
    /* best effort cleanup */
  }
  throw err;
}

// Verify what landed on disk is byte-identical to what we meant to write.
const written = readFileSync(OUT_FILE, "utf8");
if (written !== JOKE) {
  throw new Error("entry.txt on disk does not match the joke");
}
console.log(`wrote ${chars.length} chars to ${OUT_FILE}`);
