import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), 'server', '.env') });


const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM;

if (!SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY n'est pas défini dans .env");
}
if (!EMAIL_FROM) {
  throw new Error("EMAIL_FROM n'est pas défini dans .env");
}

sgMail.setApiKey(SENDGRID_API_KEY);

export const sendEmail = async (submission) => {
  const msg = {
    to: submission.email,
    from: EMAIL_FROM,
    subject: 'Formulaire reçu !',
    html: `
      <h3>Nouvelle inscription</h3>
      <p><strong>Nom:</strong> ${submission.firstName} ${submission.lastName}</p>
      <p><strong>Email:</strong> ${submission.email}</p>
      <p>Merci pour votre soumission.</p>
    `
  };

  try {
    const result = await sgMail.send(msg);
    console.log('Email envoyé via SendGrid:', result[0].statusCode);
  } catch (err) {
    console.error("Erreur SendGrid:", err.response?.body || err.message);
    //throw err;
  }
};