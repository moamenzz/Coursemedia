import { Resend } from "resend";
import { RESEND_SECRET } from "../constants/getENV";

const resend = new Resend(RESEND_SECRET);

export default resend;
