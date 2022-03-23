import React, { useState, useEffect } from "react";
import "./ProfilUs.css";
import "bootstrap/dist/css/bootstrap.min.css"
import { BsPlusCircle } from 'react-icons/bs'
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";


function ProfilUs() {

  const navigator = useNavigate()

  const [model, setModel] = useState(false);

  const getData = () => {
    return setModel(true)
  }

  const [profil, setProfil] = useState([])
  useEffect(async () => {
    let res = await axios.get('http://localhost:5000/teachers')
    setProfil(res.data)
  }, [])

  const Delete = async (id) => {
    let res = await axios.delete(`http://localhost:5000/teachers/${id}`)
    window.location.reload(false)
    console.log(res)
  }

  const UpdateUser = (elem) => {
    localStorage.setItem('user', JSON.stringify(elem));
    navigator(`/update/${elem._id}`)
  }

  return (
    <>
      <section className="vh-100 Preftor">
        <BsPlusCircle className="Profilebuton" onClick={() => getData()} />
        <div className="container pb-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">


            {
              profil.map((elem) => {
                return (
                  <div className="col col-md-9 col-lg-7 col-xl-10 mt-5 mb-3" key={elem._id}>
                    <div className="card Profilew">
                      <div className="card-body p-4">
                        <div className="d-flex text-black">
                          <div className="flex-shrink-0">
                            <img src={"http://localhost:5000/uploads/" + elem.imagePath} alt="Generic placeholder image" className="img-fluid Profilus" />
                          </div>
                          <div className="flex-grow-1 ms-3" >
                            <p className="mb-2 pb-1 Prog"></p>
                            <div className="d-flex rounded-3 p-2 mb-2 Profilup" >
                              <div>
                                <p className="small text-muted mb-1">name:</p>
                                <p className="mb-0" >{elem.name}</p>
                              </div>
                              <div className="px-3">
                                <p className="small text-muted mb-1">tel:</p>
                                <p className="mb-0">{elem.tel}</p>
                              </div>
                              <div className="px-3">
                                <p className="small text-muted mb-1">address:</p>
                                <p className="mb-0">{elem.address}</p>
                              </div>
                              <div className="px-3">
                                <p className="small text-muted mb-1">subject:</p>
                                <p className="mb-0">{elem.subject}</p>
                              </div>
                              <div className="px-3">
                                <p className="small text-muted mb-1">birth:</p>
                                <p className="mb-0">{elem.birth}</p>
                              </div>
                            </div>

                            <div className="d-flex rounded-3 p-2 mb-2 Profilue" >
                              <div className="px-3">
                                <p className="small text-muted mb-1">Login:</p>
                                <p className="mb-0" >{elem.login}</p>
                              </div>
                              <div className="px-3">
                                <p className="small text-muted mb-1">Parol:</p>
                                <p className="mb-0" >{elem.password}</p>
                              </div>
                            </div>
                            <div className="d-flex pt-1">
                              <button
                                type="button"
                                className="btn btn-outline-danger me-1 flex-grow-1"
                                onClick={() => Delete(elem._id)}
                              >Delete</button>
                              <button
                                type="button"
                                className="btn btn-success flex-grow-1"
                                onClick={() => UpdateUser(elem)}
                              >Updete</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }

            {
              model === true ? <Modal hide={() => setModel(false)} /> : ''
            }

          </div>
        </div>
      </section>
    </>
  );
}

export default ProfilUs;