import axios from "axios";

const DataService = {
  getData() {
    return axios.get("https://smartqdemo.firebaseio.com/events-data.json")
      .then(response => {return response.data})
      .catch(error => console.log(error));
  },
  loadData(dispatch) {
    dispatch({type: "LOADING_DATA", payload: null});
    this.getData().then(data => {
      dispatch({type: "GET_DATA", payload: data});
    })
    .catch(error => {
      dispatch({type: "ERROR_DATA", payload: null});
    })
    .finally(() => {})
  }
}

export default DataService;