import {
  useEffect,
  useState,
} from "react";

import socket from "../../../services/socket";
import API from "../../../services/axios";

function ChatsTab({
  setSelectedUser,
}) {

  const [users, setUsers] =
    useState([]);

  const [
    filteredUsers,
    setFilteredUsers,
  ] = useState([]);

  const [
    onlineUsers,
    setOnlineUsers,
  ] = useState([]);

  const [
    search,
    setSearch,
  ] = useState("");

  useEffect(() => {

    loadUsers();

    socket.on(
      "online-users",
      (users) => {

        setOnlineUsers(
          users
        );

      }
    );

    return () => {

      socket.off(
        "online-users"
      );

    };

  }, []);

  useEffect(() => {

    const filtered =
      users.filter(
        user =>

          user.fullName
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    setFilteredUsers(
      filtered
    );

  }, [search, users]);

  const loadUsers =
    async () => {

      try {

        const res =
          await API.get(
            "/users/members"
          );

        const currentUser =
          JSON.parse(
            localStorage.getItem(
              "user"
            )
          );

        const usersWithoutMe =
          res.data.filter(
            user =>
              user.id !==
              currentUser.id
          );

        setUsers(
          usersWithoutMe
        );

        setFilteredUsers(
          usersWithoutMe
        );

      } catch (error) {

        console.log(
          error
        );

      }

    };

  return (

    <div className="chat-list">

      <div
        className="chat-search"
      >

        <input
          type="text"
          placeholder="Search members..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

      </div>

      <div
        className="chat-count"
      >
        Members :
        {
          filteredUsers.length
        }
      </div>

      {
        filteredUsers.map(
          (user) => (

            <div
              key={user.id}
              className="chat-card"
              onClick={() =>
                setSelectedUser(
                  user
                )
              }
            >

              <div
                className="chat-dp-wrapper"
              >

                <img
                  src={
                    user.profilePic

                      ? `https://mandal-website-production.up.railway.app/${user.profilePic}`

                      : "/user.png"
                  }
                  alt=""
                  className="chat-dp"
                />

                {onlineUsers.includes(
                  String(
                    user.id
                  )
                ) && (

                  <span
                    className="online-dot"
                  />

                )}

              </div>

              <div
                className="chat-info"
              >

                <h4>
                  {
                    user.fullName
                  }
                </h4>

                <small>

                  {
                    onlineUsers.includes(
                      String(
                        user.id
                      )
                    )

                      ? "🟢 Online"

                      : user.lastSeen

                      ? `Last Seen ${new Date(
                          user.lastSeen
                        ).toLocaleString()
                        }`

                      : "⚫ Offline"
                  }

                </small>

              </div>

            </div>

          )
        )
      }

      {
        filteredUsers.length ===
          0 && (

          <div
            style={{
              padding:
                "20px",
              textAlign:
                "center",
            }}
          >

            No Members Found

          </div>

        )
      }

    </div>

  );

}

export default ChatsTab;