// import db from "../../index.js";

// const signup = async (req, res) => {
//   const randomId = Math.floor(1000 + Math.random() * 9000).toString();
//   let flag = 0;
//   try {
//     const snapshot = await db.collection("users").get();
//     snapshot.forEach((doc) => {
//       // console.log(doc.id, "=>", doc.data());
//       if (doc.data().email == req.body.email) {
//         flag = 1;
//       }
//     });

//     if (flag == 1)
//       return res.status(409).json({ message: "Email already exists!" });

//     const user = db.collection("users").doc(randomId);
//     await user.set({
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//       address: req.body.address,
//     });

//     return res
//       .status(201)
//       .json({ status: "Success", message: "User created successfully" });
//   } catch (error) {
//     res.status(500).json({
//       status: "Error",
//     });
//   }
// };

// export { signup };

import { admin } from "../../index.js";
import axios from "axios";

const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      name,
      email,
      password
    });

    const userDoc = {
      email: userRecord.email,
      uid: userRecord.uid,
    };

    await admin
      .firestore()
      .collection("users")
      .doc(userRecord.uid)
      .set(userDoc);

    res.status(201).json({ statusCode: 201, message: "User registered successfully" });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "Error signing up", message: error.message });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  // try {
  //   const userRecord = await admin.auth().getUserByEmail(email);
  //   const uid = userRecord.uid;

  //   const customToken = await admin.auth().

  //   res.status(200).json({ customToken, uid });

  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    const uid = userRecord.uid;
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA6UGnEIaVEp_u2t0V7tLpPbRATL7XtZPA`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );

    const idToken = response.data.idToken;
    res.status(200).json({ statusCode: 200, idToken, uid });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(401).json({ error: "Error signing in" });
  }
};

export { signup, signin };
