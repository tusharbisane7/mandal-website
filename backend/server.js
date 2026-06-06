import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import http from "http";
import { Server } from "socket.io";

import sequelize from "./config/database.js";

/*
MODELS
*/
import User from "./models/User.js";
import "./models/Gallery.js";
import "./models/Donation.js";
import "./models/Ticker.js";
import "./models/Notice.js";
import "./models/Chat.js";
import "./models/Group.js";
import "./models/GroupMember.js";
import "./models/GroupMessage.js";

/*
ROUTES
*/
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import tickerRoutes from "./routes/tickerRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

/*
SOCKET
*/
import socketHandler from "./socket/socketHandler.js";

dotenv.config();

const app = express();

/*
MIDDLEWARE
*/
app.use(
cors({
origin: [
"http://localhost:5173",
"https://mandal-website-xi.vercel.app"
],
credentials: true,
})
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

/*
STATIC FILES
*/
app.use(
  "/uploads",
  express.static("uploads")
);

/*
API ROUTES
*/
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/donations", donationRoutes);
app.use("/expenses", expenseRoutes);
app.use("/events", eventRoutes);
app.use("/ticker", tickerRoutes);
app.use("/gallery", galleryRoutes);
app.use("/notice", noticeRoutes);
app.use("/chat", chatRoutes);

/*
HOME ROUTE
*/
app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "Ganesh Mandal Backend Running",
  });
});

/*
CREATE ADMIN
*/
const createAdmin =
  async () => {
    try {
      const admin =
        await User.findOne({
          where: {
            username:
              "tushar7",
          },
        });

      if (!admin) {
        const hashedPassword =
          await bcrypt.hash(
            "2004",
            10
          );

        await User.create({
          fullName:
            "Tushar Admin",

          username:
            "tushar7",

          email:
            "admin@mandal.com",

          password:
            hashedPassword,

          role:
            "admin",
        });

        console.log(
          "✅ Admin Created"
        );
      } else {
        console.log(
          "✅ Admin Already Exists"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

/*
SOCKET SERVER
*/
const server = http.createServer(app);

const io = new Server(server, {
cors: {
origin: [
"http://localhost:5173",
"https://mandal-website-xi.vercel.app"
],
methods: ["GET", "POST"],
credentials: true,
},
});

socketHandler(io);

/*
START SERVER
*/
const PORT = process.env.PORT || 5000;

sequelize
.sync()
.then(async () => {
console.log("✅ Database Connected");

await createAdmin();

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server Running On Port ${PORT}`);
});

})
.catch((error) => {
console.log("❌ Database Error:", error);
});