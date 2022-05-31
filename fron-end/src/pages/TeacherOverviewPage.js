import axios from "axios";
import { useState, useEffect } from "react";
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";

axios.defaults.baseURL = "http://localhost:8080";

export const TeacherOverviewPage = () => {
  const [token] = useToken();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [selected, setSelected] = useState(null);
  const [options, setOptions] = useState([]);
  const [passPhraseValue, setPassPhraseValue] = useState('');
  const [subjectIdValue, setSubjectIdValue] = useState('');
  const [semesterValue, setSemesterValue] = useState('');
  const [subjectName, setSubjectName] = useState('');


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
    console.log(selected.split(' - ')[2])
    setSubjectIdValue(selected.split(' - ')[0]);
    setSubjectName(selected.split(' - ')[2]);
    setSemesterValue(selected.split(' - ')[1]);
    console.log(subjectIdValue, subjectName)
  }

  useEffect(() => {
    if (showSuccessMessage || showErrorMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
      }, 3000);
    }
  }, [showSuccessMessage, showErrorMessage]);

  const Dropdown = ({ label, options }) => {
    return (
      <label>
        {label}
        <select onChange={(e) => setSelected(e.target.value || null)}
          value={selected || ""}>
          {options.map((option) =>

            <option key={option.subject_id} value={option.subject_id}>
              {option.subject_id} - {option.semester} - {option.subject_name}
            </option>
          )}
        </select>
      </label>
    );
  };

  return (
    <div className="auth-content-container">
    {/* <div className="content-container"> */}
      <h2>Create Check-in Passphrase</h2>
      {showSuccessMessage && (
        <div className="success">{showSuccessMessage}</div>
      )}
      {showErrorMessage && <div className="fail">{showErrorMessage}</div>}

      <h2>Welcome Teacher</h2>
      <div className="form-outline mb-4">
        <Dropdown
          label="Select Semester and Subject"
          options={options}
          value={selected}
        />
      </div>
      <br />
      {/* <input type="hidden" id="selectedSemester" name="semester" required />
      <input type="hidden" id="selectedSubjectID" name="subject_id" required /> */}
      <div className="form-outline mb-4">
        <label className="auth-label">Passphrase</label>
        <input
          className="form-control"
          required
          // type="email"
          type="text"
          name="passphrase"
          id="passphrase_input"
          placeholder="Passphrase"
          onChange={(e) => setPassPhraseValue(e.target.value)}
      />
      </div>
      <br />
      <button className="btn btn-primary btn-block mb-4"
        disabled={!passPhraseValue || !selected}
        type="submit"
        id="submit-passphrase-button"
        onClick={onGenerateClicked}
      >
        Generate
      </button>
    </div>
  );
};
