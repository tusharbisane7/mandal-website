import { useEffect, useState } from "react";
import API from "../../services/axios";
import Navbar from "../../components/Navbar/Navbar";

function ManageEvents() {
  const [events, setEvents] =
    useState([]);

  const [form, setForm] =
    useState({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
    });

  const loadEvents =
    async () => {
      try {
        const res =
          await API.get(
            "/events/all"
          );

        setEvents(
          res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    loadEvents();
  }, []);

  const createEvent =
    async (e) => {
      e.preventDefault();

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await API.post(
          "/events/create",
          form,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "Event Created Successfully"
        );

        setForm({
          title: "",
          description: "",
          date: "",
          time: "",
          location: "",
        });

        loadEvents();
      } catch (error) {
        console.log(error);
      }
    };

  const deleteEvent =
    async (id) => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await API.delete(
          `/events/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        loadEvents();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>
          Manage Events
        </h1>

        <form
          onSubmit={
            createEvent
          }
        >
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Description"
            value={
              form.description
            }
            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target.value,
              })
            }
          />

          <input
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm({
                ...form,
                date:
                  e.target.value,
              })
            }
          />

          <input
            type="time"
            value={form.time}
            onChange={(e) =>
              setForm({
                ...form,
                time:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Location"
            value={
              form.location
            }
            onChange={(e) =>
              setForm({
                ...form,
                location:
                  e.target.value,
              })
            }
          />

          <button
            type="submit"
          >
            Create Event
          </button>
        </form>

        <hr />

        <h2>
          All Events
        </h2>

        {events.map(
          (event) => (
            <div
              key={event.id}
            >
              <h3>
                {
                  event.title
                }
              </h3>

              <p>
                {
                  event.description
                }
              </p>

              <p>
                📅
                {event.date}
              </p>

              <p>
                ⏰
                {event.time}
              </p>

              <p>
                📍
                {
                  event.location
                }
              </p>

              <button
                onClick={() =>
                  deleteEvent(
                    event.id
                  )
                }
              >
                Delete
              </button>

              <hr />
            </div>
          )
        )}
      </div>
    </>
  );
}

export default ManageEvents;