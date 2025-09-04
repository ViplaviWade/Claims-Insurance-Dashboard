import { useState } from "react";
import NewClaimDialog from "./components/NewClaimDialogBox";

export default function App() {
  const [openNew, setOpenNew] = useState(false);

  function handleCreate(data: { policy_holder: string; policy_number: string }) {
    // For now just log; later we’ll POST to backend and refresh list
    console.log("create claim:", data);
  }
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
        <NewClaimDialog open={openNew} onClose={() => setOpenNew(false)} onCreate={handleCreate} />

        {/* Content */}
        <div className="container" style={{ padding: 24 }}>
          {/* KPI row */}
          <div className="kpi-row">
            <div className="kpi">
              <div className="label">Open claims</div>
              <div className="value mono">0</div>
            </div>
            <div className="kpi">
              <div className="label">In document collection</div>
              <div className="value mono">0</div>
            </div>
            <div className="kpi">
              <div className="label">In settlement / closure</div>
              <div className="value mono">0</div>
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
                <tr>
                  <td className="table-empty" colSpan={4}>
                    No records
                  </td>
                </tr>
              </tbody>
            </table>

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
    </div>
  );
}
