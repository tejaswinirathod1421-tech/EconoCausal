import { useState } from "react";
import "./App.css";
import Plot from "react-plotly.js";

function App() {
const [file, setFile] = useState(null);
const [budget, setBudget] = useState("5000");
const [message, setMessage] = useState("");
const [page, setPage] = useState("setup");
function handleSubmit(event) {
event.preventDefault();
if (!file) {
  setMessage("Please upload a campaign CSV file.");
  return;
}
if (!budget || Number(budget) <= 0) {
  setMessage("Please enter a valid budget.");
  return;
}
setMessage(`Campaign file: ${file.name} | Budget: $${budget}`);
}
return (
<main className="dashboard">
<header className="header">
<h1>EconoCausal</h1>
<p>Dynamic Pricing via Causal AI</p>
</header>
  <nav className="navigation">
    <button 
      className={page === "setup" ? "active" : ""}
      onClick={() => setPage("setup")}
    >
      Campaign Setup
    </button>
    <button 
      className={page === "uplift" ? "active" : ""}
      onClick={() => setPage("uplift")}
    >
      Uplift Curves
    </button>
    <button 
      className={page === "allocation" ? "active" : ""}
      onClick={() => setPage("allocation")}
    >
      Allocation Matrix
    </button>
  </nav>
  {page === "setup" && (
    <section className="panel">
      <h2>Campaign Setup</h2>
      <p>Upload customer data and set your promotional budget.</p>
      <form onSubmit={handleSubmit}>
        <label>Historical Campaign Data (CSV)</label>
        <input
          type="file"
          accept=".csv,text/csv"
          onChange={(event) => {
            setFile(event.target.files[0] || null);
            setMessage("");
          }}
        />
        <label>Marketing Budget ($)</label>
        <input
          type="number"
          min="1"
          step="0.01"
          value={budget}
          onChange={(event) => setBudget(event.target.value)}
          required
        />
        <button type="submit">Prepare Campaign</button>
      </form>
      {message && <p className="message">{message}</p>}
    </section>
  )}
   {page === "uplift" && (

  <section className="panel">
    <h2>Uplift Curves</h2>
    <p>Illustrative customer response for different discount levels.</p><Plot
  data={[
    {
      x: [0, 10, 20],
      y: [20, 30, 43],
      type: "scatter",
      mode: "lines+markers",
      name: "Purchase response",
      line: { color: "#635bff", width: 3 },
      marker: { size: 9 },
    },
  ]}
  layout={{
    autosize: true,
    title: { text: "Discount vs Purchase Response" },
    xaxis: { title: "Discount (%)", dtick: 10 },
    yaxis: { title: "Illustrative response score" },
    margin: { l: 65, r: 25, t: 60, b: 60 },
    paper_bgcolor: "#ffffff",
    plot_bgcolor: "#ffffff",
  }}
  useResizeHandler={true}
  style={{ width: "100%", height: "380px" }}
  config={{ responsive: true, displayModeBar: false }}
/>
<p className="message">
  Note: Illustrative values only; these are not measured causal uplift estimates.
</p>

  </section>
)}
  {page === "allocation" && (
    <section className="panel">
      <h2>Allocation Matrix</h2>
      <p>Review how the promotional budget could be allocated.</p>
      <table>
        <thead>
          <tr>
            <th>Customer Group</th>
            <th>Discount</th>
            <th>Budget Share</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>High uplift</td>
            <td>20%</td>
            <td>60%</td>
          </tr>
          <tr>
            <td>Medium uplift</td>
            <td>10%</td>
            <td>30%</td>
          </tr>
          <tr>
            <td>Low uplift</td>
            <td>0%</td>
            <td>10%</td>
          </tr>
        </tbody>
      </table>
      <p className="message">
        Illustrative allocation only — not calculated from customer data.
      </p>
    </section>
  )}
  <footer>
    EconoCausal | Causal Inference &amp; Budget Planning
  </footer>
</main>
);
}

export default App;