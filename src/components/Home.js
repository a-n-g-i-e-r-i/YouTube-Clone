import React, { Component } from "react";
import Search from "./Search";
import youtube from "./youtube";
import VideoData from "./VideoData";
import VideoPlayer from "./VideoPlayer";
import VideoCard from './VideoCard'

export default class Home extends Component {
    state = {
        videoInfo: [],
        selectedVideoId: null,
      }

      onVideoSelected = videoId => {
        this.setState({ selectedVideoId: videoId})
      }

      onSearch = async keyword => {
        const response = await youtube.get("./search", {
          params: {
            q: keyword,
          }
        })
        this.setState({
          videoInfo: response.data.items,
          selectedVideoId: response.data.items[0].id.videoId
        })
        // console.log(this.state)
      }
      render() {
      return (
          <div>
              <Search onSearch={this.onSearch} />
          <VideoData base target="_blank" className="inverted" onVideoSelected={this.onVideoSelected} data={this.state.videoInfo} />
          <VideoCard/>
          <VideoPlayer base target="_blank" videoId={this.state.selectedVideoId} />
        </div>
      );
      }
}
