import React,{useState, useEffect} from "react"
import axios from "axios"
import './Payment.css';
function Payment(){
  
  const [input, setInput]=useState('')
  const[pupil,setPupil]=useState([])
  const [users, setUsers]=useState([])
  const [show, setShow] = useState(false);
  const[student,setStudent]=useState([])
  
  const[pupilPay,setPupilPay]=useState({
    month:'',
    cost:''
  })
  
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
  useEffect(()=>{
    async function getUsers(){
      const res = await axios.get('http://localhost:5000/pupils')
      
        setUsers(res.data)
     }
     getUsers() 
        
    },[])
    useEffect(()=>{
        setPupil([])
        users.filter(val=>{
            if(val.name.toLowerCase().includes(input.toLowerCase())){
                setPupil(pupil=>[...pupil,val])
            }
        })
    },[input])
    
 
    const pay=async (elem)=>{
        setShow(!show);
       setStudent(elem)     
    }
 
    
    const Cancel=()=>{
      alert("Siz to'lov qilishni bekor qimochimisiz?")
      setShow(!show);
        
    }

    const changeHandler=(e)=>{
        setPupilPay({...pupilPay,[e.target.name]:e.target.value})
    }
// To'lov qilish uchun function
const studentPay=async(student)=>{
    let res=await axios.put(`http://localhost:5000/pupils/pay/${student._id}`,pupilPay)
    // setShow(!show);
    if(res.request.status=="200"){
      alert("To'lov muvaffqiyatli amalga oshirildi")
      setShow(!show); 
    }else{
      alert( "To'lov amalga oshirilmadi")
    }
} 

    return(
       <>
          <div className="container">
                <h4>Payment Page</h4>
                <div className="container mt-5">
                        <form className="d-flex">
                            <input
                                className="form-control w-75"
                                type="search"
                                placeholder="Search" 
                                onChange={(e)=>setInput(e.target.value)}
                            />
                         
                        </form>
                        <br />
                        <br />
                </div>
                {/* Qiqiruvdagi o`quvchilar table */}
                <div className="">
                    
                <table className="table w-75">
                <thead>
                  <tr>
                    <th scope="col">#</th>  
                    <th scope="col">First</th>
                    <th scope="col">group</th>
                    <th scope="col">tel</th>
                   </tr>
                </thead>
                <tbody >
                {
                    pupil.map((elem,index)=>{
                        return(
                          <tr key={elem._id} onClick={()=>pay(elem)}>
                            <th scope="row">{index+1}</th>
                            <td>{elem.name}</td>                                    
                            <td>{elem.group}</td>
                            <td>{elem.tel}</td>
                          </tr>
                      )
                    })
                }  
                </tbody>
                </table>
                </div>

                {/* To`lov oynasi */}
              
          </div>
          <div className={show?'d-block bg-secondary vw-100 height position-absolute top-0 start-0 ':'d-none'}>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-3 position-absolute top-50 start-50 translate-middle">
                   <div className={show ? 'd-block p-2 bg-info shadow-lg p-3 mb-2 rounded' : 'd-none'}>
                    <img className="w-100 rounded" src={`http://localhost:5000/uploads/${student.imagePath}`} alt={student.imagePath} />
                    <h4>Name:{student.name}</h4>
                    <p>Group:{student.group}</p>
                    <form action="">
                    <select className="form-select w-50 d-inline" id=""  
                        onChange={changeHandler} value={pupilPay.month} name="month">
                        {options.map(item => (
                            <option key={item.value} value={item.value}>
                            {item.name}
                            </option>
                        ))}
                    </select>
                    <input
                        className="form-control d-inline w-50"
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
              </div>
            </div>
          </div>
       </>
    )
}
export default Payment