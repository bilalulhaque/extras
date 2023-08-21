import express from "express";
import * as user from "../controller/user.controller.js"
import * as payment from "../controller/payment.controller.js";
import validateIdToken from "../middleware/auth.middleware.js";

const router = (app) => {
  var apiRoutes = express.Router();

  // Router load
  apiRoutes.post("/signup", user.signup);
  apiRoutes.post("/signin", user.signin);

  apiRoutes.get("/payment-details", validateIdToken, payment.getPaymentDetails)
  apiRoutes.post("/payment-details", validateIdToken, payment.addPaymentDetails)
  
  apiRoutes.get("/payment-details/:paymentId", validateIdToken, payment.getSpecificPaymentDetails)
  apiRoutes.put("/payment-details/:paymentId", validateIdToken, payment.editPaymentDetails)
  apiRoutes.delete("/payment-details/:paymentId", validateIdToken, payment.deletePaymentDetails)
  apiRoutes.patch("/payment-details/:paymentId", validateIdToken, payment.markPaidPaymentDetails)




  app.use("/api", apiRoutes)
};

export default router;