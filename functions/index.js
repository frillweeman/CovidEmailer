const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();
const usersDb = db.collection("users");

// run at 8:00 am every day
exports.dailyEmail = functions.pubsub
  .schedule("0 8 * * *")
  .onRun(async context => {
    const nodemailer = require("nodemailer");

    let transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      auth: {
        user: functions.config().email.username,
        pass: functions.config().email.password
      }
    });

    const html = `This ${4 + 5} is The Cube\n\n2 New Lines`;

    // initialize array
    let emails = [];

    // populate array
    const querySnapshot = await usersDb.get();

    for (doc of querySnapshot.docs) {
      emails.push(doc.data().email);
    }

    console.log("emails:", emails.toString());

    await transporter.sendMail({
      from: "projects@makeithackin.com",
      to: "Undislosed Recepients <null@example.com>",
      bcc: emails,
      subject: `X Cases Today!!!`,
      html: html
    });
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
