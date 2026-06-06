import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useState,
  useEffect,
} from "react";

import { useTranslation } from "react-i18next";

import API from "../../services/axios";

function Navbar() {
  const navigate =
    useNavigate();

  const { t, i18n } =
    useTranslation();

  const [sidebarOpen,
    setSidebarOpen] =
    useState(false);

  const [user,
    setUser] =
    useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) return;

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
          "PROFILE:",
          res.data
        );

        setUser(
          res.data
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

  const changeLanguage =
    (lang) => {
      i18n.changeLanguage(
        lang
      );

      localStorage.setItem(
        "lang",
        lang
      );
    };

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "role"
    );

    navigate("/login");
  };

  const profileImage = user?.profilePic
  ? user.profilePic.startsWith("/")
    ? `https://mandal-website-production.up.railway.app${user.profilePic}`
    : `https://mandal-website-production.up.railway.app${user.profilePic}`
  : "/user.png";

console.log("PROFILE PIC:", user?.profilePic);
console.log("IMAGE URL:", profileImage);
  return (
    <>
      <nav className="navbar">

        <div className="navbar-left">

          <img
            src="/logo.png"
            alt="Logo"
            className="logo"
          />

          <h2>
            BAAL MITRA
            GANESH UTSAV
            MANDAL
          </h2>

        </div>

        <div className="navbar-right">

          {user && (
            <div
              className="user-preview"
              onClick={() =>
                navigate(
                  "/profile"
                )
              }
            >
              <img
                src={
                  profileImage
                }
                alt="User"
                className="nav-user-pic"
                onError={(e) => {
                  e.target.src =
                    "/user.png";
                }}
              />

              <span>
                {
                  user.fullName
                }
              </span>
            </div>
          )}

          <button
            className="menu-btn"
            onClick={() =>
              setSidebarOpen(
                true
              )
            }
          >
            ☰
          </button>

        </div>

      </nav>

      {sidebarOpen && (
        <>
          <div
            className="sidebar-overlay"
            onClick={() =>
              setSidebarOpen(
                false
              )
            }
          />

          <div className="sidebar">

            <div className="sidebar-header">

              <button
                className="close-btn"
                onClick={() =>
                  setSidebarOpen(
                    false
                  )
                }
              >
                ✕
              </button>

            </div>

            {user && (
              <div className="sidebar-profile">

                <img
                  src={
                    profileImage
                  }
                  alt="Profile"
                  onError={(e) => {
                    e.target.src =
                      "/user.png";
                  }}
                />

                <h3>
                  {
                    user.fullName
                  }
                </h3>

                <p>
                  {
                    user.role
                  }
                </p>

              </div>
            )}

            <ul>

              <li>
                <Link
                  to="/"
                  onClick={() =>
                    setSidebarOpen(
                      false
                    )
                  }
                >
                  {t("home")}
                </Link>
              </li>

              <li>
                <Link
                  to="/events"
                  onClick={() =>
                    setSidebarOpen(
                      false
                    )
                  }
                >
                  {t("events")}
                </Link>
              </li>

              <li>
                <Link
                  to="/gallery"
                  onClick={() =>
                    setSidebarOpen(
                      false
                    )
                  }
                >
                  Gallery
                </Link>
              </li>

              <li>
                <Link
                  to="/public-donations"
                  onClick={() =>
                    setSidebarOpen(
                      false
                    )
                  }
                >
                  Donations
                </Link>
              </li>

              {user ? (
                <>
                  <li>
                    <Link
                      to="/profile"
                      onClick={() =>
                        setSidebarOpen(
                          false
                        )
                      }
                    >
                      Profile
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/money-donation"
                      onClick={() =>
                        setSidebarOpen(
                          false
                        )
                      }
                    >
                      Donate Money
                    </Link>
                  </li>

                   <li>
                    <Link
                      to="/chat"
                      onClick={() =>
                        setSidebarOpen(
                          false
                        )
                      }
                    >
                      chats
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/my-donations"
                      onClick={() =>
                        setSidebarOpen(
                          false
                        )
                      }
                    >
                      My Donations
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/id-card"
                      onClick={() =>
                        setSidebarOpen(
                          false
                        )
                      }
                    >
                      Mandal ID Card
                    </Link>
                  </li>

                  {user.role ===
                    "admin" && (
                    <li>
                      <Link
                        to="/admin"
                        onClick={() =>
                          setSidebarOpen(
                            false
                          )
                        }
                      >
                        Admin Dashboard
                      </Link>
                    </li>
                  )}

                  <li>
                    <button
                      className="logout-btn"
                      onClick={
                        logout
                      }
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/register"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}

            </ul>

            <div className="language-buttons">

              <button
                onClick={() =>
                  changeLanguage(
                    "en"
                  )
                }
              >
                English
              </button>

              <button
                onClick={() =>
                  changeLanguage(
                    "mr"
                  )
                }
              >
                मराठी
              </button>

            </div>

          </div>
        </>
      )}
    </>
  );
}

export default Navbar;