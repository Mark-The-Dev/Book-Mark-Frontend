import React, { Component } from  'react';
import PropTypes from 'prop-types';
import BookmarksContext from '../BookmarksContext';
import config from '../config'
import './EditBookmark.css';

const Required = () => (
  <span className='AddBookmark__required'>*</span>
)

class EditBookmark extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };
  
  static contextType = BookmarksContext;

  state = {
    title: '',
    url:'',
    description:'',
    rating:'1',
    error: null,
  };
  
  val1 = this.context.bookmarks

    componentDidMount(){
      this.getState()
    }

    componentDidUpdate(state){
    console.log('Am I here?',this.context)
    if (this.state.title === ''){
      if(this.context){
        this.getState()
      }
    }
    }
    


  getState = () => {
    let bookmarkId = this.props.match.params.id
    let newVal = this.context.bookmarks.filter(e => {
      console.log('e.id=',e.id)
      return Number(e.id) === Number(bookmarkId)
    })
    
    
    if (newVal.length !== 0){
      console.log('were here', newVal)
      this.setState({
        ...newVal[0], error: null
      },  () => console.log('this did run', this.state))
    }

  }
  

  grabTitle = (newTitle) => {
    this.setState({
      title: newTitle
    })
  }
  grabUrl = (arg) => { 
    this.setState({ 
      url:arg 
    }) 
  }
  grabDescription = (arg) => { 
    this.setState({ 
      description:arg 
    }) 
  }

  handleClickCancel = () => {
    this.props.history.push('/')
  };

  handleRating = (r) => {
    this.setState({
      rating: r
    })
  }

  render() {
    console.log('STATE',this.state)
    console.log(this.context.bookmarks)
    const { error } = this.state
    


    console.log('context is heere',this.context)


    
    return (
      <section className='AddBookmark'>
        <h2>Edit a bookmark</h2>
        <form
          className='AddBookmark__form'
          onSubmit={this.handleSubmit}
        >
          <div className='AddBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='title'>
              Title
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='title'
              id='title'
              value={this.state.title}
              onChange={(e) => this.grabTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor='url'>
              URL
              {' '}
              <Required />
            </label>
            <input
              type='url'
              name='url'
              id='url'
              value={this.state.url}
              onChange={(e) => this.grabUrl(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
              value={this.state.description}
              onChange={(e) => this.grabDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='rating'>
              Rating
              {' '}
              <Required />
            </label>
            <input
              type='number'
              name='rating'
              id='rating'
              value={this.state.rating}
              onChange={(e) => this.handleRating(e.target.value)}
              min='1'
              max='5'
              required
            />
          </div>
          <div className='AddBookmark__buttons'>
            <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default EditBookmark;
