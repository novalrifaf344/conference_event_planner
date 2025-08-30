import React, { useState } from "react";
import "./ConferenceEvent.css";
import TotalCost from "./TotalCost";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "./venueSlice";
import { incrementAvQuantity, decrementAvQuantity } from "./avSlice";
import { toggleMealSelection } from "./mealsSlice";

const ConferenceEvent = () => {
  const [showItems, setShowItems] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const venueItems = useSelector((state) => state.venue);
  const avItems = useSelector((state) => state.av);
  const mealsItems = useSelector((state) => state.meals);

  const dispatch = useDispatch();

  // Guard against NaN in people count (e.g., when input is cleared)
  const safePeople = Number.isFinite(numberOfPeople) ? numberOfPeople : 0;

  const auditorium = venueItems.find(
    (item) => item.name === "Auditorium Hall (Capacity:200)"
  );
  const remainingAuditoriumQuantity = auditorium
    ? Math.max(0, 3 - auditorium.quantity)
    : 0;

  const handleAddToCart = (index) => {
    if (
      venueItems[index].name === "Auditorium Hall (Capacity:200)" &&
      venueItems[index].quantity >= 3
    ) {
      return;
    }
    dispatch(incrementQuantity(index));
  };

  const handleRemoveFromCart = (index) => {
    if (venueItems[index].quantity > 0) {
      dispatch(decrementQuantity(index));
    }
  };

  const handleIncrementAvQuantity = (index) => {
    dispatch(incrementAvQuantity(index));
  };

  const handleDecrementAvQuantity = (index) => {
    dispatch(decrementAvQuantity(index));
  };

  const handleMealSelection = (index) => {
    dispatch(toggleMealSelection(index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowItems(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getItemsFromTotalCost = () => {
    const items = [];
    venueItems.forEach((item) => {
      if (item.quantity > 0) items.push({ ...item, type: "venue" });
    });
    avItems.forEach((item) => {
      if (
        item.quantity > 0 &&
        !items.some((i) => i.name === item.name && i.type === "av")
      ) {
        items.push({ ...item, type: "av" });
      }
    });
    mealsItems.forEach((item) => {
      if (item.selected) {
        items.push({ ...item, type: "meals", numberOfPeople: safePeople });
      }
    });
    return items;
  };

  const items = getItemsFromTotalCost();

  const ItemsDisplay = ({ items }) => {
    return (
      <div className="display_box1">
        {items.length === 0 && <p>No items selected</p>}
        {items.length > 0 && (
          <table className="table_item_data">
            <thead>
              <tr>
                <th>Name</th>
                <th>Unit Cost</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const isMeals = item.type === "meals";
                const qty = isMeals ? `For ${safePeople} people` : item.quantity;
                const subtotal = isMeals
                  ? item.cost * safePeople
                  : item.cost * item.quantity;
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>${item.cost}</td>
                    <td>{isMeals ? qty : item.quantity}</td>
                    <td>${Number.isFinite(subtotal) ? subtotal : 0}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    );
  };

  const calculateTotalCost = (section) => {
    let totalCost = 0;
    if (section === "venue") {
      venueItems.forEach((item) => {
        totalCost += item.cost * item.quantity;
      });
    } else if (section === "av") {
      avItems.forEach((item) => {
        totalCost += item.cost * item.quantity;
      });
    } else if (section === "meals") {
      mealsItems.forEach((item) => {
        if (item.selected) totalCost += item.cost * safePeople;
      });
    }
    // Ensure a numeric result
    return Number.isFinite(totalCost) ? totalCost : 0;
  };

  const venueTotalCost = calculateTotalCost("venue");
  const avTotalCost = calculateTotalCost("av");
  const mealsTotalCost = calculateTotalCost("meals");

  const totalCosts = {
    venue: venueTotalCost,
    av: avTotalCost,
    meals: mealsTotalCost,
  };

  const navigateToProducts = (idType) => {
    if (idType === "#venue" || idType === "#addons" || idType === "#meals") {
      if (showItems) setShowItems(false);
    }
  };

  return (
    <>
      <navbar className="navbar_event_conference">
        <div className="company_logo">Conference Expense Planner</div>
        <div className="left_navbar">
          <div className="nav_links">
            <a href="#venue" onClick={() => navigateToProducts("#venue")}>
              Venue
            </a>
            <a href="#addons" onClick={() => navigateToProducts("#addons")}>
              Add-ons
            </a>
            <a href="#meals" onClick={() => navigateToProducts("#meals")}>
              Meals
            </a>
          </div>
        </div>
      </navbar>

      <div className="main_container">
        {!showItems ? (
          <div className="items-information">
            {/* Venue */}
            <div id="venue" className="venue_container container_main">
              <div className="text">
                <h1>Venue Room Selection</h1>
              </div>
              <div className="venue_selection">
                {venueItems.map((item, index) => (
                  <div className="venue_main" key={index}>
                    <div className="img">
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div className="text">{item.name}</div>
                    <div>${item.cost}</div>
                    <div className="button_container">
                      {venueItems[index].name ===
                      "Auditorium Hall (Capacity:200)" ? (
                        <>
                          <button
                            className={
                              venueItems[index].quantity === 0
                                ? "btn-warning btn-disabled"
                                : "btn-warning"
                            }
                            onClick={() => handleRemoveFromCart(index)}
                          >
                            &#8211;
                          </button>
                          <span className="selected_count">
                            {venueItems[index].quantity > 0
                              ? ` ${venueItems[index].quantity}`
                              : "0"}
                          </span>
                          <button
                            className={
                              remainingAuditoriumQuantity === 0
                                ? "btn-success btn-disabled"
                                : "btn-success"
                            }
                            onClick={() => handleAddToCart(index)}
                          >
                            &#43;
                          </button>
                        </>
                      ) : (
                        <div className="button_container">
                          <button
                            className={
                              venueItems[index].quantity === 0
                                ? "btn-warning btn-disabled"
                                : "btn-warning"
                            }
                            onClick={() => handleRemoveFromCart(index)}
                          >
                            &#8211;
                          </button>
                          <span className="selected_count">
                            {venueItems[index].quantity > 0
                              ? ` ${venueItems[index].quantity}`
                              : "0"}
                          </span>
                          <button
                            className={
                              venueItems[index].quantity === 10
                                ? "btn-success btn-disabled"
                                : "btn-success"
                            }
                            onClick={() => handleAddToCart(index)}
                          >
                            &#43;
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="total_cost">Total Cost: ${venueTotalCost}</div>
            </div>

            {/* Add-ons */}
            <div id="addons" className="venue_container container_main">
              <div className="text">
                <h1>Add-ons Selection</h1>
              </div>
              <div className="addons_selection">
                {avItems.map((item, index) => (
                  <div className="av_data venue_main" key={index}>
                    <div className="img">
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div className="text">{item.name}</div>
                    <div>${item.cost}</div>
                    <div className="addons_btn">
                      <button
                        className="btn-warning"
                        onClick={() => handleDecrementAvQuantity(index)}
                      >
                        &ndash;
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        className="btn-success"
                        onClick={() => handleIncrementAvQuantity(index)}
                      >
                        &#43;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="total_cost">Total Cost: ${avTotalCost}</div>
            </div>

            {/* Meals */}
            <div id="meals" className="venue_container container_main">
              <div className="text">
                <h1>Meals Selection</h1>
              </div>

              <div className="input-container venue_selection">
                <label htmlFor="numberOfPeople">
                  <h3>Number of People:</h3>
                </label>
                <input
                  type="number"
                  className="input_box5"
                  id="numberOfPeople"
                  value={safePeople}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    setNumberOfPeople(Number.isFinite(val) ? Math.max(0, val) : 0);
                  }}
                  min="0"
                />
              </div>

              <div className="meal_selection">
                {mealsItems.map((item, index) => (
                  <div className="meal_item" key={index}>
                    {item.img && (
                      <div className="img">
                        <img src={item.img} alt={item.name} />
                      </div>
                    )}
                    <div className="inner">
                      <input
                        type="checkbox"
                        id={`meal_${index}`}
                        checked={item.selected}
                        onChange={() => handleMealSelection(index)}
                      />
                      <label htmlFor={`meal_${index}`}>{item.name}</label>
                    </div>
                    <div className="meal_cost">${item.cost}</div>
                  </div>
                ))}
              </div>

              <div className="total_cost">Total Cost: ${mealsTotalCost}</div>

              <div className="submit_container">
                <button className="submit_button" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="total_amount_detail">
            <TotalCost
              totalCosts={totalCosts}
              ItemsDisplay={() => <ItemsDisplay items={items} />}
              onBook={() => {
                setShowItems(false);
                window.location.href = "/";
              }}
            />
          </div>
        )}
      </div>

      <footer className="site_footer">
        <div className="footer_center">
          <div className="footer_brand">Conference Expense Planner</div>
          <div className="footer_copy">
            © {new Date().getFullYear()} BudgetEase • All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default ConferenceEvent;
