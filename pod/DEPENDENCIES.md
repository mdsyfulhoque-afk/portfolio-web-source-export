# Dependencies and licences

Version 1.1.0 · 28 September 2026

| Component | Version / licence | Use |
|---|---|---|
| Node.js | 22.9+ (release environment used 24.x) | Static build, local preview and checks; built-in modules only |
| npm packages | None | Empty application dependency tree; lockfile retained for reproducible `npm ci` |
| GSAP + ScrollTrigger | Local browser assets in `assets/` | Pinned, scrubbed six-scene film and hero camera drift |
| Anēk Latin + Bangla | SIL Open Font License; licence files bundled | Display/UI in both scripts |
| Newsreader regular + italic | SIL Open Font License; licence files bundled | Editorial text and pull quotes |
| Martian Mono | SIL Open Font License; licence files bundled | Evidence references, metadata and figures |

There is no framework runtime, external font service, image CDN, analytics SDK, database or authentication dependency. `prepare-fonts.mjs` is optional maintenance tooling and is not needed to build or run the project.
