const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();
const usersDb = db.collection("users");

// run at 8:00 am every day
exports.dailyEmail = functions.pubsub.schedule("0 8 * * *").onRun(context => {
  const nodemailer = require("nodemailer");

  let transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    auth: {
      user: "digitalsignage@uah.edu",
      pass: functions.config().smtp.password
    }
  });

  const html = `This is The Cube`;

  let will = "freeman";

  transporter
    .sendMail({
      from: "digitalsignage@uah.edu",
      to: "hohosanta@me.com",
      subject: "New User - Telepark",
      html: html
    })
    .then(info => {
      console.log("Daily email sent");
    })
    .catch(e => console.error(e));

  return null;
});

exports.signUp = functions.https.onCall(
  async (data, context) =>
    new Promise((resolve, reject) => {
      usersDb
        .where("email", "==", data.email)
        .get()
        .then(snap => {
          // user already exists
          if (!snap.empty) {
            resolve({
              result: "exists"
            });
            return;
          }

          usersDb
            .add({
              email: data.email
            })
            .then(docref => {
              console.log("created", docref.id);
              resolve({ result: "created" });
            })
            .catch(error => {
              console.error(error);
              resolve({ result: "failed" });
            });
        });
    })
);
