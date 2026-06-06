import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/axios";
import Navbar from "../../components/Navbar/Navbar";

function PublicDonations() {
  const navigate = useNavigate();

  const [donations, setDonations] =
    useState([]);

  const [totalAmount, setTotalAmount] =
    useState(0);

  const getDonations =
    async () => {
      try {
        const res =
          await API.get(
            "/donations/all"
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

      <div className="public-donations-page">

        <div className="container">

          <div className="public-donations-header">

            <h1>
              🙏 Public Donations
            </h1>

            <p>
              All Donations
              Received By
              Baal Mitra Ganesh Utsav Mandal
            </p>

          </div>

          <div className="total-donations-card">

            <h2>
              ₹
              {totalAmount.toLocaleString()}
            </h2>

            <p>
              Total Donation
              Amount
            </p>

            <p>
              Total Donors :
              {" "}
              {
                donations.length
              }
            </p>

          </div>

          <div className="public-donations-grid">

            {donations.length >
            0 ? (
              donations.map(
                (
                  donation
                ) => (
                  <div
                    className="public-donation-card"
                    key={
                      donation.id
                    }
                  >

                    <h3 className="donor-name">
                      {
                        donation.fullName
                      }
                    </h3>

                    <p className="donation-amount">
                      ₹
                      {
                        donation.amount
                      }
                    </p>

                    <p className="donation-reason">
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
                        Receipt:
                      </strong>
                      {" "}
                      {
                        donation.receiptNumber
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

                    <p className="donation-date">
                      📅{" "}
                      {donation.donationDate ||
                        "Not Saved"}
                    </p>

                    <p className="donation-date">
                      🕒{" "}
                      {donation.donationTime ||
                        "Not Saved"}
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
              )
            ) : (
              <h2>
                No Donations
                Found
              </h2>
            )}

          </div>

        </div>

      </div>
    </>
  );
}

export default PublicDonations;