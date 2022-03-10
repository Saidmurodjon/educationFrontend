import React,{useState, useEffect} from "react"
import axios from "axios"
function Payment(){
 
    const [input, setInput]=useState('')
    const[pupil,setPupil]=useState([])
    const [users, setUsers]=useState([])
  
    useEffect(()=>{
     async function getUsers(){
        const res = await axios.get('http://localhost:5000/pupils')
       
        setUsers(res.data)
     }
     getUsers()
        // console.log(user);   
        
    },[])
    useEffect(()=>{
        setPupil([])
        users.filter(val=>{
            if(val.name.toLowerCase().includes(input.toLowerCase())){
                setPupil(pupil=>[...pupil,val])
            }
        })
    },[input])
     const Submit =(e)=>{
 
    }
    const [costStyle, setCostStyle]=useState({
        display:'d-none',
    
    })
    // var k=''
    const[student,setStudent]=useState([])
    const pay=async (elem)=>{
      if(costStyle.display==='d-none'){
          setCostStyle(costStyle.display="d-block")
      }
       setStudent(elem)  
    //    return k='1'
    }
    //   console.log(k);

    const Cancel=()=>{
        if(costStyle.display==='d-block'){
            setCostStyle(costStyle.display="d-none")
        }
        
    }
    const options= [
        {
          name: 'yanvar',
          value: 'yanvar',
        },
        {
          name: 'fevral',
          value: 'fevral',
        },
        {
          name: 'mart',
          value: 'mart',
        },
        {
          name: 'aprel',
          value: 'aprel',
        },
           {
          name: 'may',
          value: 'may',
        },
        {
          name: 'iyun',
          value: 'iyun',
        },
        {
          name: 'iyul',
          value: 'iyul',
        },
        {
          name: 'avgust',
          value: 'avgust',
        },
        {
            name: 'sentabr',
            value: 'sentabr',
          },
          {
            name: 'oktabr',
            value: 'oktabr',
          },
          {
            name: 'noyabr',
            value: 'noyabr',
          },
          {
            name: 'dekabr',
            value: 'dekabr',
          },
      ]
    const[pupilPay,setPupilPay]=useState({
        month:'',
        cost:''
    })
    console.log(pupilPay);
    const changeHandler=(e)=>{
        setPupilPay({...pupilPay,[e.target.name]:e.target.value})
    }
// To'lov qilish uchun function
const studentPay=async(student)=>{
    let res=await axios.put(`http://localhost:5000/pupils/pay/${student._id}`,pupilPay)
    console.log(res);
}

    return(
       <>
            <div className="container">
                <h1>Payment Page</h1>
                <nav className="navbar navbar-light bg-light">
                    <div className="container-fluid">
                        <form className="d-flex"onSubmit={Submit}>
                            <input
                                className="form-control w-75"
                                type="text"
                                placeholder="Search" 
                                onChange={(e)=>setInput(e.target.value)}
                            />
                            <input type="submit"/>
                        </form>
                    </div>
                </nav>
                {/* Qiqiruvdagi o`quvchilar */}
                <div className="">
                    
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>  
                    <th scope="col">First</th>
                    <th scope="col">group</th>
                    <th scope="col">tel</th>
                    <th scope="col">Pay</th>

                    </tr>
                </thead>
                <tbody >
                {
                    pupil.map((elem,index)=>{
                        return(
                           
                              
                                    <tr key={elem._id} onClick={()=>pay(elem)}>
                                    <th scope="row">{index+1}</th>
                                    <td>{elem.name}</td>                                    <td>{elem.group}</td>
                                    <td>{elem.tel}</td>
                                    </tr>
                                    
                               
                            
                        )
                    })
                }  
                </tbody>
                </table>
                </div>
                {/* To`lov oynasi */}
                <div className={costStyle.display}>
                    <h1>Id:{student._id}</h1>
                    <h1>{student.name}</h1>
                    <p>{student.group}</p>
                    {/* <img className="img-thumbnail" src={`http://localhost:5000/uploads/${student.imagePath}`} alt={student.imagePath} /> */}
                    <form action="">
                    <select className="form-select w-25 d-inline" id=""  
                        onChange={changeHandler} value={pupilPay.month} name="month">
                        {options.map(item => (
                            <option key={item.value} value={item.value}>
                            {item.name}
                            </option>
                        ))}
                    </select>
                    <input
                        className="form-control d-inline w-25"
                        type="text"
                        name="cost"
                        placeholder="cost"
                        value={pupilPay.cost}
                        onChange={changeHandler}
                    />
                    </form>
                    <button className="btn btn-primary m-3"
                            onClick={()=>Cancel()}
                            >Cancel</button>
                            <button className="btn btn-danger m-3"
                            onClick={()=>studentPay(student)}
                            >Ok</button>
                </div>
            </div>
       </>
    )
}
export default Payment