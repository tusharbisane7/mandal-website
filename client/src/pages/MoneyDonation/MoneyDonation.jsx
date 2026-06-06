import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/axios";
import Navbar from "../../components/Navbar/Navbar";

function MoneyDonation() {
const navigate = useNavigate();

const [form, setForm] =
useState({
fullName: "",
username: "",
mobile: "",
reason: "",
amount: "",
paymentMode: "",
});

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

    setForm((prev) => ({
      ...prev,
      fullName:
        res.data.fullName,
      username:
        res.data.username,
      mobile:
        res.data.mobile,
    }));

  } catch (error) {
    console.log(error);
  }
};


const handleDonate =
async () => {
try {
if (!form.amount) {
return alert(
"Enter Donation Amount"
);
}

    if (
      !form.paymentMode
    ) {
      return alert(
        "Select Payment Mode"
      );
    }

    if (
      form.paymentMode ===
      "Online"
    ) {
      alert(
        "Online Payment Coming Soon"
      );
      return;
    }

    const token =
      localStorage.getItem(
        "token"
      );

    const res =
      await API.post(
        "/donations/create",
        form,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    navigate("/receipt", {
  state: res.data,
});

  } catch (error) {
    console.log(error);
  }
};


return (
<> <Navbar />


  <div className="container">

    <h1>
      Donate Money
    </h1>

    <input
      value={
        form.fullName
      }
      disabled
    />

    <input
      value={
        form.username
      }
      disabled
    />

    <input
      value={
        form.mobile
      }
      disabled
    />

    <input
      type="number"
      placeholder="Donation Amount"
      value={
        form.amount
      }
      onChange={(e) =>
        setForm({
          ...form,
          amount:
            e.target.value,
        })
      }
    />

    <select
      value={
        form.reason
      }
      onChange={(e) =>
        setForm({
          ...form,
          reason:
            e.target.value,
        })
      }
    >
      <option value="">
        Select Reason
      </option>

      <option value="Ganesh Utsav">
        Ganesh Utsav
      </option>

      <option value="Decoration">
        Decoration
      </option>

      <option value="Prasad">
        Prasad
      </option>

      <option value="Social Work">
        Social Work
      </option>
    </select>

    <select
      value={
        form.paymentMode
      }
      onChange={(e) =>
        setForm({
          ...form,
          paymentMode:
            e.target.value,
        })
      }
    >
      <option value="">
        Select Payment Mode
      </option>

      <option value="Cash">
        Offline Cash
      </option>

      <option value="Online">
        Online Payment
      </option>
    </select>

    <h2>
      Amount:
      ₹
      {form.amount || 0}
    </h2>

    <button
      onClick={
        handleDonate
      }
    >
      Donate Now
    </button>

  </div>
</>


);
}

export default MoneyDonation;
