import { useEffect, useState } from "react";
import API from "../../services/axios";
import Navbar from "../../components/Navbar/Navbar";

function ManageTicker() {
  const [message, setMessage] =
    useState("");

  const loadTicker =
    async () => {
      try {
        const res =
          await API.get(
            "/ticker"
          );

        setMessage(
          res.data.message
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    loadTicker();
  }, []);

  const saveTicker =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await API.post(
          "/ticker",
          {
            message,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "Ticker Updated Successfully"
        );

      } catch (error) {
        console.log(error);
        alert(
          "Failed To Update Ticker"
        );
      }
    };

  return (
    <>
      <Navbar />

      <div className="container">

        <h1>
          Manage Ticker
        </h1>

        <textarea
          rows="5"
          style={{
            width: "100%",
          }}
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <button
          onClick={
            saveTicker
          }
        >
          Save Ticker
        </button>

      </div>
    </>
  );
}

export default ManageTicker;