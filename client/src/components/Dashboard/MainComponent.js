import { useContext, useEffect } from "react";
import { PostContext } from "../../contexts/PostContext";
import Spinner from 'react-bootstrap/Spinner';
import { AuthContext } from '../../contexts/AuthContext';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SinglePostComponent from "./SinglePostComponent";

const MainComponent = () => {

    const { authState: { user: { username } } } = useContext(AuthContext);

    const { postState: { posts, postLoading }, getPost, setAddPostModal } = useContext(PostContext);

    useEffect(() => getPost(), [])

    const showPost = (posts) => {
        let result = null;
        if (postLoading) {
            result = (
                <div className="spinner-container">
                    <Spinner animation="border" variant="info"></Spinner>
                </div>
            )
        } else if (posts.length === 0) {

            const showModal = () => {
                setAddPostModal(true);
            }

            result = (
                <Card className="text-center mx-5 my-5">
                    <Card.Header as='h1'>Hi {username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome to LearnIt</Card.Title>
                        <Card.Text>
                            Click the button below to track your first skill to learn
                        </Card.Text>
                        <Button variant="primary" onClick={showModal}>LearnIt!</Button>
                    </Card.Body>
                </Card>
            )
        } else {
            result = (
                <>
                    <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
                        {posts.map(post => {
                            return (
                                <Col key={post._id} className="my-2">
                                    <SinglePostComponent post={post}></SinglePostComponent>
                                </Col>
                            )
                        })}
                    </Row>
                </>
            )
        }
        return result;
    }

    return (
        <>
            {showPost(posts)}
        </>
    )
}

export default MainComponent
