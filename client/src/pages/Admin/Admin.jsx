import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/axios";
import Navbar from "../../components/Navbar/Navbar";

function Admin() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    users: 0,
    donations: 0,
    amount: 0,
    events: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const config = {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        };

        const donationRes =
          await API.get(
            "/donations/all",
            config
          );

        const userRes =
          await API.get(
            "/users/all",
            config
          );

        const donations =
          donationRes.data || [];

        const users =
          userRes.data || [];

        const totalAmount =
          donations.reduce(
            (
              sum,
              donation
            ) =>
              sum +
              Number(
                donation.amount ||
                  0
              ),
            0
          );

        setStats({
          users:
            users.length,

          donations:
            donations.length,

          amount:
            totalAmount,

          events: 0,
        });
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <>
      <Navbar />

      <div className="admin-container">
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
              🙏 Admin Dashboard
            </h1>

            <p>
              Baal Mitra Ganesh Utsav Mandal
              Management Panel
            </p>
          </div>

          {/* STATS */}

          <div className="dashboard-grid">

            <div className="dashboard-card">
              <h3>
                👥 Total Users
              </h3>

              <h2>
                {stats.users}
              </h2>
            </div>

            <div className="dashboard-card">
              <h3>
                💰 Total Donations
              </h3>

              <h2>
                {
                  stats.donations
                }
              </h2>
            </div>

            <div className="dashboard-card">
              <h3>
                ₹ Total Amount
              </h3>

              <h2>
                ₹
                {stats.amount.toLocaleString()}
              </h2>
            </div>

          </div>

          

          {/* MANAGEMENT */}

          <div
            className="cards"
            style={{
              marginTop:
                "40px",
            }}
          >

            <div className="card">
              <h3>
                👥 Manage Users
              </h3>

              <button
                onClick={() =>
                  navigate(
                    "/manage-users"
                  )
                }
              >
                Open
              </button>
            </div>

<div className="card">
              <h3>
                📢 Manage Notices
              </h3>

              <button
                onClick={() =>
                  navigate(
                    "/manage-notices"
                  )
                }
              >
                Open
              </button>
            </div>


            <div className="card">
              <h3>
                💰 Manage Donations
              </h3>

              <button
                onClick={() =>
                  navigate(
                    "/manage-donations"
                  )
                }
              >
                Open
              </button>
            </div>

            <div className="card">
              <h3>
                📅 Manage Events
              </h3>

              <button
                onClick={() =>
                  navigate(
                    "/manage-events"
                  )
                }
              >
                Open
              </button>
            </div>

            <div className="card">
              <h3>
                🖼 Manage Gallery
              </h3>

              <button
                onClick={() =>
                  navigate(
                    "/admin/gallery"
                  )
                }
              >
                Open
              </button>
            </div>

            <div className="card">
              <h3>
                📢 Manage Ticker
              </h3>

              <button
                onClick={() =>
                  navigate(
                    "/manage-ticker"
                  )
                }
              >
                Open
              </button>
            </div>

            <div className="card">
              <h3>
                🧾 Manage Expenses
              </h3>

              <button
                onClick={() =>
                  navigate(
                    "/manage-expenses"
                  )
                }
              >
                Open
              </button>
            </div>

            <div className="card">
              <h3>
                🪪 Manage ID Cards
              </h3>

              <button
                onClick={() =>
                  navigate(
                    "/manage-id-cards"
                  )
                }
              >
                Open
              </button>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default Admin;