import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, CardTitle, Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const maxLength = len => val => !(val) || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

function RenderDish({ dish }) {
    return(
        <div className="col-12 col-md-5 m-1">
            <FadeTransform in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        </div>
);

function RenderComments({ comments, postComment, dishId }) {
    if (comments != null)
    return (
        <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            <ul className="list-unstyled">
                <Stagger in>
                    {comments.map((comment) => {
                        return (
                            <Fade in>
                            <li key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                            </li>
                            </Fade>
                        );
                    })}
                </Stagger>
                {comments.map(commentDetail => {
                    return (
                        <li key={commentDetail.id}>
                            <p>{comment.comment}</p>
                            <p>-- {commentDetail.author}, {displayDate}</p>
                        </li>

                    )
                })}
            </ul>
            <CommentForm dishId={dishId} postComment={postComment} />
        </div>
    );
}

    const DishDetail = (props) => {
        if (props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null)
            return (
                <div className="container">
                    <div className='row'>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{dish.name}</h3>
                            <hr />
                        </div>
                        <div className="row">
                            <RenderDish dish={dish} />
                            <RenderComments comments={props.comments}
                                addComment={props.postCommentComment}
                                dishId={props.dish.id} />
                        </div>
                    </div>
                    );
                else
                    return(
                <div></div>
                    );
            }
        
class CommentForm extends Component {
                        constructor(props)}
                    super(props);
                    this.toggleModal = this.toggleModal.bind(this);
        this.state = {
                        isModalOpen} false;
                };
            }
        
    toggleModal() {
                        this.setState({
                            isModalOpen: !this.state.isModalOpen
                        })
                    }

                    handleSubmit(values) {
                        this.toggleModal(),
                        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment),

                        render()}
                    const {isModalOpen} = this.state;
                    return (
            <div>
                        <Button outline onClick={this.toggleModal}>
                            <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                        <Modal isOpen={isModalOpen} toggle={this.toggleModal}>
                            <ModalHeader> Submit Comment </ModalHeader>
                            <ModalBody>
                                <div className="col-12">
                                    <LocalForm onSubmit={values => this.handleSubmit(values)}>
                                        <Row className="form-group">
                                            <Label htmlFor="rating">Rating</Label>
                                            <Control.select model='.rating'
                                                name='rating'
                                                className='form-control' defaultValue='1'>
                                                {[1, 2, 3, 4, 5].map((val, idx) => (
                                                    <option value={val} key={idx}>{val}</option>
                                                ))}
                                            </Control.select>
                                        </Row>
                                        <Row className="form-group">
                                            <Label htmlFor="author">Your Name</Label>
                                            <Control.text model='.author'
                                                placeholder="Your Name"
                                                name='author'
                                                className='form-control'
                                                validators={{
                                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                                }}
                                            />
                                            <Errors
                                                className="text-danger"
                                                model=".author"
                                                show="touched"
                                                messages={{
                                                    required: 'Required',
                                                    minLength: 'Must be greater than 2 characters',
                                                    maxLength: 'Must be 15 characters or less'
                                                }}
                                            />
                                        </Row>
                                        <Row className='form-group'>
                                            <Label htmlFor="comment">Comment</Label>
                                            <Control.textarea model=".comment" id="comment" name="comment"
                                                rows="6"
                                                className="form-control">
                                            </Control.textarea>
                                        </Row>
                                        <Row className='form-group'>
                                            <Button type="submit" color="primary">
                                                Submit
                                    </Button>
                                        </Row>
                                    </LocalForm>
                                </div>
                            </ModalBody>
                        </Modal>
                    </div>
                </div>
            );
        }
    }

    export default DishDetail;
