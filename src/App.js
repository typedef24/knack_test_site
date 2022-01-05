// import logo from './logo.svg';
import React from 'react';
import './App.css';
import "./components/Goal";
import Goal from './components/Goal';
import Modal from 'react-modal';

class App extends React.Component {
  constructor(props){
    super(props);
    //initialize state with some recommended goals
    this.state = {
      modalIsOpen: false,
      title: "",
      progress: 0,
      goals: [
        {
          title: "Improve communication skills",
          progress: 20
        },
        {
          title: "Improve team management",
          progress: 50
        },
        {
          title: "PHP & Wordpress development skills",
          progress: 100
        },
        {
          title: "Improve leadersbip skills",
          progress: 50
        },
        {
          title: "Swimming skills",
          progress: 20
        },
        {
          title: "React & React Native Modern Workflows",
          progress: 75
        },
        {
          title: "Driving",
          progress: 10
        },
      ]
    };

    // This binding is necessary to make `this` work in the callback
    this.handleAddGoalSubmit = this.handleAddGoalSubmit.bind(this);
  }

  handleAddGoalSubmit(e) {
    e.preventDefault();
    // validate submitted data
    if(!this.state.title || (this.state.progress < 0 || this.state.progress > 100) ){
      alert("Please fill the form correctly!\nBoth inputs are required and the progress must be an integer between 0 & 100 inclusive");
      return;
    }
    // Data is valid to be added => create a goal object from submitted data
    let newGoal = {
      title: this.state.title,
      progress: this.state.progress
    };
    // copy goals array from state into a temporal array
    let tempGoals = this.state.goals;
    // add newGoal at the begining of tempGoals
    tempGoals.push(newGoal);  // added to the end due to runtime bug
    /* close the modal then replace goals in state with tempGoals
      Also reset form inputs for good UX
    */
    this.setState({ modalIsOpen: false, goals: tempGoals, title: "", progress: 0 });
    alert("Professional goal added successfully!");
  }

  render(){
    let counter = 0;

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
      <div className="AppContainer">
        <div className="ShadowDiv">
          <header className="PanelHead">
            Recommended Professional Development Goals
            <button onClick={ () => this.setState({modalIsOpen: true}) } type="button" className="ButtonSm">Add Goal</button>
          </header>
          
          <Modal
            isOpen={this.state.modalIsOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={ () => this.setState({modalIsOpen: false}) }
            style={customStyles}
            contentLabel="Create Professional Goal"
          >
            {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
            <div className="ModalHead">
              Add professional goal
              {/* <button style={{ color: "red" }} onClick={ () => this.setState({modalIsOpen: false}) } type="button" className="ButtonSm">Close</button> */}
            </div>
            <div className='ModalBody'>
              <form onSubmit={this.handleAddGoalSubmit}>
                <input required className='SiteInput' type="text" placeholder='Enter professional goal'
                  value={this.state.title}
                  onChange={ (e) => this.setState({title: e.target.value}) }
                />
                <br />
                <input required className='SiteInput' type="number" placeholder='Enter goal progress'
                  value={this.state.progress}
                  min={0}
                  max={100}
                  onChange={ (e) => this.setState({progress: e.target.value}) }
                />
                <br />
                <div className="ButtonContainer">
                    {/* <span></span> */}
                    <button type="button" className="ButtonSmProgress"
                      onClick={ () => this.setState({modalIsOpen: false}) }
                    >Close</button>
                    <button type="submit" className="ButtonSm">Submit</button>
                </div>
              </form>
            </div>
          </Modal>

          <div className='PanelBody'>
            {
              this.state.goals.map((item, index) => (
                <Goal goal={item}
                  key={index}
                  counter={
                    counter++
                  }/>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
