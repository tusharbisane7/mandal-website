import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function Receipt() {
const { state } =
useLocation();

const navigate =
useNavigate();

if (!state) {
return (
<> <Navbar />


    <div className="container">
      <h1>
        No Receipt Found
      </h1>

      <button
        onClick={() =>
          navigate(
            "/my-donations"
          )
        }
      >
        Back
      </button>
    </div>
  </>
);


}

return (
<> <Navbar />


  <div
    className="container"
    style={{
      maxWidth: "700px",
      margin: "20px auto",
      border:
        "2px solid #000",
      padding: "20px",
      borderRadius:
        "10px",
    }}
  >
    <h1
      style={{
        textAlign:
          "center",
      }}
    >
      बालमित्र गणेश उत्सव मंडल, खिरणीबागपुरा
    </h1>

    <h2
      style={{
        textAlign:
          "center",
      }}
    >
      दान पावती वर्ष - २०२६ 
    </h2>

    <hr />

    <p>
      <b>
        पावती क्र.:
      </b>{" "}
      {
        state.receiptNumber
      }
    </p>

    <p>
      <b>
        नाव:
      </b>{" "}
      {
        state.fullName
      }
    </p>

    <p>
      <b>
        यूजर्नेम :
      </b>{" "}
      {
        state.username
      }
    </p>

    <p>
      <b>
        मोबाईल क्र:
      </b>{" "}
      {
        state.mobile
      }
    </p>

    <p>
      <b>
        रक्कम:
      </b>{" "}
      ₹
      {state.amount}
    </p>

    <p>
      <b>
        दान प्रकार:
      </b>{" "}
      {
        state.reason
      }
    </p>

    <p>
      <b>
        पेमेंट मोड :
      </b>{" "}
      {
        state.paymentMode
      }
    </p>

    <p>
      <b>
        स्थिति:
      </b>{" "}
      <span
        style={{
          color:
            "green",
          fontWeight:
            "bold",
        }}
      >
        {
          state.status
        }
      </span>
    </p>

    <p>
      <b>
        तारीख:
      </b>{" "}
      {
        state.donationDate
      }
    </p>

    <p>
      <b>
        Time:
      </b>{" "}
      {
        state.donationTime
      }
    </p>

    <hr />

    <div
      style={{
        display:
          "flex",
        gap: "10px",
      }}
    >
      <button
        onClick={() =>
          window.print()
        }
      >
        Print Receipt
      </button>

      <button
        onClick={() =>
          navigate(
            "/my-donations"
          )
        }
      >
        Back
      </button>
    </div>
  </div>
</>


);
}

export default Receipt;
