import { useEffect, useState } from "react";
import API from "../../services/axios";
import Navbar from "../../components/Navbar/Navbar";

function Profile() {
  const [user, setUser] =
    useState(null);

  const [editMode, setEditMode] =
    useState(false);

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [form, setForm] =
    useState({
      fullName: "",
      age: "",
      address: "",
      mobile: "",
      email: "",
    });

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

        setUser(res.data);

        setForm({
          fullName:
            res.data.fullName ||
            "",

          age:
            res.data.age || "",

          address:
            res.data.address ||
            "",

          mobile:
            res.data.mobile ||
            "",

          email:
            res.data.email ||
            "",
        });

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    getProfile();
  }, []);

  const handleUpdate =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const formData =
          new FormData();

        formData.append(
          "fullName",
          form.fullName
        );

        formData.append(
          "age",
          form.age
        );

        formData.append(
          "address",
          form.address
        );

        formData.append(
          "mobile",
          form.mobile
        );

        formData.append(
          "email",
          form.email
        );

        if (
          selectedImage
        ) {
          formData.append(
            "profilePic",
            selectedImage
          );
        }

        await API.put(
          "/users/profile",
          formData,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "Profile Updated Successfully"
        );

        setEditMode(
          false
        );

        getProfile();

      } catch (error) {
        console.log(error);

        alert(
          "Failed To Update Profile"
        );
      }
    };

  if (!user) {
    return (
      <>
        <Navbar />

        <div className="container">
          <h2>
            Loading...
          </h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container">

        <div className="profile-card">

          <div className="profile-header">

            <img
              src={
                preview
                  ? preview
                  : user.profilePic
                  ? `mandal-website-production.up.railway.app/${user.profilePic}`
                  : "/user.png"
              }
              alt="Profile"
              className="profile-image"
              onError={(e) => {
                e.target.src =
                  "/user.png";
              }}
            />

            {editMode && (
              <div
                className="profile-upload"
              >
                <label>
                  Change Profile Photo
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file =
                      e.target
                        .files[0];

                    if (
                      file
                    ) {
                      setSelectedImage(
                        file
                      );

                      setPreview(
                        URL.createObjectURL(
                          file
                        )
                      );
                    }
                  }}
                />
              </div>
            )}

          </div>

          {editMode ? (
            <div className="profile-form">

              <h2>
                Edit Profile
              </h2>

              <input
                type="text"
                placeholder="Full Name"
                value={
                  form.fullName
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    fullName:
                      e.target
                        .value,
                  })
                }
              />

              <input
                type="number"
                placeholder="Age"
                value={
                  form.age
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    age:
                      e.target
                        .value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Address"
                value={
                  form.address
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    address:
                      e.target
                        .value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Mobile"
                value={
                  form.mobile
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    mobile:
                      e.target
                        .value,
                  })
                }
              />

              <input
                type="email"
                placeholder="Email"
                value={
                  form.email
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    email:
                      e.target
                        .value,
                  })
                }
              />

              <div className="profile-actions">

                <button
                  onClick={
                    handleUpdate
                  }
                >
                  Save Changes
                </button>

                <button
                  onClick={() => {
                    setEditMode(
                      false
                    );

                    setPreview(
                      ""
                    );

                    setSelectedImage(
                      null
                    );
                  }}
                >
                  Cancel
                </button>

              </div>

            </div>
          ) : (
            <div className="profile-info">

              <h2>
                {
                  user.fullName
                }
              </h2>

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
                  Age:
                </strong>
                {" "}
                {
                  user.age
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
                  user.mobile
                }
              </p>

              <p>
                <strong>
                  Address:
                </strong>
                {" "}
                {
                  user.address
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

              <button
                className="edit-btn"
                onClick={() =>
                  setEditMode(
                    true
                  )
                }
              >
                Edit Profile
              </button>

            </div>
          )}

        </div>

      </div>
    </>
  );
}

export default Profile;