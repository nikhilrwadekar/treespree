import Select from 'react-select';
import React, { Component } from "react";

const options = [
    { value: 'DOWNTOWN', label: 'DOWNTOWN' },
    { value: 'SHAUGHNESSY', label: 'SHAUGHNESSY' },
    { value: 'KITSILANO', label: 'KITSILANO' },
    { value: 'RILEY PARK', label: 'RILEY PARK' },
    { value: 'SUNSET', label: 'SUNSET' },
  ];

  class SelectOption extends Component{
    state = {
        selectedOption: null,
      }
   
      handleChange = (selectedOption) => {
        this.setState({ selectedOption
         });
        console.log(`Option selected:`, selectedOption)

        }
      render(){
        const { selectedOption } = this.state;
          return(
              <>
              <Select
                    isMulti
                    onChange={this.handleChange}
                    options={options}
                />
              </>
          );
          }

  }

  export default SelectOption;
  