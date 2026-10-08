import { useMemo, useState } from "react";

const NAV = ["Overview", "Orders", "Customers", "Reports"];

const ORDERS = [
  { id: "#1042", customer: "Aarav Sharma", amount: 18400, status: "Paid" },
  { id: "#1041", customer: "Maya Patel", amount: 12600, status: "Pending" },
  { id: "#1040", customer: "Noah Wilson", amount: 8900, status: "Refunded" },
  { id: "#1039", customer: "Isha Rao", amount: 22100, status: "Paid" },
];

const REVENUE={
    "7D": [42, 55, 48, 63, 71, 66, 82],
    "30D": [30, 34, 41, 38, 45, 52, 49, 58, 55, 61, 67, 64, 70, 66, 73, 78, 74, 81, 85, 79, 88, 92, 87, 95, 99, 94, 102, 108, 104, 112],
    "90D": Array.from({ length: 30 }, (_, i) => 40 + i * 2.4 + Math.sin(i / 2) * 9),
};

const STATS=[
  { label: "Revenue", value: "$12,345", change: "+5.2%", up:true},
  { label:"Orders",value:"1,234",change: "+3.1%",up:true},
  { label:"New customers",value:"567",change:"-1.8%",up:false},
  { label:"Refunds",value:"$1,234",change:"+2.5%",up:true},
];

function LineChart({data}){
    const W = 640, H = 220, P = 24;
    const max = Math.max(...data), min = Math.min(...data);
    const x = (i) => P + (i * (W - P * 2)) / (data.length - 1);
    const y = (v) => H - P - ((v - min) / (max - min || 1)) * (H - P * 2);
    const line = data.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");
    const area = `${line} L${x(data.length - 1)},${H - P} L${x(0)},${H - P} Z`;

    return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart" role="img" aria-label="Revenue trend">
      {[0, 1, 2, 3].map((n) => (
        <line key={n} x1={P} x2={W - P} y1={P + (n * (H - P * 2)) / 3} y2={P + (n * (H - P * 2)) / 3} className="grid" />
      ))}
      <path d={area} className="area" />
      <path d={line} className="line" />
      <circle cx={x(data.length - 1)} cy={y(data[data.length - 1])} r="5" className="dot" />
    </svg>
  );
}
    export default function Dashboard(){
        const [active,setActive] = useState("Overview");
        const [range,setRange] = useState("30D");
      const [query, setQuery]=useState("");

         const rows = useMemo(() =>ORDERS.filter((o) =>
        (o.customer + o.id + o.status).toLowerCase().includes(query.toLowerCase())),[query]);

        const downloadReport = async () => {
          const { jsPDF } = await import("jspdf");
          const report = new jsPDF();
          const pageWidth = report.internal.pageSize.getWidth();
          const pageHeight = report.internal.pageSize.getHeight();
          const generatedAt = new Date();
          const fileDate = generatedAt.toISOString().slice(0, 10);

          report.setFillColor(29, 107, 88);
          report.rect(0, 0, pageWidth, 34, "F");
          report.setTextColor(255, 255, 255);
          report.setFontSize(20);
          report.text("Dashboard report", 14, 17);
          report.setFontSize(10);
          report.text(`Generated ${generatedAt.toLocaleString()}`, 14, 26);

          report.setTextColor(23, 48, 42);
          report.setFontSize(13);
          report.text("Performance summary", 14, 47);
          report.setFontSize(10);
          STATS.forEach((stat, index) => {
            const column = index % 2;
            const row = Math.floor(index / 2);
            const x = 14 + column * 90;
            const y = 59 + row * 18;
            report.setTextColor(106, 124, 118);
            report.text(stat.label, x, y);
            report.setTextColor(23, 48, 42);
            report.setFont("helvetica", "bold");
            report.text(`${stat.value} (${stat.change})`, x, y + 6);
            report.setFont("helvetica", "normal");
          });

          const revenue = REVENUE[range];
          report.setFontSize(13);
          report.text("Revenue trend", 14, 105);
          report.setFontSize(10);
          report.text(
            `${range} range | ${revenue.length} data points | Start: ${revenue[0]} | Latest: ${revenue[revenue.length - 1]}`,
            14,
            113,
          );

          report.setFontSize(13);
          report.text("Recent orders", 14, 130);
          const drawTableHeader = (y) => {
            report.setFillColor(217, 236, 230);
            report.rect(14, y - 5, pageWidth - 28, 10, "F");
            report.setFont("helvetica", "bold");
            report.setFontSize(9);
            report.text("Order", 17, y + 1);
            report.text("Customer", 48, y + 1);
            report.text("Amount", 128, y + 1);
            report.text("Status", 166, y + 1);
            report.setFont("helvetica", "normal");
          };

          let tableY = 141;
          drawTableHeader(tableY);
          tableY += 12;
          if (rows.length === 0) {
            report.text("No orders match the current search.", 17, tableY);
          }
          rows.forEach((order) => {
            if (tableY > pageHeight - 16) {
              report.addPage();
              tableY = 20;
              drawTableHeader(tableY);
              tableY += 12;
            }
            report.setFontSize(9);
            report.text(order.id, 17, tableY);
            report.text(order.customer, 48, tableY);
            report.text(`INR ${order.amount.toLocaleString("en-IN")}`, 128, tableY);
            report.text(order.status, 166, tableY);
            report.setDrawColor(221, 228, 225);
            report.line(14, tableY + 4, pageWidth - 14, tableY + 4);
            tableY += 12;
          });

          report.save(`dashboard-report-${fileDate}.pdf`);
        };

         return(
            <div className="dash">
                <aside className='side'>
                    <div className='brand'>Shopboard</div>
                    <nav>
                        {NAV.map((item)=>(<button key={item} className={item===active?"nav on":"nav"} onClick={()=>setActive(item)}>{item}</button>))  }
                    </nav>
                </aside>
                 <main className="main">
        <header className="top">
          <div>
            <h1>{active}</h1>
            <p className="sub">Here is how your store is doing.</p>
          </div>
          <button className="primary" onClick={downloadReport}>
            Download report
          </button>
        </header>
 
        <section className="stats">
          {STATS.map((s) => (
              <div className="card stat" key={s.label}>
              <span className="muted">{s.label}</span>
              <strong>{s.value}</strong>
              <span className={s.up ? "chip up" : "chip down"}>{s.change}</span>
            </div>
          ))}
        </section>
 
        <section className="card">
          <div className="row">
            <h2>Revenue</h2>
            <div className="seg">
              {Object.keys(REVENUE).map((r) => (
                <button key={r} className={r === range ? "on" : ""} onClick={() => setRange(r)}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <LineChart data={REVENUE[range]} />
        </section>
 
        <section className="card">
          <div className="row">
            <h2>Recent orders</h2>
            <input
              placeholder="Search orders"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search orders"
            />
          </div>
          <div className="scroll">
            <table>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((o) => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.customer}</td>
                    <td>₹{o.amount.toLocaleString("en-IN")}</td>
                    <td>
                      <span className={`tag ${o.status.toLowerCase()}`}>{o.status}</span>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan="4" className="muted">No orders match "{query}". Try a different name or ID.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
     </div>
    );

} 