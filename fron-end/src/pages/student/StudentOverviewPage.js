import axios from "axios";
import { useState } from "react";
import { useToken } from "../../auth/useToken";
import { Navbar } from "../../fragment/StudentNav";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "http://localhost:8080";

export const StudentOverviewPage = () => {
    const [token] = useToken();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [passPhraseValue, setPassPhraseValue] = useState('');



    const onCheckInClicked = async () => {

        await axios.post('/api/checkin', {
            passphrase: passPhraseValue
        },
            {
                headers: { Authorization: `Bearer ${token}` },
            }


        ).then((response) => {
            // setShowSuccessMessage(response.data)
            toast.success(response.data)


        }).catch(function (error) {
            if (error.response) {
                // setShowErrorMessage(error.response.data)
                toast.error(error.response.data)
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);

            }
        });



    }

        const jwt = token.split('.')[1]
        const decoded = JSON.parse(window.atob(jwt))
        const email = decoded['email']
        console.log(email)

    return (
        <div>
            <Navbar />
            <div className="auth-content-container">

                <h2>Welcome to Check-in, {email}</h2>
                <div className="form-outline mb-4">
                {showSuccessMessage && (
                    <div className="success">{showSuccessMessage}</div>
                )}
                {showErrorMessage && <div className="fail">{showErrorMessage}</div>}
                <input className="form-control"
                    value={passPhraseValue}
                    onChange={(e) => setPassPhraseValue(e.target.value)}
                    placeholder="passphrase"
                />
                <button className="btn btn-success btn-block mb-4"
                    disabled={!passPhraseValue}
                    onClick={onCheckInClicked}
                >
                    Check In
                </button>
                </div>
            </div>
        </div>
    )
}