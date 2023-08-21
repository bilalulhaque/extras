import './App.css';
import CreatePaymentForm from './views/create-payment.view';
import PaymentDetails from './views/paymentList.view';
import SignIn from './views/signin.views';
import SignupForm from './views/signup.views';
import UpdatePaymentForm from "./views/update-payment.view.js"
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<SignIn />}></Route>
        <Route path='signup' element={<SignupForm />}></Route>
        <Route path='payments' element={<PaymentDetails />}></Route>
        <Route path='create-payment' element={<CreatePaymentForm />}></Route>
        <Route path='update-payment/:paymentId' element={<UpdatePaymentForm />}></Route>
      </Routes>
    </div>
  );
}

export default App;
