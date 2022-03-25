import React,{useState, useEffect} from "react"
import axios from "axios"
var dateObj = new Date();
function PaymentFilter(){
    const [pupils, setPupils]=useState([])
    const [students, setStudents]=useState([])
    const [groups,setGroups]=useState([])

    useEffect(()=>{
        async function getPupils(){
          const res = await axios.get('https://edu-uz.herokuapp.com/pupils')
          
            setPupils(res.data)
            setStudents(res.data)
         }
         getPupils() 
            
        },[])
    useEffect(()=>{
      async function getGroups(){
        const res = await axios.get('https://edu-uz.herokuapp.com/eduGroup')
        
        setGroups(res.data)
      }
      getGroups() 
              
    },[])
   
        useEffect(()=>{
          for (let i = 0; i < pupils.length; i++) {
            pupils[i].paymet.filter((elem)=>{
              if(elem.month===(dateObj.getMonth()+1).toString()){
                const p=students.findIndex(x=>x._id===pupils[i]._id)
                      students.splice(p,1)
              }
            })                
          }
        })

    return(
        <>
            <div className="container">
               
                {/* <button className="btn btn-primary" onClick={()=>F()}>To'lov qilmagan O'quvchilar</button> */}
              <div className="borrower">
                    <div className="row justify-content-center">
                      <div className="col-md-4">
                      <h2 className="">To'lov qilmagan o'quvchilar</h2>
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-md-12">
                      <table className="table table-bordered border-dark w-100">
                    <thead>
                      <tr>
                        <th scope="col">#</th>  
                        <th scope="col">FirstName</th>
                        <th scope="col">tel</th>
                        <th scope="col">Group</th>
                        <th scope="col">Teacher</th>
                        <th scope="col">Qarzdor</th>

                        
                       </tr>
                    </thead>
                    <tbody >
                    {
                        students.map((elem,index)=>{
                          let p={}
                          for (let i = 0; i < groups.length; i++) {
                            if(elem.group===groups[i].name){
                              p=groups[i]
                            }
                            
                          }
                            return(
                              <tr key={elem._id}>
                                <th scope="row">{index+1}</th>
                                <td>{elem.name}</td> 
                                <td>{elem.tel}</td>                                    
                                <td>{elem.group}</td>
                                <td>{p.teacherName}</td>
                                <td>{p.price} so'm</td>
                                {/* <td>{}</td> */} 
                              </tr>
                          )
                        })
                    }  
                    </tbody>
                    </table>
                      </div>
                    </div>
                    
                   
              </div>
    

      
            </div>
        </>
    )
  }
export default PaymentFilter