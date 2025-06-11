import express from "express";
import "dotenv/config";
import connectDB from "./config/connectDB";
import cors from "cors";
import cookieParser from "cookie-parser";
import corsConfig from "./config/corsConfig";
import authRouter from "./routes/auth.route";
import errorHandler from "./middleware/errorHandler";
import { NODE_ENV, PORT, SESSION_SECRET } from "./constants/getENV";
import userRouter from "./routes/user.route";
import authenticate from "./middleware/authenticate";
import session from "express-session";
import passport from "./config/passport";
import instructorRouter from "./routes/instructor.route";
import courseRouter from "./routes/course.route";
import lectureRouter from "./routes/lecture.route";
import cartRouter from "./routes/cart.route";
import purchaseRouter from "./routes/purchase.route";
import wishlistRouter from "./routes/wishlist.route";
import paymentRouter from "./routes/payment.route";

const port: String | Number = PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsConfig));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/course", courseRouter);
app.use("/user", authenticate, userRouter);
app.use("/instructor", authenticate, instructorRouter);
app.use("/lecture", authenticate, lectureRouter);
app.use("/wishlist", authenticate, wishlistRouter);
app.use("/cart", authenticate, cartRouter);
app.use("/purchase", authenticate, purchaseRouter);
app.use("/payment", authenticate, paymentRouter);

app.use(errorHandler);

app.listen(port, () => {
  connectDB();
  console.log("Listening on port: " + port);
});
