import { useEffect, useState } from "react";
import API from "../../services/axios";
import Navbar from "../../components/Navbar/Navbar";

function ManageUsers() {
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

  const deleteUser =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this user?"
        );

      if (!confirmDelete)
        return;

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await API.delete(
          `/users/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "User Deleted Successfully"
        );

        loadUsers();
      } catch (error) {
        console.log(error);

        alert(
          "Failed To Delete User"
        );
      }
    };

  return (
    <>
      <Navbar />

      <div className="manage-users">
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
              👥 Manage Users
            </h1>

            <p>
              Total Users :
              {" "}
              {
                users.length
              }
            </p>
          </div>

          <div className="cards">

            {users.map(
              (user) => (
                <div
                  className="user-card"
                  key={
                    user.id
                  }
                >

                  <img
                    src={
                      user.profilePic ||
                      "/user.png"
                    }
                    alt="User"
                  />

                  <h3>
                    {
                      user.fullName
                    }
                  </h3>

                  <p>
                    <strong>
                      ID:
                    </strong>
                    {" "}
                    {user.id}
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
                      user.email
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
                      Role:
                    </strong>
                    {" "}
                    {
                      user.role
                    }
                  </p>

                  <div className="action-buttons">

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteUser(
                          user.id
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

        </div>
      </div>
    </>
  );
}

export default ManageUsers;