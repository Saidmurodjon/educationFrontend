import React,{useState, useEffect} from "react"
import axios from "axios"
import './Payment.css';

// import PaymentFilter from "./PaymetFilter";

function Payment(){
  var dateObj = new Date();
  // bazadan kelgan malumotlar users groups
  const [users, setUsers]=useState([])
  const[groups,setGroups]=useState([])

  // search innputdan kelgan malumot
  const [input, setInput]=useState('')

// bazadan kelgan malumotni search input bo'yicha filter natijasi.pupil map qilinadi .
  const[pupil,setPupil]=useState([])

// pupil map qilingandai tabledagi tanlangan ixtiyoriy o'quvchi
  const[student,setStudent]=useState([])

  // to'lov malumotlari yuboriladi  pupilPay
  const[pupilPay,setPupilPay]=useState({
    month:(dateObj.getMonth()+1).toString(),
    cost:''
  })
  // console.log(pupilPay);
  // guruhlarni o'zaro solishtirish uchun asosan guruh to'lov qiymatini olish uchun
  const[group,setGroup]=useState([])


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
      // style uchun
      const [show, setShow] = useState(false);
      const [look, setLook] = useState('');

      useEffect(()=>{
        async function getUsers(){
          const res = await axios.get('https://edu-uz.herokuapp.com/pupils')
          
          setUsers(res.data)
        }
        getUsers() 
        
      },[])
      useEffect(()=>{
        async function getGroups(){
          const res = await axios.get('https://edu-uz.herokuapp.com/eduGroup')
          
          setGroups(res.data)
        }
        getGroups() 
                
      },[])
      // qidiruvni berkitish
      
      
      useEffect(()=>{ 
        setPupil([])
        if(input){
          setLook('pupils')
      }
      if(!input){
       setLook('d-none')

     }
        users.filter(val=>{
            if((val.name.toLowerCase().includes(input.toLowerCase()))||(val.group.toLowerCase().includes(input.toLowerCase()))){
                setPupil(pupil=>[...pupil,val])
            }
            
        })
    },[input])
    
 
    const pay=async (elem)=>{
        setShow(!show);
       setStudent(elem)
       groups.map((foo) => {
        if(foo.name===elem.group){
          setGroup(foo)
        }
      });     
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
    var res=''
    if(pupilPay.month.length>0 &&pupilPay.cost.length>0){
       res=await axios.put(`https://edu-uz.herokuapp.com/pupils/pay/${student._id}`,pupilPay)
    }else{
      alert("Maydonni to'ldiring !")
    }
  
    if(res.request.status===200){  
      alert("To'lov muvaffqiyatli amalga oshirildi")
      // console.log( typeof res.request.status);
      setShow(!show); 
    }else{
      alert( "To'lov amalga oshirilmadi")
    }
} 

    return(
       <>
      {/* qidiru oynasi */}
          <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-8">
                <div className="container search">
                        <form className="d-flex">
                            <input
                                className="form-control w-100"
                                type="search"
                                placeholder="Search" 
                                onChange={(e)=>setInput(e.target.value)}
                            />
                         
                        </form>
                        <br />
                        <br />
                </div>
                {/* Qiqiruvdagi o`quvchilar table */}
                <div className={look}>
                    
                <table className="table w-100">
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
                </div>
              </div>
          </div>
                {/* To`lov oynasi */}
          <div className={show?'d-block  vw-100 height position-absolute top-0 start-0 ':'d-none'}>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-4 position-absolute top-50 start-50 translate-middle">
                   <div className={show ? 'd-block p-2 bg-white   shadow-lg p-3 mb-2 rounded border border-primary' : 'd-none'}>
                    <img className="w-100 rounded" src={`https://edu-uz.herokuapp.com/uploads/${student.imagePath}`} alt={student.imagePath} />
                    <h3>O'quvchi ismi: {student.name}</h3>
                    <p>Group: {student.group}</p>
                    <p>To'lov qiymati:  {group.price} so'm</p>

                    {/* To'lov uchun qiymat kiritish qismi */}
                    <form action="">
                    <select className="form-select d-inline w-100   payInput" id=""  
                        onChange={changeHandler} value={pupilPay.month} name="month">
                        {options.map(item => (
                            <option key={item.value} 
                            value={item.value}>
                            {item.name}
                            </option>
                        ))}
                    </select>
                    <br />
                    <br />
                    <input
                        className="form-control d-inline w-100  payInput"
                        type="text"
                        name="cost"
                        placeholder="cost"
                        value={pupilPay.cost}
                        onChange={changeHandler}
                    />
                    </form>
                    <br />
                    <button className="btn btn-danger m-3 "
                            onClick={()=>Cancel()}
                            >Cancel</button>
                            <button className="btn btn-primary m-3"
                            onClick={()=>studentPay(student)}
                            >Ok</button>
                </div>
              </div>
              </div>
            </div>
          </div>
          {/* <PaymentFilter /> */}
       </>
    )
}
export default Payment