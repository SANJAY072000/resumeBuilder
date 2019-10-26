import React,{Component} from 'react';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.onSubmit=this.onSubmit.bind(this);
    this.onChange=this.onChange.bind(this);
  }
  onSubmit(e){
    e.preventDefault();

  }
  onChange(e){

  }
  render(){
    return(
      <header className='mt-5'>
      <div className='container p-5 text-center'>
      <h1 className='lead display-4 text-uppercase my-3 d-none d-md-block'>
      build your resume</h1>
      <h1 className='text-uppercase my-3 d-md-none d-block'>
      <i className="fa fa-file-text-o mb-4 animated infinite tada" aria-hidden="true">
      </i><br/>
      build your resume<br/>
      </h1><hr/>
      <p className='my-4 d-md-block d-none lead'>As a developer, I love to see other developers' projects and the most prominent way to see their tangible work is through their github account. Great for all the tech-savy bosses who want to have a quick view of person's git/github activity, before the interview.</p>
      <form onSubmit={this.onSubmit}>
      <div className="form-group">
      <input type="text" className="form-control my-5 am" aria-describedby="emailHelp" placeholder="Enter your GitHub username and click on generate" onChange={this.onChange}/>
      <button type='submit' className='btn shadow text-center gnt px-5 py-2'>Generate
      </button>
      </div>
      </form>
      </div>
      <h5 className='font-weight-bolder text-center'>Note : To make your resume visible, just star this
      <a href='https://github.com/SANJAY072000?tab=repositories' target='_blank' rel="noopener noreferrer"> repository</a></h5><br/>
      </header>
    );
  }
}
