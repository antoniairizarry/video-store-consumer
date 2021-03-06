import React, { Component } from 'react';
import axios from 'axios';
import Movie from './movie';

class MovieSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', movieList: []};
    // https://reactjs.org/docs/forms.html
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    console.log(this.state.value)
  }

  handleSubmit(event) {
    // alert('A search was submitted: ' + this.state.value);
    event.preventDefault();
    //call API
    axios.get('http://localhost:3000/movies?query='+ this.state.value).then((response) => {
      this.setState({
        movieList: response.data
      })
      console.log(this.state.movieList)
    }).catch(() => {
      this.setState({
        error: 'Error'
      })
    })
  }

    //addMovie to rental library
    //TODO
    selectMovie = (movieId) => {
      const { movieList } = this.state;
  
      const selectedMovie = movieList.find((movie) => {
        return movie.id === movieId;
      });
  
      this.setState({ selectedMovie, });
    }

  render() {
    const movies = this.state.movieList.map((movie, i) => {
      return <Movie 
        key={i}
        // movie={movie}
        {...{movie}}
        {...this.props}
      />
    })
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Movie Search:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {movies}
      </div>
    );
  }
}


export default MovieSearch;
