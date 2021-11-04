import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext, useState, useEffect } from 'react';
import { PostContext } from '../../contexts/PostContext';

const UpdatePostModalComponent = () => {

    let { updatePostModal, setUpdatePostModal, updatePost, setShowToast, postState: { post } } = useContext(PostContext);

    const [updatedPost, setUpdatedPost] = useState(post);

    const { title, description, url, status } = updatedPost;

    const closeDialog = () => {
        setUpdatePostModal(false)
    }

    useEffect(() => {
       setUpdatedPost(post)
    }, [post])

    const getValue = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setUpdatedPost({ ...updatedPost, [name]: value })
    }

    const onUpdatedPost = async (event) => {
        event.preventDefault();
        const updatedPostData = await updatePost(updatedPost._id,updatedPost);
        closeDialog();
        setShowToast({ show: true, message: updatedPostData.message, type: updatedPostData.success ? 'success' : 'danger' })
    }

    return (
        <Modal show={updatePostModal} onHide={closeDialog}> 
            <Modal.Header closeButton>
                <Modal.Title>
                    Making progess ?
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={onUpdatedPost}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control type="text" onChange={getValue} value={title} name="title" placeholder="Nhập tiêu đề ... " required aria-describedby="title-help" />
                        <Form.Text id="title-help" muted>Required</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" onChange={getValue} value={description} rows={3} placeholder="Nhập mô tả ..." name="description" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" onChange={getValue} value={url} placeholder="Nhập url ..." name="url" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as='select' value={status} name="status" onChange={getValue}>
                            <option value="LEARN">LEARN</option>
                            <option value="LEARNING">LEARNING</option>
                            <option value="LEARNED">LEARNED</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDialog}>Cancel</Button>
                    <Button variant="primary" type="submit">Updated !</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UpdatePostModalComponent
