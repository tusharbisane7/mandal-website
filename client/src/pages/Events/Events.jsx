import {
  useEffect,
  useState,
} from "react";

import API from "../../services/axios";
import Navbar from "../../components/Navbar/Navbar";

import AOS from "aos";
import "aos/dist/aos.css";

function Events() {
  const [events, setEvents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const loadEvents =
    async () => {
      try {
        const res =
          await API.get(
            "/events/all"
          );

        setEvents(
          Array.isArray(
            res.data
          )
            ? res.data
            : []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    loadEvents();
  }, []);

  return (
    <>
      <Navbar />

      <div className="events-page">

        <div
          className="events-hero"
          data-aos="zoom-in"
        >
          <h1>
            🎉 Mandal Events
          </h1>

          <p>
            Explore all upcoming
            celebrations, cultural
            programs and social
            activities organized by
            BAAL MITRA GANESH
            UTSAV MANDAL.
          </p>
        </div>

        {loading ? (
          <div className="loading-container">

            <div className="loader"></div>

            <h2>
              Loading Events...
            </h2>

          </div>
        ) : events.length ===
          0 ? (
          <div
            className="empty-state"
            data-aos="fade-up"
          >
            <h2>
              😔 No Events Found
            </h2>

            <p>
              Events will appear
              here when added by
              admin.
            </p>
          </div>
        ) : (
          <div className="events-grid">

            {events.map(
              (
                event,
                index
              ) => (
                <div
                  key={event.id}
                  className="event-card"
                  data-aos="fade-up"
                  data-aos-delay={
                    index * 100
                  }
                >

                  <div className="event-header">

                    <span className="event-badge">
                      Upcoming
                    </span>

                    <h2>
                      {
                        event.title
                      }
                    </h2>

                  </div>

                  <p className="description">
                    {
                      event.description
                    }
                  </p>

                  <div className="event-details">

                    <p>
                      📅{" "}
                      {
                        event.date
                      }
                    </p>

                    <p>
                      ⏰{" "}
                      {
                        event.time ||
                        "N/A"
                      }
                    </p>

                    <p>
                      📍{" "}
                      {
                        event.location ||
                        "Mandal Hall"
                      }
                    </p>

                  </div>

                </div>
              )
            )}

          </div>
        )}

      </div>
    </>
  );
}

export default Events;