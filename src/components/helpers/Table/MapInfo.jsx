import { GoogleApiWrapper, Map } from "google-maps-react";
import { Component } from "react";

class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        style={{ width: "100%", height: "100%" }}
        initialCenter={{ lat: 9.108633, lng: 7.392084 }}
      />
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyCq1bv_ErlnAedi9UFi6FPmfpJ5O5WoN9U",
})(MapContainer);
