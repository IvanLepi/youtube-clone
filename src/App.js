import React from 'react';

import axios from 'axios';

import { Grid } from '@material-ui/core';

import { SearchBar, VideoList, VideoDetail } from './components';

class App extends React.Component {

  state = {
    videos: [],
    selectedVideo: null
  }

  onVideoSelect = (video) => {
    this.setState({selectedVideo: video});
  }

  handleSubmit = async (searchTerm) => {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search',
     {params: {part: 'snippet', key:'API_KEY',q:searchTerm}});

    console.log(response.data.items);
    this.setState({videos: response.data.items, selectedVideo: response.data.items[2]});
  }

  

  render (){
    const {selectedVideo, videos} = this.state;

    return (
      <Grid justify='center' container spacing={10}>
        <Grid item xs={12}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <SearchBar onFormSubmit={this.handleSubmit}/>
            </Grid>
            <Grid item xs={8}>
              <VideoDetail video={selectedVideo}/>
            </Grid>
            <Grid item xs={4}>
              <VideoList videos={videos} onVideoSelect={this.onVideoSelect}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default App;