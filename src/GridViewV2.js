import React from "react";
import "./GridViewV2.css";
import GridItemV2 from "./GridItemV2";
import Axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import ReactPaginate from "react-paginate";
import Spinner from "react-bootstrap/Spinner";
import { Accordion, Card, Button } from "react-bootstrap";

class GridViewV2 extends React.Component {
  state = {
    treeCommonNames: [],
    selectedBasicSearchOptions: [],
    selectedGenus: [],
    selectedSpecies: [],
    selectedNeighbourhoods: [],
    limitPerPage: 6,
    searchGridQuery: "",
    gridStarterIndex: 0,
    treeFilteredCommonNames: [],
  };
  constructor(props) {
    super(props);

    this.updateGridPerPageLimit = this.updateGridPerPageLimit.bind(this);
  }

  componentWillMount() {
    this.getDatafromTreeSpreeAPI();

    // API Calls

    // Neighbourhoods
    Axios.get("https://treespree.wmdd.ca/api/neighbourhoods").then(
      (Response) => {
        // Get neighbourhoods and map them
        let optionsMapped = Response.data.map((neighbourhood) => {
          return {
            label: neighbourhood.neighbourhood_name,
            value: neighbourhood.neighbourhood_name,
          };
        });

        // Map Neighbourhoods to State
        this.setState({
          ...this.state,
          neighbourhoods: optionsMapped,
        });

        // Species
        Axios.get("https://treespree.wmdd.ca/api/trees/species").then(
          (Response) => {
            // Get species and map them
            let optionsMapped = Response.data.map((species) => {
              return {
                label: species.species_name,
                value: species.species_name,
              };
            });

            // Map species to State
            this.setState({
              ...this.state,
              species: optionsMapped,
            });
          }
        );

        // Genus
        Axios.get("https://treespree.wmdd.ca/api/trees/genus").then(
          (Response) => {
            // Get genus and map them
            let optionsMapped = Response.data.map((genus) => {
              return {
                label: genus.genus_name,
                value: genus.genus_name,
              };
            });

            // Map genus to State
            this.setState({
              ...this.state,
              genus: optionsMapped,
            });
          }
        );
      }
    );
  }

  // Code Courtesy - Stackoverflow user: envo
  arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  // Window Resize Handling Code from https://www.hawatel.com/blog/handle-window-resize-in-react/

