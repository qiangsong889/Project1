import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Review from './DisplayReviews';
import List from './restaurant-list';
import { toggleBio } from '../testactions/toggleBio';
import { changeBio } from '../testactions/changeBio';
import { initReviews } from '../testactions/initReviews';
//need a location finder for user location

class User extends Component{
    constructor(props) {
        super(props)

        this.renderCondition = this.renderCondition.bind(this);
        this.BioDisplay = this.BioDisplay.bind(this);
        this.BioChangehandler = this.BioChangehandler.bind(this);
    }
    
    componentDidMount(){

        axios.get(`/api/reviews?userid=${this.props.user.id}`).then( res => {
            console.log('User reviews', res.data)
            //set state with data
            this.props.initReviews(res.data);
            console.log('Reviews?', this.props.reviews)
        })
        .catch(err => { console.log('axois get request err (userdisplay.js', err); } );
    }


    renderCondition() {
        //search db for reviews associated with this user id

        if( this.props.reviews.length <= 0 ){
            //if no reviews
            return ( <div> You have no food thoughts! <br/> Search for a restaurant to submit your thoughts... </div> )

        } else {
            //if they have reviews
            return (
                <div >
                Comments
                <Review username={this.props.user.name}/>
                </div>
            )
        }

    }

    BioDisplay() {
        //display either bio edit or bio depending on state 
        if(this.props.editBio.value) {
            //display edit box prepopulated with previous bio
            //save button or tansition edit to save??
            return(
                <div> <textarea defaultValue={this.props.user.bio} onChange={ (event) => {this.BioChangehandler(event)} } ref="bioText" ></textarea> </div>
            ) 
        } 
        else{
            return <p> {this.props.user.bio} </p>
           
        }

    }

    BioChangehandler() {
        //saves changes to biotext area
        this.props.changeBio(this.refs.bioText.value)
    }


    render() {
        
        return(
            <div>
            <p> User Page </p>
            <p>Welcome, {this.props.user.name} </p>
            <p>You are located at: {this.props.user.location} </p>
            <p>Your Bio <button onClick={ () => { this.props.toggleBio() }} >Edit</button></p>
            { this.BioDisplay() }
            {this.renderCondition()}
            </div>
        )
}

}

//mapStateToProps is the contain for this component
//takes a piece of state and adds to props
function mapStateToProps(state) {
  return { user: state.user,
           editBio: state.editBio,
           reviews: state.reviews 
} 
};

//connect action creater to component/state
function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleBio: toggleBio,
    changeBio: changeBio,
    initReviews: initReviews
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(User);