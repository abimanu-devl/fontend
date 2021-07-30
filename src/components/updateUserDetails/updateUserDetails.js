import React,{Component} from 'react';

class updateUserDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            userId: this.props.match.params.id,
            userName:'',
            empName:'',
            comName:''
        }
        //user defined funtion bind area

        console.log(this.state.userId);
    }

    componentDidMount(){

    }

    render(){
        return(
            <div>

            </div>
        )
    }
}

export default updateUserDetails;