  componentDidMount() {
    console.log("component Did Mount" + this.state.limitPerPage);
    this.updateGridPerPageLimit();
    window.addEventListener("resize", this.updateGridPerPageLimit);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateGridPerPageLimit);
  }

  updateGridPerPageLimit() {
    let limitPerPage,
      windowSize,
      windowWidth = window.innerWidth;
    if (windowWidth < 500) {
      limitPerPage = 6;
      windowSize = "xs";
    } else if (windowWidth >= 500 && windowWidth < 750) {
      limitPerPage = 9;
      windowSize = "s";
    } else if (windowWidth >= 750 && windowWidth < 1000) {
      limitPerPage = 12;
      windowSize = "m";
    } else if (windowWidth >= 1000) {
      limitPerPage = 15;
      windowSize = "lg";
    }

    this.setState({ ...this.state, limitPerPage, windowSize });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Component Did Update: " + this.state.limitPerPage);

    // If Common Names were Filtered
    if (
      !this.arraysEqual(
        prevState.selectedNeighbourhoods,
        this.state.selectedNeighbourhoods
      ) ||
      !this.arraysEqual(
        prevState.selectedSpecies,
        this.state.selectedSpecies
      ) ||
      !this.arraysEqual(prevState.selectedGenus, this.state.selectedGenus)
    ) {
      // If Advanced Options Change, Filter Tree Common Names!

      let treeFilteredCommonNames = this.state.treeCommonNames.filter(
        (treeCommonName) => {
          // If ALL THREE Options are used
          if (
            this.state.selectedNeighbourhoods.length &&
            this.state.selectedGenus.length &&
            this.state.selectedSpecies.length
          ) {
            return (
              this.state.selectedSpecies.includes(
                treeCommonName.species_name
              ) &&
              this.state.selectedGenus.includes(treeCommonName.genus_name) &&
              this.state.selectedNeighbourhoods.filter(
                (selectedNeighbourhood) =>
                  treeCommonName.neighbourhood_names.includes(
                    selectedNeighbourhood
                  )
              ).length
            );
          }

          // If ANY TWO of the Options are used
          else if (
            (this.state.selectedNeighbourhoods.length &&
              this.state.selectedGenus.length) ||
            (this.state.selectedNeighbourhoods.length &&
              this.state.selectedSpecies.length) ||
            (this.state.selectedGenus.length &&
              this.state.selectedSpecies.length)
          ) {
            // console.log("ANY TWO!");

            return (
              (this.state.selectedSpecies.includes(
                treeCommonName.species_name
              ) &&
                this.state.selectedGenus.includes(treeCommonName.genus_name)) ||
              (this.state.selectedGenus.includes(treeCommonName.genus_name) &&
                this.state.selectedNeighbourhoods.filter(
                  (selectedNeighbourhood) =>
                    treeCommonName.neighbourhood_names.includes(
                      selectedNeighbourhood
                    )
                ).length) ||
              (this.state.selectedNeighbourhoods.filter(
                (selectedNeighbourhood) =>
                  treeCommonName.neighbourhood_names.includes(
                    selectedNeighbourhood
                  )
              ).length &&
                this.state.selectedSpecies.includes(
                  treeCommonName.species_name
                ))
            );
          }
          // If ANY ONE of the options is selected
          else if (
            this.state.selectedNeighbourhoods.length ||
            this.state.selectedGenus.length ||
            this.state.selectedSpecies.length
          ) {
            // console.log("ANY ONE!");

            return (
              this.state.selectedSpecies.includes(
                treeCommonName.species_name
              ) ||
              this.state.selectedGenus.includes(treeCommonName.genus_name) ||
              this.state.selectedNeighbourhoods.filter(
                (selectedNeighbourhood) =>
                  treeCommonName.neighbourhood_names.includes(
                    selectedNeighbourhood
                  )
              ).length
            );
          }
        }
      );

      console.log(treeFilteredCommonNames);

      if (treeFilteredCommonNames.length) {
        let numberOfPages = Math.ceil(
          this.state.treeFilteredCommonNames.length / this.state.limitPerPage
        );

        this.setState({
          ...this.state,
          treeFilteredCommonNames: treeFilteredCommonNames,
          numberOfPages,
        });
      } else
        this.setState({
          ...this.state,
          treeFilteredCommonNames: this.state.treeCommonNames,
        });
    }
  }

  // Handle Change for ADVANCED VIEW
  // 1 - NEIGHBOURHOOD Selection
  handleNeighbourhoodChange = (selectedOptions) => {
    // Update the state with SelectedOptions(s)

    if (selectedOptions)
      this.setState({
        ...this.state,
        selectedNeighbourhoods: selectedOptions.map(
          (selectedOption) => selectedOption.value
        ),
      });
    else
      this.setState({
        ...this.state,
        selectedNeighbourhoods: [],
      });
  };

  // 2 - SPECIES Selection
  handleSpeciesChange = (selectedOptions) => {
    // Update the state with SelectedOptions(s)
    if (selectedOptions)
      this.setState({
        ...this.state,
        selectedSpecies: selectedOptions.map(
          (selectedOption) => selectedOption.value
        ),
      });
    else
      this.setState({
        ...this.state,
        selectedSpecies: [],
      });
  };

  // 2 - GENUS Selection
  handleGenusChange = (selectedOptions) => {
    // Update the state with SelectedOptions(s)
    if (selectedOptions)
      this.setState({
        ...this.state,
        selectedGenus: selectedOptions.map(
          (selectedOption) => selectedOption.value
        ),
      });
    else
      this.setState({
        ...this.state,
        selectedGenus: [],
      });
  };

  // Handle Change for Grid View Search
  handleBasicSearch = (selectedOptions) => {
    this.setState({
      ...this.state,
      selectedBasicSearchOptions: selectedOptions,
    });

    let treeFilteredCommonNames = this.state.treeCommonNames;

    // Mutually matching Options and Trees
    if (selectedOptions) {
      // Array of selected options as Strings
      let selectedOptionsStringArray = selectedOptions.map(
        (selectedBasicSearchOption) => selectedBasicSearchOption.value
      );

      // Filter Grid..
      treeFilteredCommonNames = treeFilteredCommonNames.filter(
        (treeFilteredCommonName) => {
          // Nina Scholz: https://stackoverflow.com/questions/44134212/best-way-to-flatten-js-object-keys-and-values-to-a-single-depth-array
          let treeValues = Object.keys(treeFilteredCommonName).reduce(
            (r, k) => r.concat(treeFilteredCommonName[k]),
            []
          );

          // --
          // Return true if ANY common tree (key:)VALUE matches
          let matchedArray = selectedOptionsStringArray.filter(
            (selectedOption) => treeValues.includes(selectedOption)
          );

          // If it includes any of the values
          return matchedArray.length;
        }
      );

      // Set the Filtered Array in State to the one we just filtered..
      this.setState({
        ...this.state,
        treeFilteredCommonNames: treeFilteredCommonNames,
      });
    }

    // Else set it back to the common names Array
    else if (selectedOptions == null)
      this.setState({
        ...this.state,
        treeFilteredCommonNames: this.state.treeCommonNames,
      });
  };

  // Get Data from API
  getDatafromTreeSpreeAPI() {
    Axios.get("https://treespree.wmdd.ca/api/trees/names")
      .then((responseJson) => {
        let commonNameOptions = responseJson.data.map((treeCommonName) => {
          return {
            label: treeCommonName.common_name,
            value: treeCommonName.common_name,
          };
        });

        this.setState({
          ...this.state,
          commonNameOptions: commonNameOptions,
          treeCommonNames: responseJson.data,
          treeFilteredCommonNames: responseJson.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Update Grid View on page change
  updateGridView(event) {
    // Page Number: 4; Items: 60; 4*12
    // console.log(event.selected);
    let newGridStarterIndex = event.selected * this.state.limitPerPage;
    this.setState({
      ...this.state,
      gridStarterIndex: newGridStarterIndex,
    });
  }

  // Pagination
  paginateGridView = () => {
    let numberOfPages = Math.ceil(
      this.state.treeFilteredCommonNames.length / this.state.limitPerPage
    );

    let pagination = (
      <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={numberOfPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={this.updateGridView.bind(this)}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    );
    return pagination;
  };

  render() {
    return (
      <>
        <div className="GridSearch">
          {/* Search Box for Grid View */}

          <Select
            className="selector selectorCommonName"
            isMulti
            onChange={this.handleBasicSearch.bind(this)}
            options={[
              {
                label: "Trees",
                options: this.state.commonNameOptions,
              },
              {
                label: "Tree Neighbourhoods",
                options: this.state.neighbourhoods,
              },
              {
                label: "Tree Genus",
                options: this.state.genus,
              },
              {
                label: "Tree Species",
                options: this.state.species,
              },
            ]}
            components={makeAnimated()}
            placeholder="Search and explore trees"
          />

          {/* Advanced Filters */}

          <Accordion className="GridViewV2-accordion">
            <Card>
              <Accordion.Toggle
                as={Card.Header}
                eventKey="0"
                className="GridSearchAdvancedHeader"
              >
                Advanced Filters
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <div className="GridViewV2-advancedFilters">
                    <h3>Select one or more</h3>
                    <Select
                      value={this.state.selectedNeighbourhoods.map(
                        (neighbourhood) => ({
                          value: neighbourhood,
                          label: neighbourhood,
                        })
                      )}
                      className="selector"
                      isMulti
                      onChange={this.handleNeighbourhoodChange.bind(this)}
                      options={this.state.neighbourhoods}
                      components={makeAnimated()}
                      placeholder="Select Neighbourhood(s).."
                    />
                    <Select
                      value={this.state.selectedSpecies.map((species) => ({
                        value: species,
                        label: species,
                      }))}
                      className="selector"
                      isMulti
                      onChange={this.handleSpeciesChange.bind(this)}
                      options={this.state.species}
                      components={makeAnimated()}
                      placeholder="Select Species.."
                    />
                    <Select
                      value={this.state.selectedGenus.map((genus) => ({
                        value: genus,
                        label: genus,
                      }))}
                      className="selector"
                      isMulti
                      onChange={this.handleGenusChange.bind(this)}
                      options={this.state.genus}
                      components={makeAnimated()}
                      placeholder="Select Genus.."
                    />

                    <Button
                      size="lg"
                      style={{ backgroundColor: "#90c33e", color: "#fff" }}
                      variant=""
                    >
                      APPLY
                    </Button>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
        {/* The Grid View itself */}
        <div className="GridViewV2">
          {this.state.treeFilteredCommonNames ? (
            this.state.treeFilteredCommonNames
              .slice(
                this.state.gridStarterIndex,
                this.state.gridStarterIndex + this.state.limitPerPage
              )
              .map((treeCommonName, index) => {
                return (
                  <GridItemV2
                    key={index}
                    imageLink={`/png/leaves/${treeCommonName.absolute_common_name.toLowerCase()}.png`}
                    title={treeCommonName.common_name}
                    linkToPopUp={
                      "/tree/name/" + treeCommonName.common_name.toLowerCase()
                    }
                    windowSize={this.state.windowSize}
                  />
                );
              })
          ) : (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
        </div>

        {/* Pagination for the Grid View */}
        <div>
          <div>{this.paginateGridView()}</div>
        </div>
      </>
    );
  }
}

export default GridViewV2;
