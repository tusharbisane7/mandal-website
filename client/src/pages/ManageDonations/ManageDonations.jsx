import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/axios";
import Navbar from "../../components/Navbar/Navbar";

function ManageDonations() {
const navigate = useNavigate();

const [donations, setDonations] =
useState([]);

const [loading, setLoading] =
useState(true);

const loadDonations =
async () => {
try {
const token =
localStorage.getItem(
"token"
);


    const res =
      await API.get(
        "/donations/all",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    setDonations(
      Array.isArray(
        res.data
      )
        ? res.data
        : []
    );
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};


useEffect(() => {
loadDonations();
}, []);

const updateStatus =
async (
id,
status
) => {
try {
const token =
localStorage.getItem(
"token"
);


    await API.put(
      `/donations/status/${id}`,
      { status },
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    alert(
      "Status Updated Successfully"
    );

    loadDonations();
  } catch (error) {
    console.log(error);
  }
};


const deleteDonation =
async (id) => {
if (
!window.confirm(
"Delete this donation?"
)
)
return;


  try {
    const token =
      localStorage.getItem(
        "token"
      );

    await API.delete(
      `/donations/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    alert(
      "Donation Deleted Successfully"
    );

    loadDonations();
  } catch (error) {
    console.log(error);
  }
};


const totalAmount =
donations.reduce(
(sum, donation) =>
sum +
Number(
donation.amount ||
0
),
0
);

return (
<> <Navbar />


  <div className="container">

    <div
      style={{
        textAlign:
          "center",
        marginBottom:
          "30px",
      }}
    >
      <h1>
        💰 Manage Donations
      </h1>

      <p>
        Total Donations:
        {" "}
        {
          donations.length
        }
      </p>
    </div>

    <div className="dashboard-grid">

      <div className="dashboard-card">
        <h3>
          Total Donations
        </h3>

        <h2>
          {
            donations.length
          }
        </h2>
      </div>

      <div className="dashboard-card">
        <h3>
          Total Amount
        </h3>

        <h2>
          ₹
          {Number(
            totalAmount
          ).toLocaleString()}
        </h2>
      </div>

    </div>

    {loading ? (
      <h2
        style={{
          textAlign:
            "center",
          marginTop:
            "30px",
        }}
      >
        Loading...
      </h2>
    ) : (
      <div
        className="cards"
        style={{
          marginTop:
            "30px",
        }}
      >
        {donations.map(
          (
            donation
          ) => (
            <div
              className="card"
              key={
                donation.id
              }
            >
              <h3>
                {
                  donation.fullName
                }
              </h3>

              <h2
                style={{
                  color:
                    "#16a34a",
                }}
              >
                ₹
                {
                  donation.amount
                }
              </h2>

              <p>
                <strong>
                  Receipt:
                </strong>
                {" "}
                {
                  donation.receiptNumber
                }
              </p>

              <p>
                <strong>
                  Reason:
                </strong>
                {" "}
                {
                  donation.reason
                }
              </p>

              <p>
                <strong>
                  Payment:
                </strong>
                {" "}
                {
                  donation.paymentMode
                }
              </p>

              <p>
                <strong>
                  Status:
                </strong>
                {" "}
                <span
                  style={{
                    color:
                      donation.status ===
                      "Received"
                        ? "green"
                        : "red",
                  }}
                >
                  {
                    donation.status
                  }
                </span>
              </p>

              <p>
                <strong>
                  Date:
                </strong>
                {" "}
                {donation.donationDate ||
                  new Date(
                    donation.createdAt
                  ).toLocaleDateString()}
              </p>

              <div className="action-buttons">

                <button
                  onClick={() =>
                    updateStatus(
                      donation.id,
                      "Received"
                    )
                  }
                >
                  Receive
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      donation.id,
                      "Not Received"
                    )
                  }
                >
                  Reject
                </button>

                <button
                  onClick={() =>
                    navigate(
                      "/receipt",
                      {
                        state:
                          donation,
                      }
                    )
                  }
                >
                  Receipt
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteDonation(
                      donation.id
                    )
                  }
                >
                  Delete
                </button>

              </div>
            </div>
          )
        )}
      </div>
    )}

  </div>
</>


);
}

export default ManageDonations;
