import React,{Component} from 'react';
import axios from 'axios';

export default class Resume extends Component {
  componentWillMount(){
    axios({
      url:'https://api.github.com/repos/SANJAY072000/resumeBuilder/stargazers'
    })
    .then(res=>{
    if(!(res.data.filter(a=>
    a.login.toString()===this.props.match.params.username.toString()).length))
    this.props.history.push(`/`);
    else{
    axios({
      url:`https://api.github.com/users/${this.props.match.params.username}`
    })
    .then(res=>{
    this.setState({
    name:res.data.name,
    img:res.data.avatar_url,
    bio:res.data.bio,
    created_at:res.data.created_at.split('-')[0],
    location:res.data.location,
    repos:res.data.public_repos,
    followers:res.data.followers,
    blog:res.data.blog
    });
    })
    .catch(err=>console.log(err));
    }
    })
    .catch(err=>console.log(err));
  }
  constructor(props){
    super(props);
    this.state = {
      name:'',
      img:'',
      bio:'',
      created_at:'',
      location:'',
      repos:'',
      followers:'',
      blog:''
    };
  }
  render(){
    return(
      <section className='mt-5 p-3'>
      <div className='container p-5 border bg-light'>

      </div>
      </section>
    );
  }
}
