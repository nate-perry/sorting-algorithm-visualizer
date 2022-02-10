import React from 'react';
import {getBogoSortAnimations, getBubbleSortAnimations, getHeapSortAnimations, getInsertionSortAnimations, getMergeSortAnimations, getQuickSortAnimations, getSelectionSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js';
import './SortingAlgorithmVisualizer.css';

import Button from '../GeneralComponents/Button.js';

// Change this value for the speed of the animations
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array
var MAX_NUMBER_OF_ARRAY_BARS = 250;
var NUMBER_OF_ARRAY_BARS = Math.round(window.innerWidth / (2048/MAX_NUMBER_OF_ARRAY_BARS));

// Change this value for the maximum possible value in the array
var MAX_BAR_HEIGHT;

// These are the names for the dropdown (probably will be deprecated later)
var currentSortingAlgorithm = "";
var currentSortingAlgorithmText = "Please Select A Sorting Algorithm";

// This is the main color of the array bars.
const PRIMARY_COLOR = '#09ffd5';

// This is the color of array bars that are being compared throughout the animations
const SECONDARY_COLOR = '#fc3c3c';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      sortingTimeOuts: [],
      windowWidth: window.innerWidth,
    };

  }

  handleResize(e) {
    NUMBER_OF_ARRAY_BARS = Math.round(window.innerWidth / (2048/MAX_NUMBER_OF_ARRAY_BARS));

    var arrayContainer = document.getElementById("array-container");
    var buttonContainer = document.getElementById('button-container');
    if (window.innerHeight >= 1000) {
      var maxBarHeight = (730 * (window.innerHeight/1040));
      MAX_BAR_HEIGHT = maxBarHeight;

      arrayContainer.style.position = `relative`;
      arrayContainer.style.top = `0px`;
      arrayContainer.style.height = `calc(${maxBarHeight}px + 10px)`;

      buttonContainer.style.position = `relative`;
      buttonContainer.style.top = `50px`;
    } else {
      arrayContainer.style.position = `absolute`;
      arrayContainer.style.top = `120px`;

      buttonContainer.style.position = `absolute`;
      buttonContainer.style.top = `calc(120px + ${MAX_BAR_HEIGHT}px + 60px)`;
    }

    if (window.innerWidth <= 700) {
      buttonContainer.style.width = `90vw`;
    } else {
      buttonContainer.style.width = `621px`;
    }

    if (this.state.windowWidth === window.innerWidth) {
      this.forceUpdate();
    } else {
      this.resetArray();
      this.setState({windowWidth: window.innerWidth});
    }
  }

  componentDidMount() {
    var arrayContainer = document.getElementById("array-container");
    var buttonContainer = document.getElementById('button-container');
    if (window.innerHeight >= 875) {
      MAX_BAR_HEIGHT = (730 * (window.innerHeight/1040));

      arrayContainer.style.position = `relative`;
      arrayContainer.style.top = `0px`;
      arrayContainer.style.height = `calc(${MAX_BAR_HEIGHT}px)`;

      buttonContainer.style.position = `relative`;
      buttonContainer.style.top = `50px`;
    } else {
      MAX_BAR_HEIGHT = (730 * (875/1040));
      
      arrayContainer.style.position = `absolute`;
      arrayContainer.style.top = `100px`;

      buttonContainer.style.position = `absolute`;
      buttonContainer.style.top = `calc(100px + ${MAX_BAR_HEIGHT}px + 54px)`;
    }

    window.addEventListener('resize', (e) => this.handleResize(e));

    this.handleResize = this.handleResize.bind(this)

    this.resetArray();
    document.addEventListener("click", (evt) => handleDropdownClicks(evt));
  }

  componentWillUnmount() {
    document.removeEventListener("click", (evt) => handleDropdownClicks(evt));
  }


  resetArray() {
    const array = [];
    for (let i = this.state.sortingTimeOuts.length - 1; i >= 0; i--) {
      clearTimeout(this.state.sortingTimeOuts[i])
      this.state.sortingTimeOuts.pop();
    }
    
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, MAX_BAR_HEIGHT));
    }
    this.setState({array});
    
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
    }
  }

  isSorted() {
    for (let i = 0; i < this.state.array.length-1; i++) {
      if (this.state.array[i] > this.state.array[i+1]){
        return false;
      }
    }
    return true;
  }

  //#region SortingAlgorithms

  selectionSort() {
    if (this.isSorted()) {
      this.resetArray();
      setTimeout (() => {
        this.selectionSort();
      }, 1000);
    } else {
      const {array} = this.state;
      const animations = getSelectionSortAnimations(this.state.array);
      var scaleFactor = (MAX_BAR_HEIGHT / Math.max(...array));
      for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        var isColorChange = true;
        if (i % 4 !== 0 && i % 4 !== 3) {
          isColorChange = false;
        }
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
          var timeout = setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS * 0.1);
          this.state.sortingTimeOuts.push(timeout);
        } else {
          var timeout2 = setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `calc(${newHeight}px * ${scaleFactor})`;
          }, i * ANIMATION_SPEED_MS * 0.1);
          this.state.sortingTimeOuts.push(timeout2);
        }
      }
    }
  }

  bubbleSort() {
    if (this.isSorted()) {
      this.resetArray();
      setTimeout (() => {
        this.bubbleSort();
      }, 1000);
    } else {
      const {array} = this.state;
      const animations = getBubbleSortAnimations(this.state.array);
      var scaleFactor = (MAX_BAR_HEIGHT / Math.max(...array));
      for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        var isColorChange = true;
        if (i % 4 !== 0 && i % 4 !== 3) {
          isColorChange = false;
        }
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
          var timeout = setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS * 0.1);
          this.state.sortingTimeOuts.push(timeout);
        } else {
          var timeout2 = setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `calc(${newHeight}px * ${scaleFactor})`;
          }, i * ANIMATION_SPEED_MS * 0.1);
          this.state.sortingTimeOuts.push(timeout2);
        }
      }
    }
  }

  insertionSort() {
    if (this.isSorted()) {
      this.resetArray();
      setTimeout (() => {
        this.insertionSort();
      }, 1000);
    } else {
      const {array} = this.state;
      const animations = getInsertionSortAnimations(this.state.array);
      var scaleFactor = (MAX_BAR_HEIGHT / Math.max(...array));
      for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        var isColorChange = true;
        if (i % 3 !== 0 && i % 3 !== 2) {
          isColorChange = false;
        }
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
          var timeout = setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS * 0.1);
          this.state.sortingTimeOuts.push(timeout);
        } else {
          var timeout2 = setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `calc(${newHeight}px * ${scaleFactor})`;
          }, i * ANIMATION_SPEED_MS * 0.1);
          this.state.sortingTimeOuts.push(timeout2);
        }
      }
      console.log(this.isSorted(array))
    }
  }

  mergeSort() {
    if (this.isSorted()) {
      this.resetArray();
      setTimeout (() => {
        this.mergeSort();
      }, 1000);
    } else {
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
          var timeout = setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
          this.state.sortingTimeOuts.push(timeout);
        } else {
          var timeout2 = setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `calc(${newHeight}px * ${scaleFactor})`;
          }, i * ANIMATION_SPEED_MS);
          this.state.sortingTimeOuts.push(timeout2);
        }
      }
    }
  }

  bogoSort() {
    if (this.isSorted()) {
      this.resetArray();
      setTimeout (() => {
        this.bogoSort();
      }, 1000);
    } else {
      const {array} = this.state;
      const animations = getBogoSortAnimations(this.state.array)
      if (animations.length > 29000) {
        console.log("Function returns");
        return;
      } else {
        let animationDelimitingFactor = NUMBER_OF_ARRAY_BARS
        for (let i = 0; i < animations.length / animationDelimitingFactor; i++) {
          var timeout = setTimeout(() => {

            if (window.innerHeight >= 1000) {
              var maxBarHeight = (730 * (window.innerHeight/1040));
            } else {
              maxBarHeight = (730 * (1000/1040));
            }

            var scaleFactor = (maxBarHeight / Math.max(...array));
            const arrayBars = document.getElementsByClassName('array-bar');
            for (let j = 0; j < array.length; j++) {
              var newHeight = animations[(i * animationDelimitingFactor) + j];
              var barToChange = arrayBars[j];
              barToChange.style.height = `calc(${newHeight}px * ${scaleFactor})`;
            }
            this.forceUpdate();
          }, i * ANIMATION_SPEED_MS * 100);
          this.state.sortingTimeOuts.push(timeout);
        }
      }
    }
  }

  quickSort() {
    if (this.isSorted()) {
      this.resetArray();
      setTimeout (() => {
        this.quickSort();
      }, 1000);
    } else {
      const {array} = this.state;
      const animations = getQuickSortAnimations(this.state.array);
      var scaleFactor = (MAX_BAR_HEIGHT / Math.max(...array));
      for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        var isColorChange = true;
        if (i % 4 !== 0 && i % 4 !== 3) {
          isColorChange = false;
        }
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
          var timeout = setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
          this.state.sortingTimeOuts.push(timeout);
        } else {
          var timeout2 = setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `calc(${newHeight}px * ${scaleFactor})`;
          }, i * ANIMATION_SPEED_MS);
          this.state.sortingTimeOuts.push(timeout2);
        }
      }
    }
  }

  heapSort() {
    if (this.isSorted()) {
      this.resetArray();
      setTimeout (() => {
        this.heapSort();
      }, 1000);
    } else {
      const {array} = this.state;
      const animations = getHeapSortAnimations(this.state.array);
      var scaleFactor = (MAX_BAR_HEIGHT / Math.max(...array));
      for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        var isColorChange = true;
        if (i % 4 !== 0 && i % 4 !== 3) {
          isColorChange = false;
        }
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
          var timeout = setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS * 0.1);
          this.state.sortingTimeOuts.push(timeout);
        } else {
          var timeout2 = setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `calc(${newHeight}px * ${scaleFactor})`;
          }, i * ANIMATION_SPEED_MS * 0.1);
          this.state.sortingTimeOuts.push(timeout2);
        }
      }
    }
  }

  //#endregion

  // This method will only work if your sorting algorithms actually return the sorted arrays; 
  // if they return the animations then this method will be broken.
  testSortingAlgorithms() {
    var numberOfTests = 1000;
    var numberIncorrect = 0;
    for (let i = 0; i < numberOfTests; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 100);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mySortedArray = getHeapSortAnimations(array);
      if (!arraysAreEqual(javaScriptSortedArray, mySortedArray)) {
        numberIncorrect += 1;
      }
    }
    console.log("Percentage error: " + numberIncorrect * 100/numberOfTests + "%");
  }

  setCurrentSortingAlgorithm(SortingAlgorithm, SortingAlgorithmName){
    currentSortingAlgorithm = SortingAlgorithm;
    currentSortingAlgorithmText = SortingAlgorithmName;
    this.setParamsForAlgorithm();

    if (this.state.sortingTimeOuts.length === 0) {
      this.forceUpdate();
    } else {
      this.resetArray();
    }
  }

  callSortingAlgorithm() {
    var alg = this[currentSortingAlgorithm];
    if (typeof alg === 'function') { 
      const callableAlg = alg.bind(this);
      callableAlg(); 
    };
  }

  setParamsForAlgorithm() {
    if(currentSortingAlgorithm === "bogoSort") {
      MAX_NUMBER_OF_ARRAY_BARS = 5;
      NUMBER_OF_ARRAY_BARS = Math.floor(window.innerWidth / (2048/MAX_NUMBER_OF_ARRAY_BARS));
      this.resetArray();
    } /*else if(currentSortingAlgorithm === "selectionSort") {
      MAX_NUMBER_OF_ARRAY_BARS = 25;
      NUMBER_OF_ARRAY_BARS = Math.floor(window.innerWidth / (2048/MAX_NUMBER_OF_ARRAY_BARS));
      this.resetArray();
    }*/ else {
      if (MAX_NUMBER_OF_ARRAY_BARS !== 250) {
        MAX_NUMBER_OF_ARRAY_BARS = 250;
        NUMBER_OF_ARRAY_BARS = Math.floor(window.innerWidth / (2048/MAX_NUMBER_OF_ARRAY_BARS));
        this.resetArray();
      }
    }
  }

  render() {
    const {array} = this.state;
    var scaleFactor = (MAX_BAR_HEIGHT / Math.max(...array));

    return (
      <div className="page-container" >
        <div className="page-header">Sorting Algorithm Visualizer</div>
        <div id="array-container" className="array-container">
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
                  height: `${Math.round(value * scaleFactor)}px`,
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
        <div id="button-container" className='button-container'>
          <Button buttonStyle="btn--outline" onClick={() => this.resetArray()}>Generate New Array</Button>
          <Button id="button-2" buttonStyle="btn--outline">
            {currentSortingAlgorithmText}
            <div id="dropdown-1" className="dropdown-1-dropdown-item-container">
              <Button buttonStyle="btn--outline" onClick={() => this.setCurrentSortingAlgorithm("selectionSort", "Current Sorting Algorithm: Selection Sort")}>Selection Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.setCurrentSortingAlgorithm("bubbleSort", "Current Sorting Algorithm: Bubble Sort")}>Bubble Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.setCurrentSortingAlgorithm("insertionSort", "Current Sorting Algorithm: Insertion Sort")}>Insertion Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.setCurrentSortingAlgorithm("mergeSort", "Current Sorting Algorithm: Merge Sort")}>Merge Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.setCurrentSortingAlgorithm("quickSort", "Current Sorting Algorithm: Quick Sort")}>Quick Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.setCurrentSortingAlgorithm("heapSort", "Current Sorting Algorithm: Heap Sort")}>Heap Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.setCurrentSortingAlgorithm("countingSort", "Current Sorting Algorithm: Counting Sort")}>Counting Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.setCurrentSortingAlgorithm("radixSort", "Current Sorting Algorithm: Radix Sort")}>Radix Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.setCurrentSortingAlgorithm("bucketSort", "Current Sorting Algorithm: Bucket Sort")}>Bucket Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.setCurrentSortingAlgorithm("shellSort", "Current Sorting Algorithm: Shell Sort")}>Shell Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.setCurrentSortingAlgorithm("timSort", "Current Sorting Algorithm: Tim Sort")}>Tim Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.setCurrentSortingAlgorithm("combSort", "Current Sorting Algorithm: Comb Sort")}>Comb Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.setCurrentSortingAlgorithm("pigeonholeSort", "Current Sorting Algorithm: Pigeonhole Sort")}>Pigeonhole Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.setCurrentSortingAlgorithm("cycleSort", "Current Sorting Algorithm: Cycle Sort")}>Cycle Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.setCurrentSortingAlgorithm("cocktailSort", "Current Sorting Algorithm: Cocktail Sort")}>Cocktail Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.setCurrentSortingAlgorithm("strandSort", "Current Sorting Algorithm: Strand Sort")}>Strand Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.setCurrentSortingAlgorithm("bitonicSort", "Current Sorting Algorithm: bitonic Sort")}>Bitonic Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.setCurrentSortingAlgorithm("pancakeSort", "Current Sorting Algorithm: Pancake Sort")}>Pancake Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.setCurrentSortingAlgorithm("binaryInsertionSort", "Current Sorting Algorithm: Binary Insetion Sort")}>Binary Insertion Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.setCurrentSortingAlgorithm("bogoSort", "Current Sorting Algorithm: Bogo Sort")}>Bogo Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.setCurrentSortingAlgorithm("gnomeSort", "Current Sorting Algorithm: Gnome Sort")}>Gnome Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.setCurrentSortingAlgorithm("sleepSort", "Current Sorting Algorithm: Sleep Sort")}>Sleep Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.setCurrentSortingAlgorithm("stoogeSort", "Current Sorting Algorithm: Stooge Sort")}>Stooge Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.setCurrentSortingAlgorithm("3-wayMergeSort", "Current Sorting Algorithm: 3-Way Merge Sort")}>3-Way Merge Sort</Button>
              <Button buttonStyle="btn--outline" onClick={() => this.setCurrentSortingAlgorithm("3-wayQuickSort", "Current Sorting Algorithm: 3-Way Quick Sort")}>3-Way Quick Sort</Button>
            </div>
          </Button>
          <Button buttonStyle="btn--outline" onClick={() => this.callSortingAlgorithm()} >Sort</Button>
        </div>
        <div className='credit-footer' onClick={() => this.testSortingAlgorithms()}>Christian Albert <br/> Last Updated 12/28/2021</div>
      </div>
    );
  }

}

// Min and Max are included
function randomIntFromInterval(min, max) {
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

function handleDropdownClicks(evt) {
  var dropdownEls = document.getElementsByClassName("btn btn--outline btn--medium");
  var dropdownToggle = document.getElementById("dropdown-1");
  let targetEl = evt.target; // clicked element      
  if(targetEl === dropdownEls[1]) {
    // This is a click inside the dropdown
    var dropdownShow = window.getComputedStyle(dropdownToggle, null).getPropertyValue("display") === "none" ? "block" : "none";
    dropdownToggle.style.display = dropdownShow;
  } else {
    // This is a click outside.      
  dropdownToggle.style.display = "none";
  }
}

