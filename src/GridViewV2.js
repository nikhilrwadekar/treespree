import React from "react";
import "./GridViewV2.css";
import GridItemV2 from "./GridItemV2";

class GridViewV2 extends React.Component {
  state = {
    treeCommonNames: [],
    limitPerPage: 12,
    searchGridQuery: "",
    gridStarterIndex: 0,
    treeFilteredCommonNames: []
  };
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.getDatafromTreeSpreeAPI();
  }

  // Handle Change for Grid View Search
  handleChange(event) {
    // Update Grid Query in Component State
    this.setState({
      ...this.state,
      gridStarterIndex: 0,
      searchGridQuery: event.target.value
    });

    let treeFilteredCommonNames;

    // If search Query exists
    if (this.state.searchGridQuery) {
      // Filter Array!
      treeFilteredCommonNames = this.state.treeCommonNames.filter(
        treeCommonName =>
          treeCommonName.common_name
            .toUpperCase()
            .includes(this.state.searchGridQuery.toUpperCase())
      );

      // Set the Filtered Array in State to the one we just filtered..
      this.setState({
        ...this.state,
        searchGridQuery: event.target.value,
        treeFilteredCommonNames: treeFilteredCommonNames
      });
    } //Set filtered array back as same as Common Names Array
    else
      this.setState({
        ...this.state,
        searchGridQuery: event.target.value,
        treeFilteredCommonNames: this.state.treeCommonNames
      });
  }

  getDatafromTreeSpreeAPI() {
    fetch("http://treespree.wmdd.ca/api/trees/names")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          ...this.state,
          treeCommonNames: responseJson,
          treeFilteredCommonNames: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  updateGridView(event) {
    // Page Number: 4; Items: 60; 4*12
    let newGridStarterIndex = (event.target.id - 1) * this.state.limitPerPage;
    console.log(`New Starter Index: ${newGridStarterIndex}`);
    this.setState({
      ...this.state,
      gridStarterIndex: newGridStarterIndex
    });
  }

  paginateGridView = () => {
    let pagination = [];
    let numberOfPages = Math.ceil(
      this.state.treeFilteredCommonNames.length / this.state.limitPerPage
    );

    let children = [];
    for (let i = 1; i <= numberOfPages; i++) {
      children.push(
        <button
          key={i}
          id={i}
          onClick={this.updateGridView.bind(this)}
        >{`${i}`}</button>
      );
    }

    pagination.push(<div>{children}</div>);
    return pagination;
  };

  render() {
    return (
      <>
        {/* Search Box for Grid View */}
        <input
          placeholder="Search and explore trees"
          value={this.state.searchGridQuery}
          onChange={this.handleChange.bind(this)}
        />

        {/* The Grid View itself */}
        <div className="GridViewV2">
          {this.state.treeFilteredCommonNames
            .slice(
              this.state.gridStarterIndex,
              this.state.gridStarterIndex + this.state.limitPerPage
            )
            .map((treeCommonName, index) => {
              return (
                <GridItemV2
                  key={index}
                  imageLink={`/svg/leaves/${treeCommonName.absolute_common_name.toLowerCase()}.svg`}
                  title={treeCommonName.common_name}
                  linkToPopUp={
                    "/tree/name/" + treeCommonName.common_name.toLowerCase()
                  }
                />
              );
            })}
        </div>

        {/* Pagination for the Grid View */}
        <div>
          <div>{this.paginateGridView()}</div>
          {/* {} */}
        </div>
      </>
    );
  }
}

export default GridViewV2;
