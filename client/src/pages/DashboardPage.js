import { Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Spinner from 'react-bootstrap/Spinner';
import NavBarComponent from '../components/Dashboard/NavBarComponent';
import MainComponent from '../components/Dashboard/MainComponent';
import AddPostModalComponent from '../components/Dashboard/AddPostModalComponent';
import { PostContext } from '../contexts/PostContext';
import addIcon from '../assets/plus-circle-fill.svg';
import Button from 'react-bootstrap/Button';
import OverLayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Toast from 'react-bootstrap/Toast';
import UpdatePostModalComponent from '../components/Dashboard/UpdatePostModalComponent';


const DashboardPage = () => {

    let { authState: { authLoading, isAuthenticated } } = useContext(AuthContext);

    let { setAddPostModal, showToast: { show, message, type }, setShowToast, postState : { post } } = useContext(PostContext);

    if (authLoading) {
        return (
            <div className="spinner-container">
                <Spinner animation="border" variant="info"></Spinner>
            </div>
        )
    }
    if (!isAuthenticated) {
        return (
            <Redirect to="/login"></Redirect>
        )
    } else {
        return (
            <>
                <NavBarComponent></NavBarComponent>
                <MainComponent></MainComponent>

                {/* Onpen Modal */}
                <OverLayTrigger placement="left" overlay={<Tooltip>Add a new thing to learn</Tooltip>}>
                    <Button className="btn-floating" onClick={setAddPostModal.bind(this, true)}>
                        <img src={addIcon} alt="add-post" width="60" height="60" />
                    </Button>
                </OverLayTrigger>

                <AddPostModalComponent></AddPostModalComponent>
                {post !== null && <UpdatePostModalComponent />}

                <Toast show={show} style={{ position: 'fixed', top: '20%', right: '10px' }}
                    className={`bg-${type} text-white`} onClose={setShowToast.bind(this, {
                        show: false,
                        message: '',
                        type: null
                    })} delay={5000} autohide>
                    <Toast.Body>
                        <strong>{message}</strong>
                    </Toast.Body>
                </Toast>
            </>
        )
    }

}

export default DashboardPage
