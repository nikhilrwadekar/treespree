# TreeSpree

Vancouver Street Trees Data Visualization

## About

TreeSpree is a web application meant to inform users about street trees across Vancouver, BC. It will provide insight on which species are around the cities, how they are useful and also where to locate them around the city.<br>

Users can get extensive information fetched from a number of reliable APIs making the eventual experience cohesive, essentially a one-stop destination for tree lovers, educators, and urban planners alike. <br>

## The API

Provides extended information about the city trees in Vancouver. Thanks to Vancouver's Open Data combined with Wikipedia's Open API.

### Usage

How to get data from the TreeSpree API

#### http://treespree.wmdd.ca/api/trees

Lists all trees with relative information.

##### /api/trees/type/TREE_TYPE

Get a particular tree type with advanced filters, if needed.

###### Parameters

| query         | value                 | example                                                              |
| ------------- | --------------------- | -------------------------------------------------------------------- |
| count         | `Number` Default: 100 | http://treespree.wmdd.ca/api/trees/type/maple?count=150              |
| neighbourhood | `Text`                | http://treespree.wmdd.ca/api/trees/type/maple?neighbourhood=OAKRIDGE |

Lists all trees with relative information.

#### http://treespree.wmdd.ca/api/neighbourhoods

Lists all neighbourhoods.

## Technologies Used

### The Frontend - Powered by React & D3

### The Backend - MySQL DB served by an API powered by Express.js

<!--
## The Team -->
