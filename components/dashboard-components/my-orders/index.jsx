import React, { useState } from "react";
import listing_icon from "../../../public/assets/orders/icon.png";
import hot_listing_icon from "../../../public/assets/orders/hot-icon.png";
import refresh_listing_icon from "../../../public/assets/orders/refresh.png";
import del from "../../../public/assets//dashboard/delete.svg";
import Paginate from "../../common/pagination";


const MyOrders = () => {
  const [number, setNumber] = useState(1);
  const [hotCollapse, setHotCollapse] = useState(false);
  const [listCollapse, setListCollapse] = useState(true);
  const [refreshCollapse, setRefreshCollapse] = useState(true);

  const handleMinus = () => {
    if (number > 1) {
      setNumber(number - 1);
    }
  };

  const handlePlus = () => {
    setNumber(number + 1);
  };

  return (
    <div className="my_orders_section">
      <div className="overlay" />
      <h3 className="mob_heading d_none">My Orders</h3>
      <div className="orders_content_container">
        <div className="left_panel">
          <div className="listing_container">
            <h3>Listings</h3>
            <div className="listing_content">
              <div className="listing_product">
                <span className="left-round">Product</span>
                <div className="list">
                  <img src={listing_icon.src} />
                  <div>
                    <h4>Listing</h4>
                    <p>Get an ad slot to post your listing</p>
                  </div>
                </div>
                <div className="list">
                  <img src={hot_listing_icon.src} />
                  <div>
                    <h4>Hot Listing</h4>
                    <p>
                      Get a hot listing to post your ad above normal listings
                    </p>
                  </div>
                </div>
              </div>
              <div className="listing_product">
                <span className="right-round">Price</span>
                <div className="list list_price">
                  <p>Rs 1,000</p>
                  <button>Add to Cart</button>
                </div>
                <div className="list list_price">
                  <p>Rs 3,000</p>
                  <div className="add_to_cart">
                    <div className="counter">
                      <p onClick={handleMinus}>-</p>
                      <div className="display_counter">{number}</div>
                      <p onClick={handlePlus}>+</p>
                    </div>
                    <div className="del">
                      <img src={del.src} alt="del" width={10} height={10} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="listing_container">
            <h3>
              Credits{" "}
              <div style={{ fontSize: "15px" }}>
                (Only applicable on already posted listings)
              </div>
            </h3>
            <div className="listing_content">
              <div className="listing_product">
                <span className="left-round">Product</span>
                <div className="list">
                  <img src={refresh_listing_icon.src} />
                  <div>
                    <h4>Refresh</h4>
                    <p>
                      Get a refresh credit to bring your listing to the top
                      again
                    </p>
                  </div>
                </div>
              </div>
              <div className="listing_product">
                <span className="right-round">Price</span>
                <div className="list list_price">
                  <p>Rs 1,000</p>
                  <button>Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
          <div className="listing_container">
            <h3>Order History</h3>
            <div className="listing_content">
              <div className="history_listings">
                <span className="left-round">Order ID</span>
                <div className="history_list">
                  <p>1123</p>
                </div>
              </div>
              <div className="history_listings">
                <span className="left-border">Product</span>
                <div className="history_list">
                  <p className="list_text">
                    <img
                      src={hot_listing_icon.src}
                      alt="history_hot_listing_icon"
                    />
                    {""}
                    Hot Listing(1),{""}
                    <img
                      src={refresh_listing_icon.src}
                      alt="history_refresh_listing_icon"
                    />
                    {""}
                    Refresh credit(1)
                  </p>
                </div>
              </div>
              <div className="history_listings">
                <span className="left-border">Date & Time</span>
                <div className="history_list">
                  <p className="list_date">12;00 am, Nov 18, 23</p>
                </div>
              </div>
              <div className="history_listings">
                <span className="left-border">Order Status</span>
                <div className="history_list">
                  <p className="list_status">Complete</p>
                </div>
              </div>
              <div className="history_listings">
                <span className="right-round" style={{ paddingRight: "10px" }}>
                  Price (PKR)
                </span>
                <div className="history_list">
                  <p>5,000</p>
                </div>
              </div>
            </div>
            {/* TODO: Will add dynamic data */}
            <Paginate align="flex-end" data={{ data: "rersgsdfg" }} />
          </div>
        </div>
        <div className="right_panel">
          <div>
            <h2>Order Summary</h2>
            <div className="hot_summary" style={{ marginTop: "0px" }}>
              <div
                className="collapse_head"
                onClick={() => setHotCollapse(!hotCollapse)}
              >
                <h4>Hot Listing</h4>
                <span>Rs. 4,000</span>
              </div>
              <div
                className={
                  hotCollapse === true
                    ? `collapse collapse_content`
                    : `collapse_content`
                }
              >
                <p> Hot Credits (1x)</p>
                <p>Listing (1x)</p>
              </div>
            </div>
            <div className="hot_summary">
              <div
                className="collapse_head"
                onClick={() => setListCollapse(!listCollapse)}
              >
                <h4>Listing (1x)</h4>
                <span>Rs. 1,000</span>
              </div>
              <div
                className={
                  listCollapse === true
                    ? `collapse collapse_content`
                    : `collapse_content`
                }
              >
                <p> Hot Credits (1x)</p>
                <p>Listing (1x)</p>
              </div>
            </div>
            <div className="hot_summary">
              <div
                className="collapse_head"
                onClick={() => setRefreshCollapse(!refreshCollapse)}
              >
                <h4>Refresh Credits (2x)</h4>
                <span>Rs. 200</span>
              </div>
              <div
                className={
                  refreshCollapse === true
                    ? `collapse collapse_content`
                    : `collapse_content`
                }
              >
                <p> Hot Credits (1x)</p>
                <p>Listing (1x)</p>
              </div>
            </div>
          </div>
          <div className="total_summary">
            <div className="total">
              <span>Total</span>
              <h4>Rs. 5,200</h4>
            </div>
            <button className="proceed_btn">Proceed to Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
