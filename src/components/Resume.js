import React,{Component} from 'react';
import axios from 'axios';

let m=new Map(),s=new Set(),sum=0,arr=[],brr=[],crr=[],t=new Set();


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
    arr.push(k);arr.push(Math.floor(v*100/sum));
    }
    this.setState({lang:arr});
    })
    .catch(err=>console.log(err));
    }
    })
    .catch(err=>console.log(err));
    axios({
    url:`https://api.github.com/users/${this.props.match.params.username}/repos`
    })
    .then(res=>{
    let i,j,val;
    res.data.forEach(a=>brr.push(a.watchers+a.forks));
    for(i=1;i<brr.length;++i){
    val=brr[i];
    for(j=i-1;brr[j]<val&&j>=0;brr[j+1]=brr[j--]);
    brr[j+1]=val;
    }
    for(i=0;i<5;t.add(brr[i]),++i);
    let drr=[];
    for(const x of t){
    crr=res.data.filter(a=>(a.watchers+a.forks===x));
    crr.forEach(a=>drr.push(a));
    }
    this.setState({alr:drr});
    })
    .catch(err=>console.log(err));
    axios({
    url:`https://api.github.com/users/${this.props.match.params.username}/orgs`
    })
    .then(res=>this.setState({org:res.data}))
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
      blog:'',
      lang:[],
      alr:[],
      org:[]
    };
  }
  render(){
    return(
      <section className=''>
      <div className='d-flex justify-content-left pl-5 mt-5'>
      <button className='btn btn-danger btn-sm' onClick={()=>window.print()}>
      Print this out !</button>
      </div>
      <div className='container p-5 rounded mt-5' id='pi'>
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
      <ul className='lu d-block d-md-none mt-4'>
      {this.state.lang.map((a,i)=>{
      if(isNaN(a))
      return (<li className='mt-2' key={i}>{`${a}  ( ${this.state.lang[i+1]}% )`}</li>);
      return (<li key={i}></li>);
          })}
            </ul>
            <ul className='lu d-none d-md-block'>
            {this.state.lang.map((a,i)=>{
            if(isNaN(a))
            return (<li className='mt-2' key={i}>{`${a}  ( ${this.state.lang[i+1]}% )`}</li>);
            return (<li key={i}></li>);
                })}
            </ul>
            </div>
            </div>
            <br/>
            <hr/>
            <div className='row mt-5'>
            <div className='col-md-3'>
            <h4 className='pl-3 font-weight-bolder mt-2 d-none d-md-block'>Popular Repositories</h4>
            <h4 className='pl-3 font-weight-bolder d-block d-md-none mb-3'>Popular Repositories</h4>
            </div>
            <div className='col-md-9'>
            {this.state.alr.map((a,i)=>{
            if(i<5)
            return (<div className='row my-5' key={i}>
            <div className='col-md-9'>
            <h3 className='pl-5 display-5 d-none d-md-block'>{a.name}</h3>
            <h3 className='pl-5 display-5 d-block d-md-none mt-3'>{`${a.name}  ${a.created_at.split('-')[0]}`}</h3>
            <p className='lead pl-5 esp mt-4'>
            {a.description}<br/><br/>
            {`This repository has ${a.stargazers_count} stars and ${a.forks} forks. To know more about this repository and my contributed code, visit the`}
            <a href={a.html_url} target='_blank' rel="noopener noreferrer"> repo </a>
            on GitHub.
            </p>
            </div>
            <div className='col-md-3 font-weight-bolder d-none d-md-block'>
            {a.created_at.split('-')[0]}
            </div>
            </div>);
            return (<div key={i}></div>);
            })}
            </div>
            </div>
            <br/>
            <hr/>
            <div className='row mt-5'>
            <div className='col-md-3'>
            <h4 className='pl-3 font-weight-bolder mt-2 d-none d-md-block'>Organizations</h4>
            <h4 className='pl-3 font-weight-bolder d-block d-md-none'>Organizations</h4>
            </div>
            <div className='col-md-9'>
            {this.state.org.map((a,i)=><div className='row my-5' key={i}>
            <div className='col-md-9'>
            <h3 className='pl-5 display-5'>{a.login}</h3>
            <img src={a.avatar_url} className='mt-4 img-fluid rounded-circle d-block mx-auto' alt='Unavailable' width='200' height='200'/>
            </div>
            </div>)}
            </div>
            </div>
            <br/>
            <hr/>
              <div className='row mt-5'>
              <div className='col-md-3'>
              <h4 className='pl-3 font-weight-bolder mt-2 d-none d-md-block'>About This Résumé</h4>
              <h4 className='pl-3 font-weight-bolder d-block d-md-none'>About This Résumé</h4>
              </div>
              <div className='col-md-9'>
              <p className='lead pl-5 esp mt-1'>
              This résumé is generated automatically using public information from the developer's GitHub account. The repositories are ordered based on their popularity. Do not hesitate to visit
              <a href={`https://github.com/${this.props.match.params.username}`} target='_blank' rel="noopener noreferrer"> {`${this.state.name}'s GitHub page`}</a> for a complete work history.
              </p>
              </div>
              </div>
      </div>
      </section>
    );
  }
}
