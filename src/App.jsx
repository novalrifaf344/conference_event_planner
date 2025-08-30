import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import ConferenceEvent from "./ConferenceEvent";
import AboutUs from "./AboutUs";

function App() {
  const [showVenue, setShowVenue] = useState(false);
  const eventRef = useRef(null);

  const handleGetStarted = () => {
    setShowVenue(true);
  };

  // Smoothly scroll to the planner once it becomes visible
  useEffect(() => {
    if (showVenue && eventRef.current) {
      eventRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showVenue]);

  return (
    <>
      <header className="first_page">
        <div className="main_event">
          <div className="first_page_name_btn">
            <h1 className="budget_heading">Conference Expense Planner</h1>
            <p className="budget_sentence">Plan your next major event with us!</p>
            <div className="getstarted_btn">
              <button onClick={handleGetStarted} className="get-started-btn">
                Get Started
              </button>
            </div>
          </div>

          <div className="aboutus_main">
            <AboutUs />
          </div>
        </div>
      </header>

      <div
        ref={eventRef}
        className={`event-list-container ${showVenue ? "visible" : ""}`}
      >
        <ConferenceEvent />
      </div>
    </>
  );
}

export default App;
