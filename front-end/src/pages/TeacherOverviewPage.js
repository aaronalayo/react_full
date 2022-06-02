import axios from "axios";
import { useState, useEffect } from "react";
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";
import { TeacherNavbar } from "./TeacherNavbar"
import Select from 'react-select'
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:8080";

export const TeacherOverviewPage = () => {
  const [token] = useToken();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [selected, setSelected] = useState('');
  const [options, setOptions] = useState([]);
  const [passPhraseValue, setPassPhraseValue] = useState('');

  const navigate = useNavigate();
  function showPassPhrase(){
    navigate("/passphrase")
  }
 
  useEffect(() => {
      axios
        .post(
          "/api/passphrase/mySubjects",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          setOptions(response.data);
        })
        .catch(function (error) {
          if (error.response) {
            setShowErrorMessage(error.response.data);
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });

  }, [token]);
  const onGenerateClicked = async () => {

      await axios.post('/api/passphrase', {
          subject_id:selected.subject_id,
          semester:selected.semester,
          passphrase:passPhraseValue},
          {
            headers: { Authorization: `Bearer ${token}` },
          }

          
      ).then((response) => {
        sessionStorage.setItem("passphrase", response.data)
        setShowSuccessMessage(response.data)
        showPassPhrase();
        
      }).catch(function (error) {
          if (error.response) {
          setShowErrorMessage(error.response.data)
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
      
          }
      });

  }

  useEffect(() => {
    if ( showErrorMessage || showSuccessMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false)
        setShowErrorMessage(false);
      }, 3000);
    }
  }, [showSuccessMessage, showErrorMessage]);

  return (
    <div>
      <TeacherNavbar/>
      <div className="content-container">
        <h2>Create Check-in Passphrase</h2>
        {showSuccessMessage && (
          <div className="success">{showSuccessMessage}</div>
        )}
        {showErrorMessage && <div className="fail">{showErrorMessage}</div>}

      <h2>Welcome Teacher</h2>
      <div>
       <Select
          name="form-dept-select"
          options={options}
          // defaultValue={{ label: "Select Semester and Subject", value: 0 }}
          getOptionLabel={option => [ option.semester, " - ", option.subject_name]}
          getOptionValue={option => [ option.subject_id, option.semester, option.subject_name] }
          placeholder={"Select Semester and Subject"}
          onChange={e => {
              setSelected({
              subject_id: e.subject_id,
              semester: e.semester,
              });
           }}
/>
      </div>
      <br />

      <input
        type="text"
        
        name="passphrase"
        id="passphrase_input"
        placeholder="Passphrase"
        onChange={e => setPassPhraseValue(e.target.value)}
       
        required
        
      />
      <br />
      <button
        disabled={!passPhraseValue || !selected} 
        type="submit" 
        id="submit-passphrase-button"
        onClick={onGenerateClicked}>Generate</button>
    </div>
    </div>
  );
};
