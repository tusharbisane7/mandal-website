import { useEffect, useState } from "react";
import API from "../../services/axios";
import Navbar from "../../components/Navbar/Navbar";

function IDCard() {
const [user, setUser] =
useState(null);

const getProfile =
async () => {
try {
const token =
localStorage.getItem(
"token"
);


    const res =
      await API.get(
        "/users/profile",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    console.log(
      "ID CARD USER:",
      res.data
    );

    setUser(
      res.data
    );
  } catch (error) {
    console.log(error);
  }
};


useEffect(() => {
getProfile();
}, []);

if (!user) {
return (
<> <Navbar />

```
    <div className="container">
      <h2>
        Loading...
      </h2>
    </div>
  </>
);


}

const profileImage =
user?.profilePic
? `https://mandal-website.onrender.com/uploads/${user.profilePic.replace(
          "uploads/",
          ""
        )}`
: "/user.png";

return (
<> <Navbar />


  <div className="id-card-container">

    <div className="id-card">

      <div className="id-header">

        <img
          src="/logo.png"
          alt="Logo"
          className="id-logo"
        />

        <h2>
          Baal Mitra Ganesh Utsav Mandal
        </h2>

        <p>
          Member Identity Card
        </p>

      </div>

      <img
        className="id-photo"
        src={profileImage}
        alt="Profile"
        onError={(e) => {
          e.target.src =
            "/user.png";
        }}
      />

      <div className="id-body">

        <h3>
          {user.fullName}
        </h3>

        <p>
          <strong>
            Member ID:
          </strong>
          {" "}
          GMM-{user.id}
        </p>

        <p>
          <strong>
            Username:
          </strong>
          {" "}
          {user.username}
        </p>

        <p>
          <strong>
            Age:
          </strong>
          {" "}
          {user.age || "N/A"}
        </p>

        <p>
          <strong>
            Mobile:
          </strong>
          {" "}
          {user.mobile ||
            "N/A"}
        </p>

        <p>
          <strong>
            Email:
          </strong>
          {" "}
          {user.email ||
            "N/A"}
        </p>

        <p>
          <strong>
            Address:
          </strong>
          {" "}
          {user.address ||
            "N/A"}
        </p>

        <p>
          <strong>
            Role:
          </strong>
          {" "}
          {user.role}
        </p>

        <button
          className="print-btn"
          onClick={() =>
            window.print()
          }
        >
          🖨️ Print ID Card
        </button>

      </div>

    </div>

  </div>
</>


);
}

export default IDCard;
