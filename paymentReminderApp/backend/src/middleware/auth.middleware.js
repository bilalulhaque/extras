import { admin } from "../../index.js";

function validateIdToken(req, res, next) {
  const idToken = req.headers.authorization;

  if (idToken && idToken.startsWith("Bearer ")) {
    const token = idToken.split(" ")[1];

    admin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        req.user = decodedToken;
        next();
      })
      .catch((error) => {
        console.error("Error verifying token:", error);
        res.status(401).json({ error: "Unauthorized" });
      });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}

export default validateIdToken;
