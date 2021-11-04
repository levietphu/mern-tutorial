import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import ActionButtonComponent from './ActionButtonComponent';

const SinglePostComponent = ({ post: { _id, status, title, description, url } }) => {

    const variant = status === "LEARNED" ? 'success' : status === 'LEARNING' ? 'warning' : 'danger';

    return (
        <Card className="shadow" border={variant}>
            <Card.Body>
                <Card.Title>
                    <Row>
                        <Col>
                            <p className="post-title">{title}</p>
                            <Badge pill style={{ color: 'white' }} variant={variant} className={`bg-${variant}`}>{status}</Badge>
                        </Col>'
                        <Col className="text-right">
                            <ActionButtonComponent url={url} _id={_id}></ActionButtonComponent>
                        </Col>
                    </Row>
                </Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default SinglePostComponent
