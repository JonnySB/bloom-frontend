import { useNavigate } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import "./NavbarComponent.css";


const NavbarComponent = () => {
    const navigate = useNavigate();
    const id = window.localStorage.getItem("user_id")
    const token = window.localStorage.getItem("token")

    const home = () => {
        navigate("/")
    }

    const profilePage = () => {
        if (id) {
            navigate(`/profile`);
        } else {
            navigate('/login')
        }

    };

    const requestManagement = (id) => {
        if (id) {
            navigate(`/create_request`);
        } else {
            navigate('/login')
        }

    };

    const myplants = (id) => {
        if (id) {
            navigate("/myplants");
        } else {
            navigate('/login')
        }
    }
    const messages = (id) => {
        if (id) {
            navigate(`/messages`);
        } else {
            navigate('/login')
        }
    };

    const logout = () => {
        if (id) {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("user_id");
            navigate("/");
            window.location.reload()
        } else {
            navigate("/login");
        }
    };


    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand onClick={home}>BLOOM</Navbar.Brand>
                <Nav className="ms-auto nav-spacing">
                    {token && (
                        <>
                            {/* <Nav.Link onClick={profilePage}>Profile</Nav.Link> */}
                            <svg
                                style={{ width: '30px', height: '30px'}}
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                height="1.5em"
                                width="1.5em"
                                className='fill-[#ffffff]'
                                onClick={profilePage}
                                >
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z" />
                            </svg>
                            &nbsp;  &nbsp;  &nbsp;  &nbsp;
                            {/* <Nav.Link onClick={requestManagement}>Request Management</Nav.Link> */}
                            <svg onClick={requestManagement} style={{ width: '30px', height: '30px'}} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" viewBox="0 0 511 511" xmlSpace="preserve">
                            <g>
                                <path d="M487.5,111.965H148.116l43.079-43.077c4.439-4.439,6.883-10.341,6.883-16.618c0-6.277-2.445-12.179-6.885-16.618   l-22.628-22.625c-9.162-9.161-24.07-9.161-33.232,0.001L2.197,146.162C0.79,147.568,0,149.476,0,151.465s0.79,3.897,2.197,5.303   l133.137,133.133c4.582,4.582,10.599,6.872,16.617,6.872c6.017,0,12.035-2.291,16.615-6.871l22.628-22.625   c4.439-4.438,6.884-10.34,6.885-16.618c0-6.277-2.444-12.179-6.883-16.618l-43.079-43.078H487.5c12.958,0,23.5-10.542,23.5-23.5   v-32C511,122.507,500.458,111.965,487.5,111.965z M496,167.465c0,4.687-3.813,8.5-8.5,8.5H130.009c-3.034,0-5.768,1.827-6.929,4.63   c-1.161,2.803-0.519,6.028,1.626,8.173l55.883,55.881c1.605,1.605,2.49,3.74,2.49,6.01s-0.885,4.405-2.49,6.011l-22.628,22.625   c-3.314,3.313-8.706,3.313-12.02,0L18.107,151.465L145.94,23.635c3.314-3.314,8.706-3.313,12.02,0l22.628,22.625   c1.605,1.605,2.49,3.74,2.49,6.011s-0.884,4.405-2.49,6.011l-55.883,55.881c-2.145,2.145-2.787,5.371-1.626,8.173   c1.161,2.803,3.896,4.63,6.929,4.63H487.5c4.687,0,8.5,3.813,8.5,8.5V167.465z"/>
                                <path d="M375.667,221.099c-9.162-9.161-24.07-9.162-33.232,0l-22.628,22.624c-4.439,4.438-6.884,10.34-6.884,16.618   c0,6.277,2.444,12.179,6.883,16.618l43.079,43.078H23.5c-12.958,0-23.5,10.542-23.5,23.5v32c0,12.958,10.542,23.5,23.5,23.5   h339.383l-43.079,43.077c-4.438,4.439-6.883,10.341-6.882,16.618c0,6.277,2.445,12.179,6.884,16.617l22.628,22.625   c4.581,4.581,10.598,6.871,16.616,6.871c6.018,0,12.036-2.291,16.617-6.872l133.136-133.133c1.407-1.406,2.197-3.314,2.197-5.303   s-0.79-3.897-2.197-5.303L375.667,221.099z M365.061,487.365c-3.314,3.314-8.706,3.314-12.021,0l-22.628-22.625   c-1.605-1.605-2.49-3.74-2.49-6.01c0-2.271,0.884-4.406,2.489-6.011l55.883-55.88c2.145-2.145,2.787-5.371,1.626-8.173   c-1.161-2.803-3.896-4.63-6.929-4.63H23.5c-4.687,0-8.5-3.813-8.5-8.5v-32c0-4.687,3.813-8.5,8.5-8.5h357.491   c3.034,0,5.768-1.827,6.929-4.63c1.161-2.803,0.519-6.028-1.626-8.173l-55.883-55.881c-1.605-1.605-2.49-3.74-2.489-6.011   c0-2.271,0.884-4.405,2.49-6.011l22.628-22.625c3.314-3.313,8.707-3.313,12.021,0l127.833,127.83L365.061,487.365z"/>
                                <path d="M463.5,143.965h-16c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h16c4.142,0,7.5-3.358,7.5-7.5   S467.642,143.965,463.5,143.965z"/>
                                <path d="M415.5,143.965h-112c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h112c4.142,0,7.5-3.358,7.5-7.5   S419.642,143.965,415.5,143.965z"/>
                                <path d="M199.5,351.965h-16c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h16c4.142,0,7.5-3.358,7.5-7.5   S203.642,351.965,199.5,351.965z"/>
                                <path d="M151.5,351.965h-112c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h112c4.142,0,7.5-3.358,7.5-7.5   S155.642,351.965,151.5,351.965z"/>
                                <path d="M157.928,57.518c2.929-2.929,2.929-7.678,0-10.606c-2.929-2.929-7.678-2.929-10.606,0l-32,32   c-2.929,2.929-2.929,7.678,0,10.606c1.464,1.464,3.384,2.197,5.303,2.197s3.839-0.732,5.303-2.197L157.928,57.518z"/>
                                <path d="M354.863,256.162c-2.929,2.929-2.929,7.678,0,10.606l32,32c1.464,1.464,3.384,2.197,5.303,2.197s3.839-0.732,5.303-2.197   c2.929-2.929,2.929-7.678,0-10.606l-32-32C362.541,253.233,357.792,253.233,354.863,256.162z"/>
                            </g>
                            </svg>
                            &nbsp;  &nbsp;  &nbsp;  &nbsp;
                            {/* <Nav.Link onClick={myplants}>My Plants</Nav.Link> */}
                            <svg style={{ width: '30px', height: '30px'}} onClick={myplants} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="designs" width="800px" height="800px" viewBox="0 0 32 32" xmlSpace="preserve">
                            <path className="sketchy_een" d="M24.031,11.578c0.244-0.352,0.467-0.717,0.692-1.083c0.207-0.342,0.41-0.686,0.592-1.044  c0.356-0.7,0.663-1.442,0.872-2.201c0.057-0.209,0.125-0.43,0.117-0.649c-0.012-0.287-0.172-0.635-0.448-0.768  c-0.217-0.104-0.362-0.131-0.6-0.162c-0.112-0.014-0.224-0.02-0.336-0.02c-0.314,0-0.627,0.046-0.937,0.094  c-0.727,0.111-1.437,0.301-2.124,0.561c-0.389,0.147-0.741,0.346-1.102,0.547c-0.34,0.188-0.682,0.371-1.005,0.59  c-0.352,0.238-0.685,0.5-1.008,0.775c-0.105-0.583-0.232-1.162-0.415-1.727c-0.25-0.774-0.512-1.546-0.766-2.318  c-0.125-0.377-0.254-0.752-0.399-1.122c-0.035-0.092-0.07-0.184-0.106-0.276c-0.035-0.086-0.072-0.182-0.109-0.262  c-0.045-0.094-0.092-0.139-0.166-0.234C16.641,2.098,16.375,2,16.146,2c-0.346,0-0.612,0.201-0.801,0.473  C15.244,2.62,15.161,2.78,15.07,2.932c-0.1,0.172-0.205,0.342-0.309,0.51c-0.199,0.321-0.364,0.657-0.536,0.993  c-0.18,0.354-0.358,0.707-0.53,1.065c-0.195,0.412-0.344,0.835-0.473,1.27c-0.117,0.385-0.215,0.774-0.287,1.171  c-0.03,0.159-0.044,0.322-0.059,0.484c-0.061-0.067-0.116-0.139-0.178-0.205c-0.303-0.323-0.649-0.598-1.024-0.833  c-0.326-0.201-0.682-0.367-1.026-0.536C9.872,6.473,9.04,6.244,8.193,6.082C7.818,6.01,7.437,5.963,7.058,5.904  C6.924,5.883,6.789,5.862,6.654,5.862c-0.086,0-0.172,0.008-0.257,0.031C6.155,5.955,5.914,6.115,5.805,6.348  C5.674,6.622,5.674,6.85,5.735,7.139C5.75,7.216,5.781,7.294,5.811,7.368c0.221,0.586,0.444,1.175,0.688,1.753  C6.616,9.399,6.741,9.672,6.88,9.938c0.137,0.258,0.305,0.494,0.473,0.733c0.385,0.547,0.772,1.096,1.225,1.589  c0.328,0.358,0.707,0.655,1.098,0.944c0.05,0.037,0.101,0.074,0.151,0.112c-0.837,0.019-1.672,0.057-2.503,0.164  c-0.244,0.031-0.442,0.076-0.622,0.258c-0.015,0.015-0.021,0.037-0.035,0.053c-0.358,0.129-0.611,0.468-0.623,0.866  c-0.027,0.868-0.066,1.743-0.033,2.611c0.012,0.281,0.037,0.563,0.051,0.846c0.016,0.348,0.01,0.696,0.031,1.044  c0.011,0.189,0.084,0.358,0.185,0.503c0.013,0.032,0.039,0.056,0.056,0.086c0.01,0.011,0.014,0.026,0.024,0.036  c0.15,0.235,0.399,0.405,0.69,0.398c0.204-0.006,0.409-0.014,0.613-0.022c0.048,0.896,0.122,1.785,0.268,2.671  c0.116,0.693,0.288,1.373,0.439,2.057c-0.087-0.001-0.175-0.003-0.262-0.004c-0.275-0.001-0.511,0.146-0.665,0.355  c-0.053,0.005-0.106-0.003-0.158,0.011c-0.223,0.061-0.414,0.209-0.532,0.408c-0.131,0.223-0.129,0.438-0.09,0.684  c0.072,0.449,0.131,0.901,0.217,1.347c0.084,0.448,0.293,0.833,0.571,1.186c0.225,0.285,0.534,0.549,0.846,0.725  c0.188,0.106,0.389,0.188,0.59,0.258c0.252,0.086,0.528,0.098,0.792,0.115c0.797,0.059,1.605,0.004,2.404-0.01  c0.805-0.014,1.61-0.021,2.416-0.027c0.815-0.006,1.632-0.008,2.449-0.002c0.371,0.002,0.743,0.002,1.114-0.014  c0.375-0.014,0.747-0.043,1.12-0.064c0.397-0.023,0.792-0.053,1.188-0.067c0.174-0.006,0.35-0.004,0.524-0.004  c0.203,0.002,0.409,0.004,0.614-0.008c0.395-0.021,0.801-0.055,1.169-0.203c0.406-0.164,0.788-0.377,1.114-0.676  c0.19-0.174,0.346-0.401,0.485-0.62c0.139-0.213,0.252-0.459,0.326-0.702c0.156-0.514,0.149-1.067,0.16-1.599  c0.003-0.136-0.04-0.26-0.102-0.374c0.001-0.017,0.01-0.03,0.01-0.047c0-0.458-0.386-0.866-0.851-0.866c-0.005,0-0.011,0-0.016,0  c-0.275,0.006-0.551,0.01-0.826,0.015c0.087-0.32,0.184-0.638,0.262-0.96c0.092-0.367,0.158-0.741,0.223-1.114  c0.142-0.83,0.283-1.659,0.431-2.489c0.21,0.026,0.421,0.047,0.631,0.034c0.157-0.01,0.297-0.064,0.426-0.136  c0.372-0.101,0.667-0.43,0.658-0.831c-0.027-1.419,0.023-2.838,0-4.257c0-0.014-0.008-0.026-0.009-0.041  c0.098-0.143,0.166-0.306,0.166-0.481c0-0.229-0.092-0.451-0.254-0.614c-0.174-0.174-0.375-0.234-0.614-0.254  c-0.42-0.037-0.84-0.088-1.263-0.1c-0.379-0.012-0.756-0.021-1.135-0.031c-0.07-0.002-0.139-0.001-0.209-0.003  c0.312-0.246,0.613-0.497,0.894-0.783C23.501,12.321,23.769,11.952,24.031,11.578z M14.485,8.334  c0.116-0.613,0.272-1.228,0.493-1.812c0.257-0.544,0.557-1.064,0.826-1.602c0.063-0.125,0.133-0.245,0.205-0.364  c0.189,0.548,0.362,1.102,0.544,1.652c0.285,0.865,0.543,1.758,0.675,2.662c0.082,0.741,0.098,1.502,0.015,2.243  c-0.111,0.759-0.272,1.507-0.566,2.216c-0.001,0.003,0,0.007-0.001,0.01c-0.469-0.008-0.938-0.017-1.407-0.028  c-0.16-0.455-0.313-0.912-0.458-1.37c-0.123-0.391-0.236-0.778-0.306-1.181C14.417,9.957,14.397,9.14,14.485,8.334z M9.332,10.571  C9.052,10.198,8.775,9.82,8.516,9.43C8.393,9.242,8.293,9.035,8.193,8.834c-0.088-0.179-0.172-0.36-0.253-0.543  C7.855,8.081,7.772,7.87,7.689,7.659c0.657,0.12,1.305,0.276,1.939,0.509c0.539,0.235,1.074,0.499,1.552,0.842  c0.54,0.451,0.991,1.021,1.427,1.573c0.108,0.144,0.211,0.29,0.3,0.448c0.022,0.177,0.047,0.355,0.086,0.529  c0.132,0.584,0.305,1.158,0.49,1.729c-0.092,0-0.184-0.003-0.275-0.003c-0.191,0-0.383,0.003-0.574,0.004  c-0.048-0.235-0.18-0.451-0.403-0.559c-0.291-0.141-0.584-0.277-0.864-0.44c-0.207-0.119-0.403-0.256-0.598-0.395  c-0.205-0.145-0.411-0.288-0.611-0.438C9.847,11.195,9.583,10.888,9.332,10.571z M23.103,26.433  c-0.005,0.159-0.002,0.318-0.017,0.476c-0.02,0.102-0.044,0.202-0.078,0.301c-0.063,0.131-0.134,0.257-0.215,0.377  c-0.044,0.051-0.089,0.099-0.138,0.144c-0.139,0.091-0.289,0.168-0.44,0.238c-0.147,0.053-0.297,0.091-0.451,0.12  c-0.328,0.034-0.659,0.034-0.988,0.037c-0.375,0.006-0.749,0.025-1.124,0.055c-0.772,0.062-1.544,0.119-2.318,0.151  c-0.809,0.031-1.622,0.01-2.431,0.006c-0.774-0.002-1.548,0.002-2.322,0.012c-0.964,0.011-1.938,0.041-2.898-0.07  c-0.101-0.019-0.197-0.042-0.293-0.075c-0.113-0.057-0.221-0.12-0.325-0.191c-0.105-0.091-0.204-0.187-0.296-0.292  c-0.041-0.064-0.08-0.13-0.115-0.198c-0.054-0.159-0.087-0.321-0.113-0.487c-0.021-0.161-0.045-0.322-0.067-0.483  c1.589-0.014,3.177-0.073,4.768-0.082c0.242,0,0.485,0,0.725,0c0.606,0.002,1.212,0.004,1.818-0.021  c0.794-0.031,1.587-0.062,2.381-0.084c0.946-0.025,1.9-0.031,2.848,0.004c0.45,0.016,0.901,0.031,1.352,0.045  C22.61,26.421,22.857,26.429,23.103,26.433z M23.152,15.198c0.218,0.004,0.437,0.028,0.656,0.038  c0.019,0.65,0.044,1.299,0.051,1.949c0.003,0.403,0.001,0.807-0.002,1.21c-0.594-0.023-1.189-0.029-1.786-0.026  c-0.465,0.002-0.932-0.02-1.399-0.02c-0.159-0.001-0.318-0.001-0.477-0.001c-0.384,0-0.768,0.001-1.153,0.003  c-0.446,0.004-0.819,0.371-0.819,0.819c0,0.442,0.373,0.823,0.819,0.817c0.534-0.006,1.065-0.016,1.599-0.02  c0.479-0.004,0.954,0.035,1.431,0.066c0.036,0.002,0.073,0.003,0.109,0.005c-0.111,0.703-0.214,1.407-0.346,2.106  c-0.068,0.367-0.145,0.733-0.225,1.098c-0.08,0.358-0.186,0.709-0.262,1.065c-0.032,0.147-0.018,0.29,0.016,0.427  c-0.348,0.006-0.696,0.013-1.044,0.019c0.02-0.044,0.052-0.081,0.063-0.13c0.094-0.428,0.209-0.85,0.303-1.276  c0.135-0.625,0.231-1.251,0.317-1.884c0.027-0.205-0.106-0.449-0.242-0.586c-0.156-0.156-0.367-0.244-0.588-0.244  c-0.219,0-0.43,0.088-0.586,0.244c-0.17,0.17-0.215,0.356-0.242,0.586c-0.026,0.209-0.05,0.417-0.076,0.626  c-0.115,0.708-0.239,1.418-0.462,2.099c-0.066,0.205-0.028,0.418,0.071,0.598c-1.499,0.039-2.997,0.128-4.5,0.123  c-0.983-0.004-1.966-0.008-2.949,0.006c-0.485,0.007-0.969,0-1.453-0.007c-0.001-0.061,0.006-0.122-0.008-0.183  c-0.102-0.428-0.184-0.86-0.281-1.29c-0.107-0.461-0.198-0.936-0.267-1.407c-0.081-0.639-0.096-1.287-0.121-1.929  c0.687-0.012,1.373-0.062,2.062-0.045c0.358,0.008,0.715,0.002,1.073,0.008c0.311,0.004,0.625,0.026,0.936,0.035  c0.678,0.023,1.354-0.033,2.033-0.041c0.465-0.004,0.854-0.385,0.854-0.854c0-0.442-0.373-0.856-0.826-0.856  c-0.009,0-0.019,0-0.028,0c-0.326,0.014-0.655,0.043-0.981,0.061c-0.34,0.018-0.678,0.014-1.02,0.014  c-0.67,0.002-1.341-0.002-2.011-0.008c-0.317-0.002-0.635,0.027-0.952,0.045c-0.373,0.021-0.747,0.033-1.12,0.031  c-0.485-0.004-0.97,0.005-1.455,0.011c0.001-0.129-0.001-0.257-0.003-0.385c-0.002-0.283-0.029-0.563-0.037-0.846  c-0.02-0.695,0.02-1.395,0.054-2.092c0.749-0.09,1.496-0.162,2.25-0.197c0.881-0.043,1.767-0.041,2.648-0.045  c1.722-0.008,3.444,0.049,5.166,0.074c0.575,0.008,1.149,0.049,1.722,0.084c0.297,0.02,0.596,0.047,0.897,0.051  c0.152,0.004,0.305,0.004,0.457,0.002c0.152,0,0.305,0,0.457,0.002C22.034,15.155,22.593,15.186,23.152,15.198z M21.406,12.119  c-0.328,0.24-0.662,0.469-1.006,0.687c-0.166,0.104-0.338,0.207-0.518,0.285c-0.202,0.09-0.402,0.18-0.594,0.289  c-0.152-0.006-0.304-0.008-0.455-0.013c-0.159-0.005-0.317-0.004-0.474-0.004c0.202-0.621,0.364-1.248,0.462-1.899  c0.06-0.404,0.085-0.803,0.09-1.209c0.462-0.456,0.927-0.904,1.43-1.318c0.553-0.406,1.173-0.731,1.797-1.015  c0.391-0.15,0.784-0.271,1.196-0.355c0.225-0.045,0.446-0.105,0.67-0.147c0.168-0.031,0.336-0.056,0.504-0.081  c-0.079,0.241-0.172,0.478-0.266,0.711c-0.246,0.549-0.535,1.072-0.849,1.586c-0.321,0.524-0.655,1.037-1.019,1.531  C22.083,11.515,21.755,11.83,21.406,12.119z"/>
                            </svg>
                            &nbsp;  &nbsp;  &nbsp;  &nbsp;
                            {/* <Nav.Link onClick={messages}>Chat</Nav.Link> */}
                            <svg onClick={messages} style={{ width: '30px', height: '30px'}} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" viewBox="0 0 423.789 423.789" xmlSpace="preserve">
                            <path d="M423.789,225.29c0-52.537-50.816-95.767-116.583-100.102c-7.191-9.469-15.979-18.275-26.273-26.207  c-31.04-23.916-72.165-37.086-115.8-37.086c-43.634,0-84.759,13.171-115.799,37.086C17.521,123.492,0,156.321,0,191.42  c0,55.275,44.811,104.246,110.372,122.249c-3.909,6.604-11.674,16.833-26.906,29.81c-2.959,2.521-4.189,6.53-3.153,10.277  c1.036,3.748,4.151,6.554,7.985,7.197c0.575,0.097,5.865,0.941,14.5,0.941c0.001,0,0.001,0,0.002,0  c23.175,0,67.583-6.021,107.382-45.818c6.59-1.457,12.992-3.22,19.185-5.264c9.889,4.816,20.515,8.524,31.686,11.048  c30.757,30.437,64.927,34.909,82.347,34.909c6.711-0.001,10.939-0.664,11.525-0.762c3.834-0.643,6.949-3.45,7.985-7.197  c1.036-3.747-0.193-7.755-3.153-10.277c-9.412-8.02-14.932-14.569-18.141-19.272C390.578,304.654,423.789,267.339,423.789,225.29z   M210.133,228.895h-90c-5.523,0-10-4.477-10-10s4.477-10,10-10h90c5.523,0,10,4.477,10,10S215.656,228.895,210.133,228.895z   M240.133,179.561h-150c-5.523,0-10-4.477-10-10c0-5.523,4.477-10,10-10h150c5.523,0,10,4.477,10,10  C250.133,175.084,245.656,179.561,240.133,179.561z M325.373,302.767c-5.051,1.065-8.461,5.799-7.871,10.927  c0.224,1.946,1.705,9.83,11.347,21.917c-15.384-2.515-36.304-9.878-55.581-29.844c-1.401-1.451-3.208-2.445-5.184-2.85  c-4.193-0.86-8.289-1.921-12.288-3.155c45.494-23.441,74.471-63.779,74.471-108.342c0-15.473-3.409-30.503-9.942-44.576  c20.77,3.551,39.708,11.696,54.598,23.678c18.615,14.979,28.867,34.429,28.867,54.768  C403.789,261.171,371.543,293.03,325.373,302.767z"/>
                            </svg>
                            &nbsp;  &nbsp;  &nbsp;  &nbsp;
                            {/* <Nav.Link onClick={logout}>Logout</Nav.Link> */}
                            <svg style={{ width: '30px', height: '30px'}} onClick={logout} width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M34.4549 0.563836C31.476 1.19343 26.8715 3.42558 24.5785 5.3514C20.4103 8.85199 17.707 13.3441 16.6274 18.5632C16.0151 21.5259 16 23.4584 16 100.017C16 176.575 16.0151 178.508 16.6274 181.471C18.1144 188.661 22.6705 194.454 29.3173 197.605C34.7368 200.175 29.9852 199.997 93.2128 199.997C153.513 199.997 151.691 200.042 155.67 198.472C163.211 195.497 168.515 189.259 170.126 181.471C170.71 178.646 170.753 177.018 170.757 157.913C170.76 146.625 170.671 137.39 170.56 137.39C170.316 137.39 166.492 140.601 160.186 146.099L155.509 150.176L155.349 164.466C155.198 177.839 155.148 178.837 154.558 180.019C153.727 181.688 151.745 183.568 150.272 184.088C149.314 184.425 138.398 184.505 93.2074 184.505H37.3277L35.7438 183.694C33.6184 182.606 32.1173 180.507 31.7143 178.06C31.3004 175.545 31.3004 24.4886 31.7143 21.9734C32.1173 19.5266 33.6184 17.4276 35.7438 16.3393L37.3277 15.5286H93.2074C138.398 15.5286 149.314 15.6085 150.272 15.9461C150.923 16.1758 152.055 16.9421 152.787 17.6493C155.243 20.0198 155.176 19.54 155.289 35.5439L155.39 49.8095L159.602 53.4318C161.919 55.424 165.269 58.3075 167.047 59.8391C168.825 61.3711 170.388 62.6287 170.521 62.6341C170.653 62.6396 170.76 53.4088 170.757 42.1209C170.753 23.0157 170.71 21.3882 170.126 18.5632C168.225 9.37042 161.227 2.43631 151.91 0.514005C148.439 -0.202149 37.8569 -0.155512 34.4549 0.563836ZM119.459 50.4276C118.732 50.7879 118.141 51.4916 117.533 52.723L116.656 54.4987L116.551 65.7584L116.445 77.0182H92.4512H68.457L66.8146 77.8324C65.0954 78.6847 63.8008 80.0911 63.0163 81.9591C62.3256 83.6038 62.3256 116.43 63.0163 118.075C63.8008 119.943 65.0954 121.349 66.8146 122.201L68.457 123.016H92.448H116.439L116.564 134.116C116.682 144.588 116.728 145.299 117.368 146.696C118.326 148.785 119.869 149.866 122.184 150.069L124.042 150.232L126.771 147.892C128.272 146.605 131.74 143.606 134.477 141.227C137.215 138.848 141.465 135.178 143.922 133.073C146.379 130.967 150.804 127.16 153.755 124.613C156.706 122.065 162.135 117.394 165.819 114.231C169.503 111.069 172.74 108.266 173.012 108.003C173.283 107.739 175.417 105.884 177.753 103.881C180.089 101.877 182 100.145 182 100.032C182 99.8074 170.937 90.1639 155.67 77.0792C151.488 73.4949 147.405 69.9713 135.441 59.6181C123.308 49.1192 124.314 49.8641 122.293 49.8874C121.312 49.8986 120.037 50.1417 119.459 50.4276Z" fill="black"/>
                            </svg>
                        </>
                    )}
                    {!token && (
                        <>
                            <Nav.Link onClick={() => navigate('/login')}>Login</Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;



