import React,{useState, useEffect} from "react"
import axios from "axios"
var dateObj = new Date();
function PaymentFilter(){
    const [pupils, setPupils]=useState([])
    const [students, setStudents]=useState([])
    const [test,setTest]=useState([])
    // const[w,setW]=useState([])
    // const [group, setGroup]=useState([])
    const[pupilPay,setPupilPay]=useState("")

      // console.log(typeof dateObj.getMonth())
    const options= [
        {
          name: 'yanvar',
          value: '1',
        },
        {
          name: 'fevral',
          value: '2',
        },
        {
          name: 'mart',
          value: '3',
        },
        {
          name: 'aprel',
          value: '4',
        },
           {
          name: 'may',
          value: '5',
        },
        {
          name: 'iyun',
          value: '6',
        },
        {
          name: 'iyul',
          value: '7',
        },
        {
          name: 'avgust',
          value: '8',
        },
        {
            name: 'sentabr',
            value: '9',
          },
          {
            name: 'oktabr',
            value: '10',
          },
          {
            name: 'noyabr',
            value: '11',
          },
          {
            name: 'dekabr',
            value: '12',
          },
      ]
    useEffect(()=>{
        async function getPupils(){
          const res = await axios.get('https://edu-uz.herokuapp.com/pupils')
          
            setPupils(res.data)
            setStudents(res.data)
         }
         getPupils() 
            
        },[])
        // useEffect(()=>{
        //     async function getGroup(){
        //       const res = await axios.get('https://edu-uz.herokuapp.com//eduGroup')
              
        //         setGroup(res.data)
        //      }
        //      getGroup() 
                
        //     },[])

        useEffect(()=>{
            setPupilPay(students)
            pupils.map(val=>{
               
                    val.paymet.find(a=>{
                        if(a.month==dateObj.getMonth()){
                          // 1-yol

                       // for (let i = 0; i < students.length; i++) {
                          //   if(val._id===students[i]._id){
                          //     console.log(students[i]);
                          //     students.splice(i,1)
                          //   }
                          // }
                          
                          // 2-yo'l

                          // students.filter((a)=>{
                          //   if(a._id==val._id){
                          //     console.log(val)
                          //     setTest(students)
                          //   }
                          // })

                          // 3-yo'l
                          const p=students.findIndex(x=>x._id===val._id)
                          // console.log(p);
                          students.splice(p,1)
                          // !delete students[p]
                          

                        } 
                      })
                      // }
                    // const a=val.paymet.find((a)=>a.month==(dateObj.getMonth()+1))
                    // console.log(val);
                    })
                    setTest(students)
                  },[pupilPay])
             
    return(
        <>
            <div className="container">
               
                <button className="btn btn-primary" onClick={()=>setPupilPay("ok")}>To'lov qilmagan O'quvchilar</button>
              
          <div className="">
                    
                    <table className="table w-100">
                    <thead>
                      <tr>
                        <th scope="col">#</th>  
                        <th scope="col">First</th>
                        <th scope="col">group</th>
                        <th scope="col">tel</th>
                        {/* <th scope="col">Month</th> */}
                        {/* <th scope="col">Cost</th> */}
                       </tr>
                    </thead>
                    <tbody >
                    {
                        test.map((elem,index)=>{
                            return(
                              <tr key={elem._id}>
                                <th scope="row">{index+1}</th>
                                <td>{elem.name}</td>                                    
                                <td>{elem.group}</td>
                                <td>{(dateObj.getMonth())+1}</td>
                                {/* <td>{}</td> */}
                              </tr>
                          )
                        })
                    }  
                    </tbody>
                    </table>
                    </div>
    

      
            </div>
        </>
    )
  }
export default PaymentFilter