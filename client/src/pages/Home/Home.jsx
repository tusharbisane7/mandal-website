import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";


function Home() {

const [showAI, setShowAI] =
  useState(false);

const [message, setMessage] =
  useState("");

const [chat, setChat] =
  useState([
    {
      sender: "bot",
      text:
        "🙏 Ganpati Bappa Morya! How can I help you?",
    },
  ]);

  const [leaders, setLeaders] =
    useState([]);

  const [notices, setNotices] =
    useState([]);

  const loadLeaders =
    async () => {
      try {
        const res =
          await API.get(
            "/donations/leaderboard"
          );

        setLeaders(
          res.data || []
        );
      } catch (error) {
        console.log(error);
      }
    };

  const loadNotices =
    async () => {
      try {
        const res =
          await API.get(
            "/notice"
          );

        setNotices(
          res.data || []
        );
      } catch (error) {
        console.log(error);
      }
    };
  const [ticker, setTicker] = useState(
    "🙏 Welcome to BAAL MITRA GANESH UTSAV MANDAL 🙏 Ganpati Bappa Morya 🙏"
  );

  const [events, setEvents] = useState([]);
  const [donations, setDonations] = useState([]);

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  const loadTicker = async () => {
    try {
      const res = await API.get("/ticker");

      if (res.data?.message) {
        setTicker(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadEvents = async () => {
    try {
      const res = await API.get("/events/all");
      setEvents(res.data.slice(0, 3));
    } catch (error) {
      console.log(error);
    }
  };

  const loadDonations = async () => {
    try {
      const res = await API.get("/donations/all");
      setDonations(res.data);
    } catch (error) {
      console.log(error);
    }
  };

const processMessage = (
  text
) => {

  let reply =
    "🙏 Please contact Mandal Admin.";

  const msg =
    text.toLowerCase();

  if (
    msg.includes("hi") ||
    msg.includes("hello")
  ) {
    reply =
      "🙏 Ganpati Bappa Morya! Welcome to Baal Mitra Ganesh Utsav Mandal.";
  }

  else if (
    msg.includes("event")
  ) {
    reply =
      "🎉 Check Upcoming Events section.";
  }

  else if (
    msg.includes("donation")
  ) {
    reply =
      "💰 Donate from Donation Page.";
  }

  else if (
    msg.includes("member")
  ) {
    reply =
      "🪪 Register from Become Member section.";
  }

  else if (
    msg.includes("contact")
  ) {
    reply =
      "📞 Contact: +91 9673279153";
  }

  setChat((prev) => [
    ...prev,
    {
      sender: "user",
      text,
    },
    {
      sender: "bot",
      text: reply,
    },
  ]);
};

const sendMessage = () => {

  if (!message.trim())
    return;

  processMessage(
    message
  );

  setMessage("");
};

const askQuestion = (
  text
) => {

  processMessage(
    text
  );

};

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    loadTicker();
    loadEvents();
    loadDonations();
loadLeaders();
loadNotices();


    const targetDate = new Date("2026-09-11");

    const timer = setInterval(() => {
      const now = new Date();

      const diff = targetDate - now;

      setCountdown({
        days: Math.floor(
          diff / (1000 * 60 * 60 * 24)
        ),
        hours: Math.floor(
          (diff %
            (1000 *
              60 *
              60 *
              24)) /
            (1000 * 60 * 60)
        ),
        minutes: Math.floor(
          (diff %
            (1000 * 60 * 60)) /
            (1000 * 60)
        ),
      });
    }, 1000);

    return () =>
      clearInterval(timer);
  }, []);

  const totalDonation =
    donations.reduce(
      (sum, item) =>
        sum +
        Number(item.amount || 0),
      0
    );

  return (
    <>
      <Navbar />

      <div className="ticker-bar">
        <marquee>
          {ticker}
        </marquee>
      </div>

      {/* HERO */}

      <section
        className="hero-section"
        data-aos="zoom-in"
      >
        <div className="hero-content">
          <img
            src="/logo.png"
            alt="Logo"
            className="hero-logo"
          />

          <h1>
            बालमित्र गणेश उत्सव मंडल 
          </h1>

          <h3>
            खिरणीबागपुरा, अचलपुर शहर 
          </h3>

          <p>
            Celebrating Tradition,
            Culture and Community
            Service Through Ganesh
            Utsav.
          </p>

          <div className="hero-buttons">
            <Link to="/events">
              <button>
                View Events
              </button>
            </Link>

            <Link to="/money-donation">
              <button>
                Donate Now
              </button>
            </Link>
          </div>
        </div>
      </section>

?

<section
  className="leaderboard-section"
  data-aos="zoom-in"
>
  <div className="container">

    <h2>
      🏆 Top Donors
    </h2>

    <div className="leader-grid">

      {leaders.length > 0 ? (
        leaders.map(
          (
            donor,
            index
          ) => (
            <div
              key={index}
              className="leader-card"
            >
              <div className="rank">
                #{index + 1}
              </div>

              <h3>
                {donor.name}
              </h3>

              <p>
                ₹
                {Number(
                  donor.amount
                ).toLocaleString()}
              </p>
            </div>
          )
        )
      ) : (
        <p>
          No Donations Yet
        </p>
      )}

    </div>

  </div>
</section>

      {/* COUNTDOWN */}

      <section
        className="countdown-section"
        data-aos="fade-up"
      >
        <h2>
          🕉 Ganesh Chaturthi
          Countdown
        </h2>

        <div className="countdown-grid">
          <div className="count-card">
            <h1>
              {countdown.days}
            </h1>
            <p>Days</p>
          </div>

          <div className="count-card">
            <h1>
              {countdown.hours}
            </h1>
            <p>Hours</p>
          </div>

          <div className="count-card">
            <h1>
              {
                countdown.minutes
              }
            </h1>
            <p>Minutes</p>
          </div>
        </div>
      </section>

      {/* STATS */}

      <section
      
        className="stats-section"
        data-aos="zoom-in"
      >
           <h2>
          Statics
        </h2>
        <div className="stat-card">
          <h2>25+</h2>
          <p>Members</p>
        </div>

        <div className="stat-card">
          <h2>1+</h2>
          <p>Events</p>
        </div>

        <div className="stat-card">
          <h2>50+</h2>
          <p>Donations</p>
        </div>

        <div className="stat-card">
          <h2>1+</h2>
          <p>Years Service</p>
        </div>
      </section>

      {/* EVENTS */}

      <section
        className="container"
        data-aos="fade-right"
      >
        <h2>
          Upcoming Events
        </h2>

        <div className="cards">
          {events.map(
            (event) => (
              <div
                className="card"
                key={event.id}
                data-aos="flip-left"
              >
                <h3>
                  {event.title}
                </h3>

                <p>
                  {
                    event.description
                  }
                </p>

                <p>
                  📅 {event.date}
                </p>

                <p>
                  📍
                  {
                    event.location
                  }
                </p>

                <p>
                  ⏰ {event.time}
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* ABOUT */}

      <section
        className="container"
        data-aos="fade-up"
      >
        <h2>
          About Our Mandal
        </h2>

        <p className="about-text">
          BAAL MITRA GANESH
          UTSAV MANDAL is
          dedicated to
          preserving Indian
          culture, promoting
          social welfare,
          encouraging youth
          participation and
          organizing cultural
          activities for the
          betterment of society.
        </p>
      </section>

      {/* DONATION */}

      <section
        className="transparency-section"
        data-aos="zoom-in"
      >
        <h2>
          Donation Transparency
        </h2>

        <div className="stats-section">
          <div className="stat-card">
            <h2>
              ₹
              {totalDonation.toLocaleString()}
            </h2>
            <p>
              Total Donations
            </p>
          </div>

          <div className="stat-card">
            <h2>
              {
                donations.length
              }
            </h2>
            <p>
              Contributors
            </p>
          </div>
        </div>
      </section>



      {/* ACTIVITIES */}

      <section
        className="container"
        data-aos="fade-up"
      >
        <h2>
          Our Activities
        </h2>

        <div className="cards">
          <div className="card">
            <h3>
              🩸 Blood Donation
            </h3>
            <p>
              Organizing blood
              donation camps.
            </p>
          </div>

          <div className="card">
            <h3>
              📚 Education Support
            </h3>
            <p>
              Helping students
              and schools.
            </p>
          </div>

          <div className="card">
            <h3>
              🌳 Tree Plantation
            </h3>
            <p>
              Environmental
              initiatives.
            </p>
          </div>

          <div className="card">
            <h3>
              🎭 Cultural Programs
            </h3>
            <p>
              Promoting Indian
              traditions.
            </p>
          </div>
        </div>
      </section>


<section
  className="office-bearers-section"
  data-aos="fade-up"
>
  <h2>
    👑 Office Bearers
  </h2>

  <Swiper
    modules={[Autoplay]}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    loop={true}
    spaceBetween={20}
    breakpoints={{
      320: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 4,
      },
    }}
  >
    <SwiperSlide>
      <div className="bearer-card">
        <img
          src="/logo.png"
          alt="President"
        />

        <h3>
          Darshan Bhagwat
        </h3>

        <span>
          President ( अध्यक्ष )
        </span>

        <p>
          📞 9604887674
        </p>
      </div>
    </SwiperSlide>

    <SwiperSlide>
      <div className="bearer-card">
        <img
          src="/logo.png"
          alt="Secretary"
        />

        <h3>
          Gopal Ghode 
        </h3>

        <span>
          Co-President ( उपाध्यक्ष )
        </span>

        <p>
          📞 9876543211
        </p>
      </div>
    </SwiperSlide>

    <SwiperSlide>
      <div className="bearer-card">
        <img
          src="/logo.png"
          alt="Cashier"
        />

        <h3>
          Bhavesh Dadhale 
        </h3>

        <span>
          Cashier ( कोषाध्यक्ष )
        </span>

        <p>
          📞 9876543212
        </p>
      </div>
    </SwiperSlide>

     <SwiperSlide>
      <div className="bearer-card">
        <img
          src="/logo.png"
          alt="admin"
        />

        <h3>
          Tushar Bisane  
        </h3>

        <span>
          Admin ( ऐड्मिन  )
        </span>

        <p>
          📞 9067934163 
        </p>
      </div>
    </SwiperSlide>

    <SwiperSlide>
      <div className="bearer-card">
        <img
          src="/logo.png"
          alt="Co President"
        />

        <h3>
          अनॉनमौस 
        </h3>

        <span>
          Secretary ( सचिव )
        </span>

        <p>
          📞 9876543213
        </p>
      </div>
    </SwiperSlide>

  </Swiper>
</section>

      {/* MEMBER */}

      <section
        className="member-section"
        data-aos="fade-up"
      >
        <h2>
          Become A Member
        </h2>

        <p>
          Join our Mandal
          family and
          participate in
          cultural and social
          activities.
        </p>

        <Link to="/register">
          <button>
            Register Now
          </button>
        </Link>
      </section>

      {/* GALLERY */}

      {/* <section
        className="gallery-preview"
        data-aos="zoom-in"
      >
        <div className="container">
          <h2>
            📸 Gallery Preview
          </h2>

          <p>
            Explore memories
            from our Ganesh
            Utsav celebrations.
          </p>

          <Link to="/gallery">
            <button>
              View Gallery
            </button>
          </Link>
        </div>
      </section> */}

<section
  className="community-section"
  data-aos="fade-up"
>

  <h2>
    Join Our Community
  </h2>

  <div className="community-buttons">

    <a
      href="https://chat.whatsapp.com/GYybzCsjb8aE3pZJB06fIv?s=cl&p=a&mlu=3"
      target="_blank"
      rel="noreferrer"
    >
      <button className="whatsapp-btn">
        💬 Join WhatsApp Group
      </button>
    </a>

    <Link to="/complaints">
      <button className="complaint-btn">
        📝 Register Complaint
      </button>
    </Link>

  </div>

</section>


{/* AI Assistant Button */}

<div
  className="ai-assistant-btn"
  onClick={() =>
    setShowAI(true)
  }
>
  🤖
</div>

{/* AI Chat */}

{showAI && (
  <div className="ai-chatbox">

    <div className="chat-header">

      🤖 Mandal Assistant

      <button
        onClick={() =>
          setShowAI(false)
        }
      >
        ✕
      </button>

    </div>

    <div className="suggestions">

      <button
        onClick={() =>
          askQuestion(
            "events"
          )
        }
      >
        🎉 Events
      </button>

      <button
        onClick={() =>
          askQuestion(
            "donation"
          )
        }
      >
        💰 Donation
      </button>

      <button
        onClick={() =>
          askQuestion(
            "member"
          )
        }
      >
        🪪 Member
      </button>

      <button
        onClick={() =>
          askQuestion(
            "contact"
          )
        }
      >
        📞 Contact
      </button>

    </div>

    <div className="chat-body">

      {chat.map(
        (
          item,
          index
        ) => (
          <div
            key={index}
            className={
              item.sender
            }
          >
            {item.text}
          </div>
        )
      )}

    </div>

    <div className="chat-footer">

      <input
        type="text"
        value={message}
        onChange={(e) =>
          setMessage(
            e.target.value
          )
        }
        placeholder="Ask me..."
      />

      <button
        onClick={
          sendMessage
        }
      >
        Send
      </button>

    </div>

  </div>
)}
      {/* CONTACT */}

      <section
        className="contact-section"
        data-aos="fade-up"
      >
        <h2>
          संपर्क करा 
        </h2>

        <div className="contact-grid">
          <div className="contact-card">
            <h3>
              📍 पत्ता 
            </h3>
            <p>
              श्री हनुमान मंदिर खिरणीबागपुरा, अचलपुर शहर 
            </p>
          </div>

          <div className="contact-card">
            <h3>
              📞 फोन 
            </h3>
            <p>
              +91 9067934163
            </p>
          </div>

          <div className="contact-card">
            <h3>
              ✉ ईमेल 
            </h3>
            <p>
              info@ganeshmandal.com
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;