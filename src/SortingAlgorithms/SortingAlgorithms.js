//#region General Helpers

function isSorted (array) {
  for (let i = 0; i < array.length-1; i++) {
    if (array[i] > array[i+1]){
      return false;
    }
  }
  return true;
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

//#endregion

//#region Selection Sort

export function getSelectionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1 || isSorted(array)) return array;

  for (let i = 0; i < array.length; i++) {
    var minValue = Number.MAX_SAFE_INTEGER;
    var minIndex = i;
    for (let j = i; j < array.length; j++) {
      animations.push([i, j]);
      animations.push([i, array[i]]);
      animations.push([i, array[i]]);
      animations.push([i, j]);
      if (array[j] < minValue) {
        minValue = array[j];
        minIndex = j;
      }
    }
      var temp = array[i];
      array[i] = minValue;
      array[minIndex] = temp;
      animations.push([i, minIndex]);
      animations.push([i, minValue]);
      animations.push([minIndex, temp]);
      animations.push([i, minIndex]);
  }

  return animations;
}

//#endregion

//#region Bubble Sort

export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1 || isSorted(array)) return array;

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j+1]) {
        var temp = array[j];
        array[j] = array[j+1];
        array[j+1] = temp;
      }
      animations.push([j, j+1])
      animations.push([j, array[j]]);
      animations.push([j+1, array[j+1]]);
      animations.push([j, j+1])
    }
  }

  return animations;
}

//#endregion

//#region InsertionSort 

export function getInsertionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1 || isSorted(array)) return array;

  let i, key, j; 
  let n = array.length;
    for (i = 1; i < n; i++) { 
        key = array[i]; 
        j = i - 1; 
   
        /* Move elements of arr[0..i-1], that are 
        greater than key, to one position ahead 
        of their current position */
        while (j >= 0 && array[j] > key) { 
          animations.push([j, j+1]);
          animations.push([j+1, array[j]]);
          animations.push([j, j+1]);
          array[j + 1] = array[j]; 
            j = j - 1; 
        } 
        animations.push([j+1, i]);
        animations.push([j+1, key]);
        animations.push([j+1, i]);
        array[j + 1] = key; 
    }
    
return animations;
}

//#endregion

//#region Merge Sort

export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1 || isSorted(array)) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}
  
function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

//#endregion

//#region Quick Sort

export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1 || isSorted(array)) return array;

  quickSortHelper(array, 0, array.length - 1, animations);

  return animations;
}

function quickSortHelper(array, low, high, animations) {
  if (low < high) {
    var pi = quickSortPartition(array, low, high, animations);

    quickSortHelper(array, low, pi - 1, animations);
    quickSortHelper(array, pi + 1, high, animations);
  }
}

function quickSortPartition(array, low, high, animations) {
  var pivot = array[high];
  
  var i = (low - 1);
  for (let j = low; j <= high - 1; j++) {
    if (array[j] < pivot) {
      i++

      animations.push([i, j]);
      animations.push([i, array[j]]);
      animations.push([j, array[i]]);
      animations.push([i, j]);

      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  animations.push([i+1, high]);
  animations.push([i+1, array[high]]);
  animations.push([high, array[i+1]]);
  animations.push([i+1, high]);

  var temp2 = array[i + 1];
  array[i + 1] = array[high];
  array[high] = temp2;
  return i + 1;
}

//#endregion

//#region Heap Sort

export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1 || isSorted(array)) return array;

  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
    heapSortHelper(array, array.length, i, animations);
  }

  for (let i = array.length - 1; i > 0; i--) {
    animations.push([0, i]);
    animations.push([0, array[i]]);
    animations.push([i, array[0]]);
    animations.push([0, i]);
    var temp = array[0];
    array[0] = array[i];
    array[i] = temp;

    heapSortHelper(array, i, 0, animations);
  }

  return animations;
}

function heapSortHelper(array, n, i, animations) {
  var maxIndex = i;
  var leftChildIndex = 2 * i + 1;
  var rightChildIndex = 2 * i + 2;

  animations.push([maxIndex, leftChildIndex]);
  animations.push([maxIndex, array[maxIndex]]);
  animations.push([maxIndex, array[maxIndex]]);
  animations.push([maxIndex, leftChildIndex]);
  if (leftChildIndex < n && array[leftChildIndex] > array[maxIndex]) {
    maxIndex = leftChildIndex;
  }

  animations.push([maxIndex, rightChildIndex]);
  animations.push([maxIndex, array[maxIndex]]);
  animations.push([maxIndex, array[maxIndex]]);
  animations.push([maxIndex, rightChildIndex]);
  if (rightChildIndex < n && array[rightChildIndex] > array[maxIndex]) {
    maxIndex = rightChildIndex;
  }

  if (maxIndex !== i) {
    animations.push([i, maxIndex]);
    animations.push([i, array[maxIndex]]);
    animations.push([maxIndex, array[i]]);
    animations.push([i, maxIndex]);
    var temp = array[i];
    array[i] = array[maxIndex];
    array[maxIndex] = temp;

    heapSortHelper(array, n, maxIndex);
  }
}

//#endregion

//#region Bogo Sort

export function getBogoSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  var i = 0
    while (isSorted(array) === false) {
      animations.push(...shuffle(array));
      i++
      if (i > 30000) {
        console.log("This is a terrrible sorting algorithm! Please dont ever use it!");
        return animations;
      }
    }
    console.log("Algorithm is Finished");
    return animations;
  }

//#endregion


//#region Radix Sort

export function getMaximum(arr, arrLen) {
  let maximum = arr[0];
  for (let i = 1; i < arrLen; i++){
    if (arr[i] > maximum)
      maximum = arr[i];
  }
  return maximum;
}

function radixSort(arr, arrLen) {
  let max = getMaximum(arr, arrLen);
  let numDigits = max.toString().length();

  let output = [];

  for (let i = 0; i < numDigits; i++){
    output[i] = [];
    for (let j = 0; j < arrLen; j++){
      let numString = arrLen.toString();
      output[i] += parseInt(numString.charAt(i), 10);
    }
  }

  for(let i = 0; i < output.length; i++){
    let currentArray = array[i];
    let currentArrayCopy = array[i]
    currentArray = AgetMergeSortAnimations(currentArray);

    for(let k = 0; k < currentArrayCopy; k++){
      for (let l = 0; l < currentArray; l++){
        currentArray[l] = currentArrayCopy[k];

        for (i = 0; i < output.length; i++){
          currentArray[l] = currentArrayCopy[k];
        }
      }
    }
    
  }
}



//#endregion