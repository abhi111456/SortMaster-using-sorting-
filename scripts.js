document.getElementById('sortForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const arrayInput = document.getElementById('arrayInput').value;
    const algorithm = document.getElementById('algorithm').value;

    let array = arrayInput.split(',').map(Number);
    let sortedArray;
    let algorithmName;

    switch (algorithm) {
        case 'bubble':
            sortedArray = bubbleSort(array.slice());
            algorithmName = 'Bubble Sort';
            break;
        case 'selection':
            sortedArray = selectionSort(array.slice());
            algorithmName = 'Selection Sort';
            break;
        case 'insertion':
            sortedArray = insertionSort(array.slice());
            algorithmName = 'Insertion Sort';
            break;
        case 'merge':
            sortedArray = mergeSort(array.slice());
            algorithmName = 'Merge Sort';
            break;
        case 'quick':
            sortedArray = quickSort(array.slice());
            algorithmName = 'Quick Sort';
            break;
        default:
            sortedArray = array;
            algorithmName = 'Unknown Algorithm';
    }

    document.getElementById('result').innerHTML = `
        <p>Original array: ${array.join(', ')}</p>
        <p>Sorted using <span style="color: #007bff;">${algorithmName}</span>: ${sortedArray.join(', ')}</p>
    `;

    highlightSelectedAlgorithm(algorithm);
});

function highlightSelectedAlgorithm(algorithm) {
    const selectElement = document.getElementById('algorithm');
    for (let i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].value === algorithm) {
            selectElement.options[i].style.backgroundColor = '#007bff';
            selectElement.options[i].style.color = '#fff';
        } else {
            selectElement.options[i].style.backgroundColor = '#333';
            selectElement.options[i].style.color = '#fff';
        }
    }
}

// Sorting functions (same as before)


function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n-1; i++) {
        for (let j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            }
        }
    }
    return arr;
}

function selectionSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n-1; i++) {
        let minIdx = i;
        for (let j = i+1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        [arr[minIdx], arr[i]] = [arr[i], arr[minIdx]];
    }
    return arr;
}

function insertionSort(arr) {
    let n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}

function mergeSort(arr) {
    if (arr.length < 2) return arr;

    let mid = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    let result = [], leftIndex = 0, rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex++]);
        } else {
            result.push(right[rightIndex++]);
        }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        let pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            [arr[++i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}
    