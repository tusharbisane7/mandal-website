import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/axios";
import Navbar from "../../components/Navbar/Navbar";

function Donate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    age: "",
    mobile: "",
    reason: "",
    amount: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      const res = await API.post(
        "/donations/create",
        form,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert(
        "Donation Successful"
      );

      navigate(
        "/receipt",
        {
          state: res.data,
        }
      );

      setForm({
        fullName: "",
        age: "",
        mobile: "",
        reason: "",
        amount: "",
      });

    } catch (error) {
      console.log(error);

      alert(
        "Donation Failed"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>
          Donate To Ganesh Mandal
        </h1>

        <form
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) =>
              setForm({
                ...form,
                fullName:
                  e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={(e) =>
              setForm({
                ...form,
                age:
                  e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={(e) =>
              setForm({
                ...form,
                mobile:
                  e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Reason For Donation"
            value={form.reason}
            onChange={(e) =>
              setForm({
                ...form,
                reason:
                  e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Donation Amount"
            value={form.amount}
            onChange={(e) =>
              setForm({
                ...form,
                amount:
                  e.target.value,
              })
            }
          />

          <button
            type="submit"
          >
            Donate Now
          </button>
        </form>
      </div>
    </>
  );
}

export default Donate;