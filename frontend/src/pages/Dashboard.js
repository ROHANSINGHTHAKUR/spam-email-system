import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

function Dashboard() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const API = "http://127.0.0.1:8000";

  // 🚀 Predict Email
  const handlePredict = async () => {
    try {
      const res = await axios.post(`${API}/emails/predict`, {
        subject,
        body,
      });

      setResult(res.data);

      // refresh history after prediction
      await loadHistory();
    } catch (err) {
      console.log(err);
      alert("Backend error");
    }
  };

  // 📥 Load History
  const loadHistory = async () => {
    try {
      const res = await axios.get(`${API}/emails/history`);
      setHistory(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  // 📊 STATS (FIXED)
  const stats = useMemo(() => {
    const total = history.length;

    const spam = history.filter(
      (i) => i.prediction?.toLowerCase() === "spam"
    ).length;

    const safe = total - spam;

    const spamPercent = total ? ((spam / total) * 100).toFixed(2) : 0;

    return { total, spam, safe, spamPercent };
  }, [history]);

  // 🔍 FILTER + SEARCH (FIXED)
  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const subjectText = item.email_subject || "";

      const matchSearch = subjectText
        .toLowerCase()
        .includes(search.toLowerCase());

      const isSpam = item.prediction?.toLowerCase() === "spam";

      const matchFilter =
        filter === "ALL"
          ? true
          : filter === "SPAM"
          ? isSpam
          : !isSpam;

      return matchSearch && matchFilter;
    });
  }, [history, search, filter]);

  return (
    <div style={styles.page}>
      {/* 🌈 FLOATING BACKGROUND */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      {/* HEADER */}
      <div style={styles.header}>
        <h1>📧 Spam Email Detection Dashboard</h1>
        <p>AI-powered spam detection system</p>
      </div>

      {/* 📊 STATS */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>Total: {stats.total}</div>
        <div style={styles.statCard}>Spam: {stats.spam}</div>
        <div style={styles.statCard}>Safe: {stats.safe}</div>
        <div style={styles.statCard}>Spam %: {stats.spamPercent}%</div>
      </div>

      {/* INPUT */}
      <div style={styles.card}>
        <input
          style={styles.input}
          placeholder="Email Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <textarea
          style={styles.textarea}
          placeholder="Email Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <button style={styles.button} onClick={handlePredict}>
          Detect Email
        </button>
      </div>

      {/* RESULT */}
      {result && (
        <div style={styles.resultCard}>
          <h3>Result: {result.prediction}</h3>
          <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p>
        </div>
      )}

      {/* SEARCH + FILTER */}
      <div style={styles.filterBar}>
        <input
          style={styles.input}
          placeholder="Search by subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          style={styles.select}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="SPAM">Spam</option>
          <option value="SAFE">Safe</option>
        </select>
      </div>

      {/* HISTORY */}
      <div style={styles.card}>
        <h3>History</h3>

        {filteredHistory.map((item, i) => (
          <div key={i} style={styles.row}>
            <div>{item.email_subject?.slice(0, 30)}</div>

            <div
              style={{
                color:
                  item.prediction?.toLowerCase() === "spam"
                    ? "red"
                    : "lightgreen",
              }}
            >
              {item.prediction}
            </div>

            <div>{(item.confidence * 100).toFixed(2)}%</div>
          </div>
        ))}
      </div>

      {/* 🌈 FLOATING BACKGROUND CSS */}
      <style>{`
        .blob {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.35;
          animation: float 10s infinite ease-in-out;
          z-index: 0;
          pointer-events: none;
        }

        .blob1 { background: #4f46e5; top: 10%; left: 10%; }
        .blob2 { background: #06b6d4; top: 50%; right: 10%; }
        .blob3 { background: #f43f5e; bottom: 10%; left: 30%; }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(40px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  page: {
    minHeight: "100vh",
    padding: "20px",
    background: "#0f172a",
    color: "white",
    fontFamily: "Arial",
    position: "relative",
    overflow: "hidden",
  },

  header: {
    textAlign: "center",
    marginBottom: "20px",
    position: "relative",
    zIndex: 2,
  },

  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
    marginBottom: "20px",
    position: "relative",
    zIndex: 2,
  },

  statCard: {
    background: "rgba(255,255,255,0.08)",
    padding: "10px",
    borderRadius: "10px",
    textAlign: "center",
  },

  card: {
    background: "rgba(255,255,255,0.05)",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    position: "relative",
    zIndex: 2,
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
  },

  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
  },

  button: {
    width: "100%",
    padding: "10px",
    background: "linear-gradient(90deg,#4f46e5,#06b6d4)",
    color: "white",
    border: "none",
    borderRadius: "10px",
  },

  resultCard: {
    background: "rgba(255,255,255,0.1)",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
    position: "relative",
    zIndex: 2,
  },

  filterBar: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    position: "relative",
    zIndex: 2,
  },

  select: {
    padding: "10px",
    borderRadius: "8px",
  },

  row: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr",
    padding: "10px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
};

export default Dashboard;