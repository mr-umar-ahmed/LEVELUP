import "./Dashboard.css";
import { useEffect } from "react";
import Chart from "chart.js/auto";

function Dashboard() {
  useEffect(() => {
    const ctx = document.getElementById("lineChart");
    if (!ctx) return;

    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["2", "4", "6", "8", "10", "12", "14", "16", "18"],
        datasets: [
          {
            label: "Progress",
            data: [10, 12, 8, 14, 10, 18, 12, 14, 20],
            borderColor: "#00c3ff",
            backgroundColor: "rgba(0, 195, 255, 0.2)",
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "#00c3ff",
            pointRadius: 5,
          },
        ],
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          x: {
            grid: { color: "#445" },
            ticks: { color: "#ccc" },
          },
          y: {
            grid: { color: "#445" },
            ticks: { color: "#ccc" },
          },
        },
      },
    });
  }, []);

  return (
    <div className="dashboard-body">
      {/* === SIDEBAR === */}
      <div className="sidebar">
        <ul>
          <li onClick={() => (window.location.href = "/")}>
            <img src="https://img.icons8.com/ios-filled/24/ffffff/grid.png" />
            Overview
          </li>
          <li onClick={() => (window.location.href = "/profile")}>
            <img src="https://img.icons8.com/ios-filled/24/ffffff/user.png" />
            Profile
          </li>
          <li onClick={() => (window.location.href = "/dashboard")}>
            <img src="https://img.icons8.com/ios-filled/24/ffffff/home.png" />
            Dashboard
          </li>
          <li onClick={() => (window.location.href = "/EduZone")}>
            <img src="https://img.icons8.com/ios-filled/24/ffffff/book.png" />
            EduZone
          </li>
          <li onClick={() => (window.location.href = "/FitZone")}>
            <img src="https://img.icons8.com/ios-filled/24/ffffff/dumbbell.png" />
            FitZone
          </li>
          <li onClick={() => (window.location.href = "/about")}>
            <img src="https://img.icons8.com/ios-filled/24/ffffff/about.png" />
            About
          </li>
        </ul>
      </div>

      {/* === MAIN CONTENT === */}
      <div className="main">
        <div className="header">Dashboard</div>

        {/* Top Section */}
        <div className="top-section">
          <div className="progress-box">
            <h3>Progress Status</h3>
            <div className="progress-circle"></div>
            <span>Task completed</span>
          </div>

          <div className="calendar">
            <h3>April 2025</h3>
            <table>
              <thead>
                <tr>
                  <th>Su</th>
                  <th>Mo</th>
                  <th>Tu</th>
                  <th>We</th>
                  <th>Th</th>
                  <th>Fr</th>
                  <th>Sa</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>7</td>
                  <td>8</td>
                  <td>9</td>
                  <td>10</td>
                  <td>11</td>
                  <td>12</td>
                </tr>
                <tr>
                  <td>13</td>
                  <td className="active">14</td>
                  <td>15</td>
                  <td>16</td>
                  <td>17</td>
                  <td>18</td>
                  <td>19</td>
                </tr>
                <tr>
                  <td>20</td>
                  <td>21</td>
                  <td>22</td>
                  <td>23</td>
                  <td>24</td>
                  <td>25</td>
                  <td>26</td>
                </tr>
                <tr>
                  <td>27</td>
                  <td>28</td>
                  <td>29</td>
                  <td>30</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bottom-section">
          <div className="chart-box">
            <canvas id="lineChart"></canvas>
          </div>

          <div className="leaderboard">
            <h3>Leaderboard</h3>
            <div className="leaderboard-item">1. Bryan Wolf <span>43 pts</span></div>
            <div className="leaderboard-item">2. Meghan Jess <span>40 pts</span></div>
            <div className="leaderboard-item">3. Alex Turner <span>38 pts</span></div>
            <div className="leaderboard-item highlight">4. You <span>34 pts</span></div>
            <div className="leaderboard-item">5. Tamara Schmidt <span>33 pts</span></div>
            <div className="leaderboard-item">6. Ricardo Veum <span>32 pts</span></div>
            <div className="leaderboard-item">7. Gary Sanford <span>31 pts</span></div>
            <div className="leaderboard-item">8. Becky Bartell <span>30 pts</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
