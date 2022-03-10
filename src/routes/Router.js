

import {
    
    Routes,
    Route
  } from "react-router-dom";
import Payment from '../view/payment/Payment';

function Router(){
    
    return (
        <>
         <Routes>
            <Route path='/payment' element={<Payment />} />
           
         </Routes>
        </>
       );

}

export default Router