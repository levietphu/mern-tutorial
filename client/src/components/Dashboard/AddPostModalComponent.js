import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext, useState } from 'react';
import { PostContext } from '../../contexts/PostContext';

const AddPostModalComponent = () => {

    let { addPostModal, setAddPostModal, addPost, setShowToast } = useContext(PostContext);

    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'LEARN'
    })

    const { title, description, url } = newPost;

    const closeDialog = () => {
        setNewPost({ title: '', description: '', url: '', status: 'LEARN' })
        setAddPostModal(false)
    }

    const getValue = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setNewPost({ ...newPost, [name]: value })
    }

    const addNewPost = async (event) => {
        event.preventDefault();
        const addPostData = await addPost(newPost);
        closeDialog();
        setShowToast({show: true, message: addPostData.message, type: addPostData.success ? 'success':'danger'})
    }

    return (
        <Modal show={addPostModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>
                    What do you want to learn ?
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={addNewPost}>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDialog}>Cancel</Button>
                    <Button variant="primary" type="submit">LearnIt!</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddPostModalComponent
