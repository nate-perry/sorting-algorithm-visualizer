import React from 'react';
import {getMergeSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js';
import './SortingAlgorithmVisualizer.css';

import Button from '../GeneralComponents/Button.js';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
var NUMBER_OF_ARRAY_BARS = 250;

var MAX_BAR_HEIGHT = 730;

var currentSortingAlgorithm = "mergeSort";
var currentSortingAlgorithmName = "Select A Sorting Algorithm";

// This is the main color of the array bars.
const PRIMARY_COLOR = '#09ffd5';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = '#fc3c3c';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };

  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, MAX_BAR_HEIGHT));
    }
    this.setState({array});
  }

  mergeSort() {
    const {array} = this.state;
    const animations = getMergeSortAnimations(this.state.array);
    var scaleFactor = (MAX_BAR_HEIGHT / Math.max(...array));
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `calc(${newHeight}px * ${scaleFactor})`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    // Need to implement this method.
  }

  heapSort() {
    // Need to implement this method.
  }

  bubbleSort() {
    // Need to implement this method.
  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  setCurrentSortingAlgorithm(SortingAlgorithm, SortingAlgorithmName){
    currentSortingAlgorithm = SortingAlgorithm;
    currentSortingAlgorithmName = SortingAlgorithmName;
    console.log(currentSortingAlgorithmName);

    this.forceUpdate();
  }

  render() {
    const {array} = this.state;
    var scaleFactor = (MAX_BAR_HEIGHT / Math.max(...array));
    console.log(scaleFactor * Math.max(...array));

    return (
      <div className="page-container">
        <div className="page-header">Sorting Algorithm Visualizer</div>
        <div className="array-container">
            <div
                className="array-bar-spacer"
                key={NUMBER_OF_ARRAY_BARS+1}
                style={{
                width: `1px`,
                height: `${MAX_BAR_HEIGHT}px`,
                }}>
            </div>
            {array.map((value, idx) => (
              <div
                  className="array-bar"
                  key={idx}
                  style={{
                  backgroundColor: PRIMARY_COLOR,
                  width: `calc( (90vw - (4px * ${NUMBER_OF_ARRAY_BARS}) - 2px) / ${NUMBER_OF_ARRAY_BARS + 2})`,
                  height: `calc(${value}px * ${scaleFactor})`,
                  bottom: `0px`,
                  }}>
              </div>
            ))}
            <div
                className="array-bar-spacer"
                key={0}
                style={{
                width: `1px`,
                height: `${MAX_BAR_HEIGHT}px`,
                }}>
            </div>
        </div>
        <div className='button-container'>
          <Button buttonStyle="btn--outline" onClick={() => this.resetArray()}>Generate New Array</Button>
          <Button buttonStyle="btn--outline" onClick={() => setDropDown("dropdown-1")}>
            Current Sorting Algorithm: {currentSortingAlgorithmName}
            <div className="dropdown-1-dropdown-item-container">
              <Button buttonStyle="btn--outline" onClick={() => this.setCurrentSortingAlgorithm("mergeSort", "Merge Sort")}>Merge Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.setCurrentSortingAlgorithm("quickSort", "Quick Sort")}>Quick Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.resetArray()}>Quick Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.resetArray()}>Quick Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.resetArray()}>Quick Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.resetArray()}>Quick Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.resetArray()}>Quick Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.resetArray()}>Quick Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.resetArray()}>Quick Sort</Button>
            </div>
          </Button>
          <Button buttonStyle="btn--outline" onClick={() => this.mergeSort()}>Sort</Button>
        </div>
      </div>
    );
  }

}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}

//Dependency for DropDown Button
function setDropDown(itemName){
  var dropdownItems = document.getElementsByClassName(itemName + "-dropdown-item-container");
  for (let i = 0; i < dropdownItems.length; i++) {
    var dropdownShow = dropdownItems[i].style.display === "none" ? "block" : "none";
    dropdownItems[i].style.display  = dropdownShow;
  }
}

window.addEventListener('resize', function(event) {
    var numBars = (window.innerWidth / (2048/250))
    NUMBER_OF_ARRAY_BARS = Math.floor(numBars);
}, true);