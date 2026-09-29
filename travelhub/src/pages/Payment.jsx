import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const defaultTrip = {
  title: "7 Days tour to Explore the Beauty of philippines",
  destination: "Maldives, Philippines",
  duration: "7 days",
  travelers: 2,
  price: 1100,
};

function Payment() {
  const { state } = useLocation();
  const trip = state ?? defaultTrip;
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setPaymentComplete(true);
  };

  return (
    <main className="demo-payment-page wrapper">
      <section className="demo-payment-shell" aria-labelledby="payment-title">
        <div className="demo-payment-content">
          <p className="demo-payment-label">TRAVELHUB DEMO CHECKOUT</p>
          {paymentComplete ? (
            <div className="demo-payment-success" role="status">
              <h1 id="payment-title">Payment simulated</h1>
              <p>Your demo booking is confirmed. No money was charged.</p>
              <p className="demo-reference">Demo reference: TH-DEMO-0001</p>
              <Link className="demo-payment-back" to="/trips">Back to trips</Link>
            </div>
          ) : (
            <>
              <h1 id="payment-title">Complete your booking</h1>
              <p className="demo-payment-notice">Demo only. This checkout does not process real payments.</p>

              <form onSubmit={handleSubmit}>
                <fieldset className="demo-payment-methods">
                  <legend>Choose a payment method</legend>
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={(event) => setPaymentMethod(event.target.value)}
                    />
                    UPI
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(event) => setPaymentMethod(event.target.value)}
                    />
                    Credit or debit card
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={paymentMethod === "bank"}
                      onChange={(event) => setPaymentMethod(event.target.value)}
                    />
                    Net banking
                  </label>
                </fieldset>

                <div className="demo-payment-actions">
                  <Link className="demo-payment-cancel" to="/trips">Cancel</Link>
                  <button type="submit">Simulate payment · ₹{trip.price.toLocaleString("en-IN")}</button>
                </div>
              </form>
            </>
          )}
        </div>

        <aside className="demo-order-summary" aria-label="Trip order summary">
          <h2>Trip summary</h2>
          <h3>{trip.title}</h3>
          <p>{trip.destination}</p>
          <dl>
            <div><dt>Duration</dt><dd>{trip.duration}</dd></div>
            <div><dt>Travelers</dt><dd>{trip.travelers}</dd></div>
            <div className="demo-order-total"><dt>Total</dt><dd>₹{trip.price.toLocaleString("en-IN")}</dd></div>
          </dl>
        </aside>
      </section>
    </main>
  );
}

export default Payment;