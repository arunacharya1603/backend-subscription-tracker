import nodemailer from 'nodemailer';
import { EMAIL_PASSWORD } from './env.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'captainamerica15main@gmail.com',
        pass: EMAIL_PASSWORD
    }
});

export default transporter;

export const accountEmail = 'captainamerica15main@gmail.com';
