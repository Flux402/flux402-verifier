import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { Connection, PublicKey } from "@solana/web3.js";

const app = express();
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ ok: true }));

// Minimal verifier: demo-first, with a sketch for real chain checks.
app.get("/verify", async (req, res) => {
  const ref = String(req.query.ref || "");
  if (!ref) return res.status(400).json({ error: "missing_ref" });

  // DEMO shortcuts so Gateway works out of the box:
  if ((process.env.ENABLE_DEMO || "true") === "true") {
    if (ref === "DEMO") return res.json({ ok: true, txid: "demo-tx" });
    if (ref.startsWith("PEND")) return res.status(409).json({ ok: false, state: "pending" });
    if (ref.startsWith("FAIL")) return res.status(404).json({ ok: false, state: "not_found" });
  }

  // --- Real verification sketch (fill with your treasury/mint/amount policy) ---
  try {
    const rpc = process.env.SOLANA_RPC || "https://api.devnet.solana.com";
    const connection = new Connection(rpc, "finalized");

    // Example approach:
    // 1) Search recent signatures for the treasury address
    // 2) Load transactions; check memo/log contains 'ref'
    // 3) Verify SPL transfer to treasury with required mint and amount

    // NOTE: left as TODO to keep MVP lightweight.
    return res.status(404).json({ ok: false, state: "not_found" });
  } catch (e) {
    return res.status(503).json({ error: "rpc_unavailable" });
  }
});

const port = Number(process.env.PORT || 8788);
app.listen(port, () => {
  console.log(`[flux402-verifier] listening on :${port}`);
});
