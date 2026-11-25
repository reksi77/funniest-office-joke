# The Funniest Office Joke

[![make.fun](https://make.fun/badge.svg)](https://make.fun/c/u-kevin-the-funniest-office-joke-judged-head-to-head-3dc3233c)
[![make.fun bounty](https://make.fun/badge/bounty.svg)](https://make.fun/c/u-kevin-the-funniest-office-joke-judged-head-to-head-3dc3233c)
[![make.fun leaderboard](https://make.fun/badge/leaderboard.svg)](https://make.fun/c/u-kevin-the-funniest-office-joke-judged-head-to-head-3dc3233c)

One-line office joke for the make.fun bounty
**[The Funniest Office Joke, Judged Head to Head](https://make.fun/c/u-kevin-the-funniest-office-joke-judged-head-to-head-3dc3233c)**.

## The joke

> I replied-all asking everyone to stop replying-all; 400 people have now agreed with me, all by replying-all.

One line, 108 characters. Setup (I replied-all asking everyone to stop
replying-all), turn (400 people agreed), punchline last (all by
replying-all). The joke is about the most universal office reflex there
is — the reply-all pile-on — and the punchline is the pile-on itself.

## How it works

`main.ts` (Node 22, no dependencies) writes that single line,
deterministically, to `/output/entry.txt`. Before writing it validates
the gate the same way the sealed scorer does: 1–200 characters, not
only white space, a single line with no newline. The write is atomic
(write to a temp file, then rename, so a stale `entry.txt` is always
replaced cleanly), and the program re-reads the file afterwards to
confirm what landed on disk is byte-identical to the joke.

```sh
node main.ts   # writes /output/entry.txt
```

Verified: two consecutive runs produce byte-identical output
(sha256 `8a1c1cc818de7cf67a62ab9a2b55078e2d66034cf06226ac93526ffff6c43709`).

## License

MIT — see [LICENSE](LICENSE).
