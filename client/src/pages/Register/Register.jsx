import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/axios";

function Register() {
  const navigate =
    useNavigate();

  const [available, setAvailable] =
    useState(null);

  const [suggestions, setSuggestions] =
    useState([]);

  const [profilePic, setProfilePic] =
    useState(null);

  const [preview, setPreview] =
    useState("/user.png");

  const [form, setForm] =
    useState({
      fullName: "",
      username: "",
      age: "",
      address: "",
      mobile: "",
      email: "",
      password: "",
    });

  const checkUsername =
    async (value) => {
      if (!value) return;

      try {
        const res =
          await API.get(
            `/auth/check-username/${value}`
          );

        setAvailable(
          res.data.available
        );

        setSuggestions(
          res.data.suggestions ||
            []
        );
      } catch (err) {
        console.log(err);
      }
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const formData =
          new FormData();

        Object.keys(
          form
        ).forEach((key) => {
          formData.append(
            key,
            form[key]
          );
        });

        if (profilePic) {
          formData.append(
            "profilePic",
            profilePic
          );
        }

        await API.post(
          "/auth/register",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        alert(
          "Registration Successful"
        );

        navigate("/login");

      } catch (err) {
        alert(
          err.response?.data
            ?.message ||
            "Registration Failed"
        );
      }
    };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <img
          src="/logo.png"
          alt="Mandal Logo"
          width="100"
        />

        <h1>
          Baal Mitra Ganesh Utsav Mandal
        </h1>

        <h2>
          Create Account
        </h2>

        <form
          onSubmit={
            handleSubmit
          }
        >

          {/* Profile Upload */}

          <div
            className="profile-upload"
          >
            <img
              src={preview}
              alt="Profile Preview"
              className="profile-preview"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file =
                  e.target
                    .files[0];

                if (file) {
                  setProfilePic(
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
            required
          />

          <input
            type="text"
            placeholder="Username"
            value={
              form.username
            }
            onChange={(e) => {
              setForm({
                ...form,
                username:
                  e.target
                    .value,
              });

              checkUsername(
                e.target.value
              );
            }}
            required
          />

          {available ===
            false && (
            <div
              className="username-error"
            >
              <p>
                ❌ Username
                already exists
              </p>

              {suggestions.map(
                (
                  item,
                  index
                ) => (
                  <p
                    key={
                      index
                    }
                  >
                    {item}
                  </p>
                )
              )}
            </div>
          )}

          {available ===
            true && (
            <p
              className="username-success"
            >
              ✅ Username
              Available
            </p>
          )}

          <input
            type="number"
            placeholder="Age"
            value={form.age}
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
            placeholder="Mobile Number"
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
            placeholder="Email Address"
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

          <input
            type="password"
            placeholder="Password"
            value={
              form.password
            }
            onChange={(e) =>
              setForm({
                ...form,
                password:
                  e.target
                    .value,
              })
            }
            required
          />

          <button
            type="submit"
            className="register-btn"
          >
            Register
          </button>

          <div
            className="auth-footer"
          >
            Already have an
            account?

            <span
              onClick={() =>
                navigate(
                  "/login"
                )
              }
            >
              Login
            </span>
          </div>

        </form>

      </div>

    </div>
  );
}

export default Register;