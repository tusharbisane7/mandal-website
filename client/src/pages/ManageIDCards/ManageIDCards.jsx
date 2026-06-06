import { useEffect, useState } from "react";
import API from "../../services/axios";
import Navbar from "../../components/Navbar/Navbar";

function ManageIDCards() {
  const [users, setUsers] =
    useState([]);

  const loadUsers =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await API.get(
            "/users/all",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setUsers(
          res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <>
      <Navbar />

      <div className="manage-idcards">

        <div className="container">

          <div className="page-header">
            <h1>
              🪪 Manage Member ID Cards
            </h1>

            <p>
              Total Members:
              {" "}
              {users.length}
            </p>
          </div>

          <div className="idcards-grid">

            {users.map(
              (user) => {

                const profileImage =
                  user?.profilePic
                    ? user.profilePic.startsWith(
                        "/"
                      )
                      ? `https://mandal-website-production.up.railway.app${user.profilePic}`
                      : `https://mandal-website-production.up.railway.app/${user.profilePic}`
                    : "/user.png";

                return (
                  <div
                    key={
                      user.id
                    }
                    className="member-id-card"
                  >

                    <div className="card-header">

                      <img
                        src="/logo.png"
                        alt="Logo"
                        className="mandal-logo"
                      />

                      <div>
                        <h2>
                          BAAL MITRA
                        </h2>

                        <h3>
                          GANESH UTSAV
                          MANDAL
                        </h3>
                      </div>

                    </div>

                    <div className="card-body">

                      <img
                        src={
                          profileImage
                        }
                        alt="Profile"
                        className="profile-img"
                        onError={(e) => {
                          e.target.src =
                            "/user.png";
                        }}
                      />

                      <h2>
                        {
                          user.fullName
                        }
                      </h2>

                      <span className="member-role">
                        {
                          user.role
                        }
                      </span>

                      <div className="member-details">

                        <p>
                          <strong>
                            ID:
                          </strong>
                          {" "}
                          BMGUM-
                          {
                            user.id
                          }
                        </p>

                        <p>
                          <strong>
                            Username:
                          </strong>
                          {" "}
                          {
                            user.username
                          }
                        </p>

                        <p>
                          <strong>
                            Email:
                          </strong>
                          {" "}
                          {
                            user.email ||
                            "N/A"
                          }
                        </p>

                        <p>
                          <strong>
                            Mobile:
                          </strong>
                          {" "}
                          {
                            user.mobile ||
                            "N/A"
                          }
                        </p>

                        <p>
                          <strong>
                            Joined:
                          </strong>
                          {" "}
                          {new Date(
                            user.createdAt
                          ).toLocaleDateString()}
                        </p>

                      </div>

                    </div>

                    <div className="card-footer">

                      <span>
                        Ganpati
                        Bappa
                        Morya 🙏
                      </span>

                      <button
                        onClick={() =>
                          window.print()
                        }
                      >
                        Print
                      </button>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </div>

      </div>
    </>
  );
}

export default ManageIDCards;