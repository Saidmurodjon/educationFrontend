import {
    Routes,
    Route
  } from "react-router-dom";
import Payment from '../view/payment/Payment';
import ProfilUs from '../view/ProfilUs/ProfilUs'

function Router(){
    
    return (
        <>
         <Routes>
            <Route path='/payment' element={<Payment />} />
            <Route path='/profilus' element={<ProfilUs />} />
         </Routes>
        </>
       );

}

export default Router