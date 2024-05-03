import { Result, right } from '@core/result/Result';
import * as dotenv from 'dotenv';
import twilio from 'twilio';
// // Load environment variables from a .env file
dotenv.config();

// // Your Twilio Account SID and Auth Token
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// // Create an instance of the Twilio client
const client = twilio(accountSid, authToken);

// // Function to generate a random 4-digit number
function generateRandom4DigitNumber() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// // Function to send SMS
export async function sendSMS(to: string): Promise<any> {
  const otp = generateRandom4DigitNumber();
  const body = `Your Exit Pro Verification Code is: ${otp}`;
  try {
    const message = await client.messages.create({
      body: body,
      to: to,
      from: process.env.TWILIO_PHONE_NUMBER // Your Twilio phone number
    });
    console.log('Message sent successfully with SID:', message.sid);

    return right(otp);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

export async function sendWarning(to: string, name: string) {
  try {
    const message = await client.messages.create({
      body: `${name} you are running late. Please return to the campus immediately`,
      to: '+91' + to,
      from: process.env.TWILIO_PHONE_NUMBER // Your Twilio phone number
    });
    console.log('Message sent successfully with SID:', message.sid);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}
