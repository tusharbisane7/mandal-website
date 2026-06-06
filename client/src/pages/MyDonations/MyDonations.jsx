import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/axios";
import Navbar from "../../components/Navbar/Navbar";

function MyDonations() {
  const navigate = useNavigate();

  const [donations, setDonations] =
    useState([]);

  const [totalAmount, setTotalAmount] =
    useState(0);

  const getDonations =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await API.get(
            "/donations/my",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const data =
          res.data || [];

        setDonations(data);

        const total =
          data.reduce(
            (
              sum,
              donation
            ) =>
              sum +
              Number(
                donation.amount || 0
              ),
            0
          );

        setTotalAmount(total);

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    getDonations();
  }, []);

  return (
    <>
      <Navbar />

      <div className="my-donations">

        <div className="container">

          <div className="public-donations-header">

            <h1>
              🙏 My Donations
            </h1>

            <p>
              View Your Donation
              History
            </p>

          </div>

          <div className="total-donations-card">

            <h2>
              ₹
              {totalAmount.toLocaleString()}
            </h2>

            <p>
              Total Donated Amount
            </p>

            <p>
              Total Donations :
              {" "}
              {
                donations.length
              }
            </p>

          </div>

          {donations.length >
          0 ? (

            <div className="public-donations-grid">

              {donations.map(
                (
                  donation
                ) => (

                  <div
                    className="receipt-card"
                    key={
                      donation.id
                    }
                  >

                    <h3>
                      Receipt No:
                      {" "}
                      {
                        donation.receiptNumber
                      }
                    </h3>

                    <p
                      className="amount"
                    >
                      ₹
                      {
                        donation.amount
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
                        className={
                          donation.status ===
                          "Received"
                            ? "status-paid"
                            : "status-pending"
                        }
                      >
                        {
                          donation.status
                        }
                      </span>
                    </p>

                    <p>
                      📅
                      {" "}
                      {
                        donation.donationDate ||
                        "Not Saved"
                      }
                    </p>

                    <p>
                      🕒
                      {" "}
                      {
                        donation.donationTime ||
                        "Not Saved"
                      }
                    </p>

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
                      View Receipt
                    </button>

                  </div>

                )
              )}

            </div>

          ) : (

            <div
              style={{
                textAlign:
                  "center",
                marginTop:
                  "30px",
              }}
            >
              <h2>
                No Donations
                Found
              </h2>
            </div>

          )}

        </div>

      </div>
    </>
  );
}

export default MyDonations;