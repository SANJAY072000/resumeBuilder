import React,{Component} from 'react';
import axios from 'axios';

let m=new Map(),s=new Set(),sum=0;


export default class Resume extends Component {
  componentDidMount(){
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
    axios({
    url:`https://api.github.com/users/${this.props.match.params.username}/repos`
    })
    .then(res=>{
    res.data.forEach(a=>{
      if(a.language!==null)s.add(a.language);
    });
    for(const x of s){
    sum+=res.data.filter(a=>a.language===x).length;
    m.set(x,res.data.filter(a=>a.language===x).length);
    }
    for(const [k,v] of m.entries()){
    m.set(k,Math.floor(v*100/sum));
    }
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
      <section className='mt-5'>
      <div className='container p-5 rounded'>
      <div className='row'>
      <div className='col-md-6 d-block d-md-none'>
      <img src={this.state.img} className='img-fluid d-block mx-auto rounded-circle' width='300' height='250' alt='Unavailable'/>
      </div>
      <div className='col-md-6'>
      <h2 className='text-uppercase mt-5 display-5 d-block d-md-none text-center'>{this.state.name}
      </h2>
      <h1 className='text-uppercase mt-5 display-4 d-none d-md-block
      font-weight-bold pl-3'>{this.state.name}
      </h1>
      <p className='mt-4 pl-3'>{this.state.bio}</p>
      </div>
      <div className='col-md-6 d-md-block d-none'>
      <img src={this.state.img} className='img-fluid d-block mx-auto rounded-circle' width='300' height='250' alt='Unavailable'/>
      </div>
      </div>
      <br/>
      <hr/>
        <div className='row mt-5'>
        <div className='col-md-3'>
        <h4 className='pl-3 font-weight-bolder mt-2 d-none d-md-block'>GitHub Profile</h4>
        <h4 className='pl-3 font-weight-bolder d-block d-md-none'>GitHub Profile</h4>
        </div>
        <div className='col-md-9'>
        <p className='lead pl-3 esp d-none d-md-block'>{`On GitHub since ${this.state.created_at}, ${this.state.name} is a developer based in ${this.state.location} with ${this.state.repos} public repositories and ${this.state.followers} followers.`}</p>
        <p className='lead pl-3 esp d-block d-md-none'>{`On GitHub since ${this.state.created_at}, ${this.state.name} is a developer based in ${this.state.location} with ${this.state.repos} public repositories and ${this.state.followers} followers.`}</p>
        </div>
        </div>
        <br/>
        <hr/>
          <div className='row mt-5'>
          <div className='col-md-3'>
          <h4 className='pl-3 font-weight-bolder mt-2 d-none d-md-block'>Website</h4>
          <h4 className='pl-3 font-weight-bolder d-block d-md-none'>Website</h4>
          </div>
          <div className='col-md-9'>
          <a href={this.state.blog} className='lead pl-3 esp d-none d-md-block' target='_blank' rel="noopener noreferrer">{this.state.blog}</a>
          <a href={this.state.blog} className='lead pl-3 esp d-block d-md-none mt-3' target='_blank' rel="noopener noreferrer">See my Portfolio <i className="fa fa-link" aria-hidden="true"></i></a>
          </div>
          </div>
          <br/>
          <hr/>
            <div className='row mt-5'>
            <div className='col-md-3'>
            <h4 className='pl-3 font-weight-bolder mt-2 d-none d-md-block'>Languages</h4>
            <h4 className='pl-3 font-weight-bolder d-block d-md-none'>Languages</h4>
            </div>
            <div className='col-md-9'>
            <ul className='lu d-block d-md-none mt-4 mx-auto'>
            <li>Javascript -->  73%</li>
            <li>Javascript -->  73%</li>
            <li>Javascript -->  73%</li>
            </ul>
            <ul className='lu d-none d-md-block'>
            <li>Javascript -->  73%</li>
            <li>Javascript -->  73%</li>
            <li>Javascript -->  73%</li>
            </ul>
            </div>
            </div>
      </div>
      </section>
    );
  }
}
