import React, { useState } from "react";
import { multipleFilesUpload } from './Api';
import './Modal.css';

function Modal(props) {

  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [address, setAddress] = useState('');
  const [subject, setSubject] = useState('');
  const [birth, setBirth] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [imagePath, setImagePath] = useState('');

  const SingleFileChange = (e) => {
    setImagePath(e.target.files[0]);
  }

  const UploadMultipleFiles = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('tel', tel);
    formData.append('address', address);
    formData.append('subject', subject);
    formData.append('birth', birth);
    formData.append('login', login);
    formData.append('password', password);
    formData.append('imagePath', imagePath);
    console.log(formData);

    await multipleFilesUpload(formData);

    window.location.reload(false);

  };

  let modelStyle = {
    display: 'block',
  }

  return (
    <>
      <div className="modal show fade blurmodal" style={modelStyle}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.hide}></button>
            </div>
            <h5 className="text-center ProfOqtuvchi">O'qtuvchi qoshish</h5>
            <form className="form  formEction">
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="form-control my-4 inputsadd Profilinput"
              />
              <input
                type="text"
                onChange={(e) => setTel(e.target.value)}
                placeholder="Telefon"
                className="form-control my-4 inputsadd Profilinput"
              />
              <input
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                className="form-control my-4 inputsadd Profilinput"
              />
              <input
                type="text"
                onChange={(e) => setBirth(e.target.value)}
                placeholder="Birth"
                className="form-control my-4 inputsadd Profilinput"
              />
              <input
                type="text"
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                className="form-control my-4 inputsadd Profilinput"
              />
              <input
                type="text"
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Login"
                className="form-control my-4 inputsadd Profilinput"
              />
              <input
                type="text"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="form-control my-4 inputsadd Profilinput"
              />
              <input type="file" className="form-control mb-3 ProfilFile" onChange={(e) => SingleFileChange(e)} />
              <button
                type="button"
                onClick={() => UploadMultipleFiles()}
                className="btn btn-outline-secondary mt-2 btnAddAdd Profilbutton"
              >Qoshish</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;