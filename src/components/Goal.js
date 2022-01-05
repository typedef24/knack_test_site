import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import Modal from 'react-modal';
// import "../App.css";

export default class Goal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalIsOpen: false,
            goalProgress: props.goal.progress
        };

        // This binding is necessary to make `this` work in the callback
        this.handleUpdateProgressSubmit = this.handleUpdateProgressSubmit.bind(this);
    }

    // componentDidMount(){
    //     //initialise state from props whem component mounts
    //     this.setState({ goalProgress: this.props.goal.progress });
    // }

    handleUpdateProgressSubmit(e) {
        e.preventDefault();
        // validate submitted data
        if( this.state.goalProgress < 0 || this.state.goalProgress > 100 ){
          alert("Please fill the form correctly!\nGoal progress is required and must be an integer between 0 & 100 inclusive");
          return;
        }
        // Data is valid to be updated
        
        // close modal
        this.setState({ modalIsOpen: false });
        alert("Your progress on " + this.props.goal.title + " was updated successfully!");
    }

    render(){
        const customStyles = {
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              padding: 0,
              borderRadius: 5,
              borderColor: "#1f40e6",
              // width: "75%",
            },
        };

        return (
            <div className="GoalDiv" style={
                {
                  backgroundColor: this.props.counter % 2 != 0 ? "white" : "",
                  borderBottom: this.props.counter % 2 != 0 ? "1px solid gray" : "none"
                }
            }>
                <div className="GoalDetails">
                    <div className="GoalTitle">
                        <span>{this.props.goal.title}</span>
                    </div>
                    <div className="GoalProgress">
                        <ProgressBar bgColor="#1f40e6" completed={this.props.goal.progress} />
                    </div>
                </div>
                <div className="ButtonContainer">
                    <span></span>
                    <button type="button" className="ButtonSmProgress"
                        onClick={ () => this.setState({modalIsOpen: true}) }
                    >Update Progress</button>

                    <Modal
                        isOpen={this.state.modalIsOpen}
                        // onAfterOpen={afterOpenModal}
                        onRequestClose={ () => this.setState({modalIsOpen: false}) }
                        style={customStyles}
                        contentLabel="Update Goal Progress"
                    >
                        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
                        <div className="ModalHead">
                            Update goal progress
                            {/* <button style={{ color: "red" }} onClick={ () => this.setState({modalIsOpen: false}) } type="button" className="ButtonSm">Close</button> */}
                        </div>
                        <div className='ModalBody'>
                            <form onSubmit={this.handleUpdateProgressSubmit}>
                                <label><b>Enter new progress value from 0 - 100 for <span style={{ color: "#1f40e6" }}>{this.props.goal.title}</span></b></label>
                                <input required className='SiteInput' type="number" placeholder='Enter goal progress'
                                    value={this.state.goalProgress}
                                    min={0}
                                    max={100}
                                    onChange={ (e) => this.setState({goalProgress: e.target.value}) }
                                />
                                <br />
                                <div className="ButtonContainer">
                                    {/* <span></span> */}
                                    <button type="button" className="ButtonSmProgress"
                                    onClick={ () => this.setState({modalIsOpen: false}) }
                                    >Close</button>
                                    <button type="submit" className="ButtonSm">Update Progress</button>
                                </div>
                            </form>
                        </div>
                    </Modal>

                </div>
            </div>
        );
    }
}