//TotalCost.jsx
import React from 'react';
import "./TotalCost.css";

const TotalCost = ({ totalCosts, ItemsDisplay, onBook }) => {
  const total_amount = totalCosts.venue + totalCosts.av + totalCosts.meals;

  const handleBookClick = () => {
    if (typeof onBook === "function") {
      onBook();
    } else {
      // Fallback: go to landing if no handler provided
      window.location.href = "/";
    }
  };

  return (
    <div className="pricing-app">
      <div className="display_box">
        <div className="header">
          <p className="preheading"><h3>Total cost for the event</h3></p>
        </div>

        <h2 id="pre_fee_cost_display" className="price">
          ${total_amount}
        </h2>

        <div className="render_items">
          <ItemsDisplay />
        </div>

        {/* Booking Order button */}
        <div className="book_bar">
          <button className="booking_button" onClick={handleBookClick}>
            Booking Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default TotalCost;
