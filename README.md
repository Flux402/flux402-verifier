# Flux402 Verifier (MVP)
Solana verification microservice. Ships with demo mode for instant end-to-end testing.
- `?ref=DEMO`     -> 200 { ok: true }
- `?ref=PEND...`  -> 409 pending
- `?ref=FAIL...`  -> 404 not_found

Implement real on-chain checks by scanning transfers to your treasury and matching `reference` in memo/logs.
