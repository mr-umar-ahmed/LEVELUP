import "./About.css";

function About() {
  return (
    <div className="about-page">
      <div className="sidebar">
        <ul>
          <li onClick={() => (window.location.href = "/dashboard")}>Dashboard</li>
          <li onClick={() => (window.location.href = "/profile")}>Profile</li>
          <li onClick={() => (window.location.href = "/EduZone")}>Study</li>
          <li onClick={() => (window.location.href = "/FitZone")}>Fitness</li>
          <li className="active">About</li>
        </ul>
      </div>

      <div className="about-main">
        <h1>About Level Up</h1>
        <p>
          Welcome to Level Up, your all-in-one tracker for study and fitness! We believe that
          building good habits should be simple, fun, and motivating. Whether you're aiming to
          improve your academic performance or stay active, Level Up helps you stay on track and
          reach your goals.
        </p>

        <h2>What You Can Do with Level Up:</h2>
        <ul>
          <li>📚 Track your study progress — log sessions, set goals, and monitor improvement</li>
          <li>💪 Stay fit — plan workouts and stay consistent</li>
          <li>🎨 Clean UI — minimalist + fun interface</li>
          <li>🧠 Separate dashboards — easy switch between study and fitness</li>
        </ul>

        <h2>Our Mission</h2>
        <p>
          We created Level Up to make personal growth effortless and enjoyable. Whether you're
          studying for exams, building a fitness routine, or just trying to stay productive, our
          goal is to help you stay motivated and level up every day!
        </p>

        <h2>Meet the Team</h2>
        <p>We’re the creators of Level Up — feel free to connect with us!</p>
        <ul className="team-list">
          <li>[Teammate 1] | [Email] | [GitHub]</li>
          <li>[Teammate 2] | [Email] | [GitHub]</li>
          <li>[Teammate 3] | [Email] | [GitHub]</li>
          <li>[Teammate 4] | [Email] | [GitHub]</li>
        </ul>

        <h2>App Info</h2>
        <p>
          <strong>Project Name:</strong> Level Up<br />
          <strong>Tech Stack:</strong> React, Node.js, Express, MongoDB<br />
          <strong>GitHub Repository:</strong> [Add Your Link]
        </p>
      </div>
    </div>
  );
}

export default About;
