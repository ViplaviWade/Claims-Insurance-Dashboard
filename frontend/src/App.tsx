import { useState, useEffect } from "react";
import NewClaimDialog from "./components/NewClaimDialogBox";
import ClaimDrawer from "./components/ClaimDrawer";
import { listClaims, type Claim } from "../lib/api/api";

export default function App() {
  const [openNew, setOpenNew] = useState(false);
  const [claims, setClaims] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Claim | null>(null);

  useEffect(() => {
    async function fetchClaims() {
      try {
        const data = await listClaims();
        console.log("DATA: ", data);
        setClaims(data);
      } catch (err: any) {
        setError(err.message || "Failed to load claims");
      }
    }
    fetchClaims();
  }, []);

  const openClaims = claims.filter((c) => c.status === "Open").length;
  const inDocCollection = claims.filter((c) => c.stage === "DocumentCollection").length;
  const inSettlementOrClosure = claims.filter(
    (c) => c.stage === "Settlement" || c.stage === "PaymentProcessing" || c.stage === "CaseClosure"
  ).length;

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="brand-badge">IC</div>
          <div>
            <div className="brand-title">Claims</div>
            <div className="brand-sub">Data & Analytics</div>
          </div>
        </div>

        <nav className="nav">
          <a href="#">Dashboard</a>
          <a href="#">Claims</a>
          <a href="#">Analytics</a>
        </nav>

        <div className="sidebar-foot">© Viplavi Wade</div>
      </aside>

      {/* Main panel */}
      <div className="main">
        {/* Top header */}
        <div className="topbar">
          <div className="container topbar-inner">
            <div>
              <h1 className="title">Claims Dashboard</h1>
              <p className="subtitle">10-stage workflow • professional UI</p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-primary" onClick={() => setOpenNew(true)}>
                + New Claim
              </button>
              <button className="btn" title="Refresh">
                ⟳
              </button>
            </div>
          </div>
        </div>

        {/* Modal */}
        <NewClaimDialog open={openNew} onClose={() => setOpenNew(false)} />

        {/* Content */}
        <div className="container" style={{ padding: 24 }}>
          {/* KPI row */}
          <div className="kpi-row">
            <div className="kpi">
              <div className="label">Open claims</div>
              <div className="value mono">{openClaims}</div>
            </div>
            <div className="kpi">
              <div className="label">In document collection</div>
              <div className="value mono">{inDocCollection}</div>
            </div>
            <div className="kpi">
              <div className="label">In settlement / closure</div>
              <div className="value mono">{inSettlementOrClosure}</div>
            </div>
          </div>

          {/* Controls */}
          <div className="controls">
            <input className="input" style={{ width: 320 }} placeholder="Search by holder, policy #, …" />
            <select className="select">
              <option>All stages</option>
              <option>InitialFiling</option>
              <option>DocumentCollection</option>
              <option>Review</option>
              <option>Assessment</option>
              <option>Approval</option>
              <option>Negotiation</option>
              <option>Settlement</option>
              <option>PaymentProcessing</option>
              <option>QA</option>
              <option>CaseClosure</option>
            </select>
            <button className="btn">Refresh</button>
          </div>

          {/* Table */}
          <div className="card">
            <table className="table">
              <thead>
                <tr>
                  <th>POLICY HOLDER</th>
                  <th>POLICY #</th>
                  <th>STAGE</th>
                  <th>UPDATED</th>
                </tr>
              </thead>
              <tbody>
                {claims.length === 0 ? (
                  <tr>
                    <td className="table-empty" colSpan={4}>
                      No Records
                    </td>
                  </tr>
                ) : (
                  claims.map((claim) => (
                    <tr key={claim.id} onClick={() => setSelected(claim)} style={{ cursor: "pointer" }}>
                      <td>{claim.policy_holder}</td>
                      <td>{claim.policy_number}</td>
                      <td>{claim.stage}</td>
                      <td>
                        {claim.updated_at
                          ? new Date(
                              // ensure it parses even if the backend returns "YYYY-MM-DD HH:mm:ss+01"
                              String(claim.created_at).replace(" ", "T")
                            ).toLocaleString()
                          : "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Drawer */}
            {/* { selected && (

            )} */}

            <div className="card-footer text-sm">
              <button className="pill" disabled>
                Prev
              </button>
              <span>Page 1 / 1</span>
              <button className="pill" disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {selected && (
        <ClaimDrawer
          claim={selected}
          onClose={() => setSelected(null)}
          onChanged={(updated) => {
            setClaims((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
            setSelected(updated);
          }}
        />
      )}
    </div>
  );
}
