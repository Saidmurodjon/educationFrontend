import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
function Update() {
    let { id } = useParams()
    const navigator = useNavigate()
    const Yonaltirish = () => {
        navigator("/profilus")
    }
    let localUser = JSON.parse(localStorage.getItem('user'));

    const [user, setUser] = useState({
        name: localUser.name,
        tel: localUser.tel,
        address: localUser.address,
        subject: localUser.subject,
        birth: localUser.birth,
        login: localUser.login,
        password: localUser.password
    })
    const [formData, setFormData] = useState('');

    const upload = ({ target: { files } }) => {
        let data = new FormData();
        data.append('imagePath', files[0]);
        data.append('name', user.name);
        data.append('tel', user.tel);
        data.append('address', user.address);
        data.append('subject', user.subject);
        data.append('birth', user.birth);
        data.append('login', user.login);
        data.append('password', user.password);



        setFormData(data);
    };

    const Send = async (e) => {

        e.preventDefault()
        let res = await axios.put(`http://localhost:5000/teachers/${id}`, formData)
            .then((res) => {
                Yonaltirish()
            })
            .catch((err) => {
                alert(err)
            })
    }




    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
        console.log(user);
    }

    return (
        <>
            <div className="row mt-5 justify-content-center text-center">
                <div className="col-md-4 search-form">
                    <form>

                        <input
                            className=" m-4 form-control"
                            type="text"
                            name="name"
                            placeholder="Ismni kiriting"
                            value={user.name}
                            onChange={changeHandler}
                        />

                        <input
                            className=" m-4 form-control"
                            type="text"
                            name="tel"
                            placeholder="Tel"
                            value={user.tel}
                            onChange={changeHandler}
                        />

                        <input
                            className=" m-4 form-control"
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={user.address}
                            onChange={changeHandler}
                        />

                        <input
                            className=" m-4 form-control"
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            value={user.subject}
                            onChange={changeHandler}
                        />

                        <input
                            className=" m-4 form-control"
                            type="text"
                            name="birth"
                            placeholder="Birth"
                            value={user.birth}
                            onChange={changeHandler}
                        />

                        <input
                            className=" m-4 form-control"
                            type="text"
                            name="login"
                            placeholder="Login"
                            value={user.login}
                            onChange={changeHandler}
                        />

                        <input
                            className=" m-4 form-control"
                            type="text"
                            name="password"
                            placeholder="Parol"
                            value={user.password}
                            onChange={changeHandler}
                        />

                        <input
                            type='file'
                            className='custom-file-input'
                            id='inputGroupFile04'
                            aria-describedby='inputGroupFileAddon04'
                            onChange={upload}
                        />
                        <input
                            onClick={Send}
                            type="submit"
                            className=" m-4 btn btn-success"
                            value="UpdateUser"
                        />

                    </form>
                </div>
            </div>
        </>
    )
}
export default Update