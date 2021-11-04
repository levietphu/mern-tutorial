import Button from 'react-bootstrap/Button';
import playIcon from '../../assets/play-btn.svg';
import editIcon from '../../assets/pencil.svg';
import deleteIcon from '../../assets/trash.svg';
import { PostContext } from '../../contexts/PostContext';
import { useContext } from 'react';

const ActionButtonComponent = ({ url, _id }) => {

    const { deletePost, setShowToast, findPost, setUpdatePostModal } = useContext(PostContext);

    const onDeletePost = async () => {
        const deleteData = await deletePost(_id);
        setShowToast({
            show: true,
            message: deleteData.message,
            type: deleteData.success ? 'success' : 'danger'
        })
    }

    const choosePost = (id) => {
        findPost(id);
        setUpdatePostModal(true);
    }

    return (
        <>
            <Button className="post-button" href={url} target="_blank">
                <img src={playIcon} alt="play" width="32" height="32" />
            </Button>
            <Button className="post-button">
                <img src={editIcon} alt="edit" width="24" height="24" onClick={() => choosePost(_id)} />
            </Button>
            <Button className="post-button">
                <img src={deleteIcon} alt="delete" width="24" height="24" onClick={onDeletePost} />
            </Button>
        </>
    )
}

export default ActionButtonComponent
