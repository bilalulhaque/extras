import { admin } from "../../index.js";

const getPaymentDetails = async (req, res) => {
  const userId = req.headers['userid'];

  try {
    let lst = [];

    console.log(userId)
    const snapshot = await admin.firestore().collection("payments").get();
    snapshot.forEach((doc) => {
      if(doc.data().userId == userId && doc.data().deleteStatus == false){
        lst.push({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          dueDate: doc.data().dueDate,
          paid: doc.data().paid,
          userId: doc.data().userId
        })
      }
    });

    res.status(200).json({ data: lst });
  } catch (error) {
    console.error("Error getting payment details:", error);
    res.status(500).json({ error: "Error getting payment details" });
  }
};

const addPaymentDetails = async (req, res) => {
  const { title, description, dueDate } = req.body;
  const userId = req.headers['userid'];
  try {
    if (req.user.uid !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const paymentRef = admin.firestore().collection("payments").doc();

    await paymentRef.set({
      userId,
      title,
      description,
      dueDate: admin.firestore.Timestamp.fromDate(new Date(dueDate)),
      paid: false,
      deleteStatus: false,
    });

    res.status(201).json({ message: "Payment details added successfully" });
  } catch (error) {
    console.error("Error adding payment details:", error);
    res.status(500).json({ error: "Error adding payment details" });
  }
};

const getSpecificPaymentDetails = async (req, res) => {
  const userId = req.headers['userid'];
  const paymentId = req.params.paymentId;
  console.log(req.params)

  try {
    let obj = undefined;
    const snapshot = await admin.firestore().collection("payments").get();
    snapshot.forEach((doc) => {
      if(doc.data().userId == userId && doc.data().deleteStatus == false && doc.id === paymentId){
        obj = {
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          dueDate: doc.data().dueDate,
          paid: doc.data().paid,
          userId: doc.data().userId
        }
      }
    });

    res.status(200).json({ data: obj });
  } catch (error) {
    console.error("Error getting payment details:", error);
    res.status(500).json({ error: "Error getting payment details" });
  }
};

const editPaymentDetails = async (req, res) => {
  const paymentId = req.params.paymentId;
  const { title, description } = req.body;

  try {
    const paymentRef = admin.firestore().collection("payments").doc(paymentId);

    await paymentRef.update({
      title,
      description,
    });

    res.status(200).json({ message: "Payment details updated successfully" });
  } catch (error) {
    console.error("Error editing payment details:", error);
    res.status(500).json({ error: "Error editing payment details" });
  }
};

const deletePaymentDetails = async (req, res) => {
  const paymentId = req.params.paymentId;

  try {
    const paymentRef = admin.firestore().collection("payments").doc(paymentId);

    await paymentRef.update({
      deleteStatus: true,
    });

    res.status(200).json({ message: "Payment details deleted successfully" });
  } catch (error) {
    console.error("Error deleted payment details:", error);
    res.status(500).json({ error: "Error deleted payment details" });
  }
};

const markPaidPaymentDetails = async (req, res) => {
  const paymentId = req.params.paymentId;

  try {
    const paymentRef = admin.firestore().collection("payments").doc(paymentId);

    await paymentRef.update({
      paid: true,
    });

    res.status(200).json({ message: "Payment marked as paid successfully" });
  } catch (error) {
    console.error("Error in marking payment details:", error);
    res.status(500).json({ error: "Error in marking payment details" });
  }
};

export {
  addPaymentDetails,
  editPaymentDetails,
  deletePaymentDetails,
  markPaidPaymentDetails,
  getPaymentDetails,
  getSpecificPaymentDetails
};
