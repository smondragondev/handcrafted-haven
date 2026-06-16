---
project: handcrafted-haven
status: active
last_worked: 2026-06-16
priority: high
---

## To do
<!-- states: [ ] = to do · [/] = in progress · [x] = done -->
- [x] Build session library (jose JWT cookie sessions)
- [x] Finish signup action (create session + redirect)
- [x] Add login action (validate, verify password, session, redirect)
- [x] Wire login page to the login action with error display
- [x] Polish signup/login UI and styling
- [ ] Add logout UI (logout action exists in auth.ts; wire to nav)
- [ ] Protect authenticated routes (e.g. /profile) via session check / middleware
- [ ] Fix pre-existing build error: src/app/lib/actions.ts imports 'vercel/blob' (should be '@vercel/blob')

## Next action
Wire the `logout` action into the navigation and gate /profile behind a session check.

## Blockers
none

## Recently done
- Completed login and signup pages: session creation, login action, validation, error UI, shared styling (2026-06-16)
