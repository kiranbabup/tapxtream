const { setGlobalOptions } = require("firebase-functions/v2");
const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();

setGlobalOptions({ maxInstances: 10 });

exports.profilePreview = onRequest({ timeoutSeconds: 60 }, async (req, res) => {
  try {
    console.log("Function triggered");

    const urlParts = req.path.split("/");
    const uid = urlParts[urlParts.length - 1];

    if (!uid) {
      return res.send("Invalid user");
    }

    const doc = await admin.firestore().collection("users").doc(uid).get();

    if (!doc.exists) {
      return res.send("User not found");
    }

    const user = doc.data();

    const title = `${user.firstName || ""} ${user.middleName || ""} ${user.lastName || ""}`;
    const description = user.designation || "TapXtream Profile";

    const image =
      user.profileImage ||
      user.companyLogo ||
      "https://firebasestorage.googleapis.com/v0/b/tapxtream-64eea.appspot.com/o/websiteImages%2Ftapxtream.png?alt=media&token=d070d54d-2b85-44c4-9d78-bb3c60c5c5e7";

    const redirectUrl = `https://tapxtream.com/profile/${uid}`;

    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>

          <meta property="og:title" content="${title}" />
          <meta property="og:description" content="${description}" />
          <meta property="og:image" content="${image}" />
          <meta property="og:url" content="${redirectUrl}" />
          <meta property="og:type" content="website" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="${title}" />
          <meta name="twitter:description" content="${description}" />
          <meta name="twitter:image" content="${image}" />

        </head>
        <body>
          <script>window.location.href="${redirectUrl}"</script>
        </body>
      </html>
    `);

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).send("Error loading profile");
  }
});