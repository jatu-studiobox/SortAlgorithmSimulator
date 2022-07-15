(() => {
    const btnRunSort = document.querySelector("#btnRunSort");
    const btnReset = document.querySelector("#btnReset");
    const inputSort = document.querySelector("#inputSort");
    const output = document.querySelector("#output");
    const toastLiveExample = document.getElementById('liveToast')

    let gArray = [];

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    function createArray(size) {
        gArray = [];
        for (let i = 0; i < size; i++) {
            gArray.push(Math.floor(Math.random() * 100));
        }
    }

    function setDisplayInput(arr) {
        let allItems = "";
        arr.forEach(item => {
            allItems += `<div class="card text-bg-secondary" style="width: 4rem;"><div class="card-body text-center">${item}</div></div>`;
        });
        inputSort.innerHTML = `<div class="hstack gap-3">${allItems}</div>`;
    }

    function setBeginOutput() {
        output.innerHTML = '<label class="form-label h3">....</label>';
    }

    function clearOutput() {
        output.innerHTML = '';
    }

    function displayOutput(elements) {
        output.innerHTML += elements;
        window.scrollTo(0, document.body.scrollHeight);
    }

    function setDisabledButtons(value) {
        if (value) {
            btnRunSort.setAttribute('disabled', '');
            btnRunSort.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sorting...';
            btnReset.setAttribute('disabled', '');
        } else {
            btnRunSort.removeAttribute('disabled');
            btnRunSort.innerHTML = '<i class="fa-solid fa-play"></i> Sort';
            btnReset.removeAttribute('disabled');
        }
    }

    function presentInsertionSortOutput(currentIndex, newIndex, arrTemp, arrResult) {
        let allProcessItems = "";
        let allResultItems = "";
        // generate process
        arrTemp.forEach((item, index) => {
            if (index === currentIndex) {
                allProcessItems += `<div class="card text-bg-danger" style="width: 4rem;"><div class="card-body text-center">${item}</div></div>`;
            } else {
                allProcessItems += `<div class="card text-bg-secondary" style="width: 4rem;"><div class="card-body text-center">${item}</div></div>`;
            }
        });
        // generate result
        arrResult.forEach((item, index) => {
            if (index === newIndex) {
                allResultItems += `<div class="card text-bg-primary" style="width: 4rem;"><div class="card-body text-center">${item}</div></div>`;
            } else {
                allResultItems += `<div class="card text-bg-secondary" style="width: 4rem;"><div class="card-body text-center">${item}</div></div>`;
            }
        });
        return `<div class="card card-body bg-light mb-3"><div><label class="form-label h4">Round ${currentIndex}</label></div><div><label class="form-label h5">Process</label></div><div class="hstack gap-3 my-2">${allProcessItems}</div><div><label class="form-label h5">Result</label></div><div class="hstack gap-3 my-2">${allResultItems}</div></div>`;
    }

    function presentBubbleSortStepOutput(currentIndex, currentStep, arrTemp, arrResult, bSwap) {
        // find element 'round'
        const bubbleRound = document.querySelector("#bubbleRound" + (currentIndex + 1));
        console.log(bubbleRound.id);

        let allProcessItems = "";
        let allResultItems = "";
        // generate process
        arrTemp.forEach((item, index) => {
            if (index === currentStep) {
                allProcessItems += `<div class="card text-bg-danger" style="width: 4rem;"><div class="card-body text-center">${item}</div></div>`;
            } else if (index === currentStep + 1) {
                allProcessItems += `<div class="card text-bg-primary" style="width: 4rem;"><div class="card-body text-center">${item}</div></div>`;
            } else {
                allProcessItems += `<div class="card text-bg-secondary" style="width: 4rem;"><div class="card-body text-center">${item}</div></div>`;
            }
        });
        // generate result
        arrResult.forEach((item, index) => {
            // check swap for display result
            let stypeItem1 = 'text-bg-danger';
            let stypeItem2 = 'text-bg-primary';
            if (bSwap) {
                stypeItem1 = 'text-bg-primary';
                stypeItem2 = 'text-bg-danger';
            }
            // concat element
            if (index === currentStep) {
                allResultItems += `<div class="card ${stypeItem1}" style="width: 4rem;"><div class="card-body text-center">${item}</div></div>`;
            } else if (index === currentStep + 1) {
                allResultItems += `<div class="card ${stypeItem2}" style="width: 4rem;"><div class="card-body text-center">${item}</div></div>`;
            } else {
                allResultItems += `<div class="card text-bg-secondary" style="width: 4rem;"><div class="card-body text-center">${item}</div></div>`;
            }
        });
        // Display to output
        bubbleRound.innerHTML += `<div class="card card-body bg-light mb-3"><div><label class="form-label h4">step ${currentStep + 1}</label></div><div><label class="form-label h5">Process</label></div><div class="hstack gap-3 my-2">${allProcessItems}</div><div><label class="form-label h5">Result</label></div><div class="hstack gap-3 my-2">${allResultItems}</div></div>`;
        window.scrollTo(0, document.body.scrollHeight);
    }

    function presentBubbleSortRoundOutput(currentIndex) {
        console.log("currentIndex: ", currentIndex);
        return `<div class="card card-body bg-light mb-3" id="bubbleRound${currentIndex + 1}"><div><label class="form-label h4">Round ${currentIndex + 1}</label></div></div>`;
    }

    function presentSelectionSortOutput(currentIndex, smallestIndex, arrTemp, arrResult) {
        let allProcessItems = "";
        let allResultItems = "";
        // generate process
        arrTemp.forEach((item, index) => {
            if (index === currentIndex) {
                allProcessItems += `<div class="card text-bg-danger" style="width: 4rem;"><div class="card-body text-center">${item}</div></div>`;
            } else if (index === smallestIndex && currentIndex !== smallestIndex) {
                allProcessItems += `<div class="card text-bg-primary" style="width: 4rem;"><div class="card-body text-center">${item}</div></div>`;
            } else {
                allProcessItems += `<div class="card text-bg-secondary" style="width: 4rem;"><div class="card-body text-center">${item}</div></div>`;
            }
        });
        // generate result
        arrResult.forEach((item, index) => {
            if (index === smallestIndex) {
                allResultItems += `<div class="card text-bg-danger" style="width: 4rem;"><div class="card-body text-center">${item}</div></div>`;
            } else if (index === currentIndex && currentIndex !== smallestIndex) {
                allResultItems += `<div class="card text-bg-primary" style="width: 4rem;"><div class="card-body text-center">${item}</div></div>`;
            } else {
                allResultItems += `<div class="card text-bg-secondary" style="width: 4rem;"><div class="card-body text-center">${item}</div></div>`;
            }
        });
        return `<div class="card card-body bg-light mb-3"><div><label class="form-label h4">Round ${currentIndex + 1}</label></div><div><label class="form-label h5">Process</label></div><div class="hstack gap-3 my-2">${allProcessItems}</div><div><label class="form-label h5">Result</label></div><div class="hstack gap-3 my-2">${allResultItems}</div></div>`;
    }

    function presentQuickSort(arrTemp, arrResult, start, end, pivotIndex, round) {
        let allProcessItems = "";
        let allResultItems = "";
        console.log("=== Start : ", start);
        // generate process
        arrTemp.forEach((item, index) => {
            if (index === end) {
                allProcessItems += `<div class="card text-bg-danger" style="width: 4rem;"><div class="card-body text-center">${item}</div></div>`;
            } else if (index >= start && index <= (end - 1)) {
                allProcessItems += `<div class="card text-bg-info" style="width: 4rem;"><div class="card-body text-center">${item}</div></div>`;
            } else {
                allProcessItems += `<div class="card text-bg-secondary" style="width: 4rem;"><div class="card-body text-center">${item}</div></div>`;
            }
        });
        // generate result
        arrResult.forEach((item, index) => {
            if (index === pivotIndex) {
                allResultItems += `<div class="card text-bg-primary" style="width: 4rem;"><div class="card-body text-center">${item}</div></div>`;
            } else if (index >= start && index <= (end - 1)) {
                allResultItems += `<div class="card text-bg-info" style="width: 4rem;"><div class="card-body text-center">${item}</div></div>`;
            } else {
                allResultItems += `<div class="card text-bg-secondary" style="width: 4rem;"><div class="card-body text-center">${item}</div></div>`;
            }
        });
        return `<div class="card card-body bg-light mb-3"><div><label class="form-label h4">Round ${round}</label></div><div><label class="form-label h5">Process</label></div><div class="hstack gap-3 my-2">${allProcessItems}</div><div><label class="form-label h5">Result</label></div><div class="hstack gap-3 my-2">${allResultItems}</div></div>`;
    }

    async function bubbleSort() {
        let tempGArray = [];
        for (let i = 0; i < gArray.length - 1; i++) {
            console.log("Round: ", i + 1);
            // set display output round no.
            displayOutput(presentBubbleSortRoundOutput(i));

            for (let j = 0; j < gArray.length - i - 1; j++) {
                // Clone array before operation
                tempGArray = [...gArray];
                // swap flag for 
                let bSwap = false;

                console.log(`Compare ${gArray[j]} and ${gArray[j + 1]}`);
                if (gArray[j] > gArray[j + 1]) {
                    [gArray[j + 1], gArray[j]] = [gArray[j], gArray[j + 1]];
                    // let temp = gArray[j + 1];
                    // gArray[j + 1] = gArray[j];
                    // gArray[j] = temp;
                    bSwap = true;
                }

                presentBubbleSortStepOutput(i, j, tempGArray, gArray, bSwap);
                console.log("result: ", gArray);
                await delay(1000);
            }
            await delay(1000);
        }
    }

    async function selectionSort() {
        let tempGArray = [];
        for (let i = 0; i < gArray.length - 1; i++) {
            // Clone array before operation
            tempGArray = [...gArray];

            console.log("Round: ", i + 1);

            // Gathering checked index and value
            let checkedIndex = i;
            let checkedValue = gArray[i];

            for (let j = i + 1; j < gArray.length; j++) {
                // check for new smallest value
                if (gArray[j] < checkedValue) {
                    checkedValue = gArray[j];
                    checkedIndex = j;
                }
            }
            // if it has new smallest value, then swap value
            if (checkedIndex !== i) {
                [gArray[i], gArray[checkedIndex]] = [gArray[checkedIndex], gArray[i]];
                // let temp = gArray[i];
                // gArray[i] = gArray[checkedIndex];
                // gArray[checkedIndex] = temp;
            }

            // Show display on page
            displayOutput(presentSelectionSortOutput(i, checkedIndex, tempGArray, gArray));

            console.log("Smallest value: ", checkedValue);
            console.log("result: ", gArray);
            await delay(1000);
        }
    }

    async function insertionSort() {
        let tempGArray = [];
        for (let i = 1; i < gArray.length; i++) {
            // Clone array before operation
            tempGArray = [...gArray];
            // Gathering current value
            let currentValue = gArray[i];
            // declaration index 'j' for sorted arrary group
            let j = i - 1;
            while (j >= 0 && currentValue < gArray[j]) {
                gArray[j + 1] = gArray[j];
                j--;
            }
            gArray[j + 1] = currentValue;
            displayOutput(presentInsertionSortOutput(i, j + 1, tempGArray, gArray));
            console.log("result: ", gArray);
            await delay(1000);
        }
    }

    function partition(arr, start, end) {
        console.log("----> Start Partition");
        console.log("arr: ", arr);
        console.log("start: ", start);
        console.log("end: ", end);

        // Taking the last element as the pivot
        const pivotValue = arr[end];
        let pivotIndex = start;
        console.log("pivotValue: ", pivotValue);
        console.log("pivotIndex: ", pivotIndex);

        for (let i = start; i < end; i++) {
            console.log("arr[i]: ", arr[i]);
            console.log("pivotValue: ", pivotValue);
            if (arr[i] < pivotValue) {
                console.log("Before swap: ", arr);
                // Swapping elements
                [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
                console.log("After swap: ", arr);
                // Moving to next element
                pivotIndex++;
            }
        }
        console.log("pivotIndex: ", pivotIndex);

        // Putting the pivot value in the middle
        [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
        console.log("----> End Partition");
        return pivotIndex;
    };

    async function quickSort() {
        let round = 1;
        let tempGArray = [];
        // Creating an array that we'll use as a stack, using the push() and pop() functions
        let stack = [];

        // Adding the entire initial array as an "unsorted subarray"
        stack.push(0);
        stack.push(gArray.length - 1);

        console.log("stack: ", stack);

        // There isn't an explicit peek() function
        // The loop repeats as long as we have unsorted subarrays
        while (stack[stack.length - 1] >= 0) {

            // Extracting the top unsorted subarray
            end = stack.pop();
            start = stack.pop();

            tempGArray = [...gArray];

            pivotIndex = partition(gArray, start, end);

            // If there are unsorted elements to the "left" of the pivot,
            // we add that subarray to the stack so we can sort it later
            if (pivotIndex - 1 > start) {
                console.log("do left");
                stack.push(start);
                stack.push(pivotIndex - 1);
            }

            // If there are unsorted elements to the "right" of the pivot,
            // we add that subarray to the stack so we can sort it later
            if (pivotIndex + 1 < end) {
                console.log("do right");
                stack.push(pivotIndex + 1);
                stack.push(end);
            }

            displayOutput(presentQuickSort(tempGArray, gArray, start, end, pivotIndex, round));
            round++;
            console.log("result: ", gArray);
            await delay(1000);
        }
    }

    async function sort() {
        const choiceSort = document.querySelector('input[name="choiceSort"]:checked').value;
        switch (choiceSort) {
            case "bubble":
                console.log("-> Bubble Sort");
                await bubbleSort();
                break;
            case "selection":
                console.log("-> Selection Sort");
                await selectionSort();
                break;
            case "insertion":
                console.log("-> Insertion Sort");
                await insertionSort();
                break;
            case "quick":
                console.log("-> Quick Sort");
                await quickSort();
                break;
        }
    }

    async function runSort() {
        clearOutput();
        setDisabledButtons(true);
        await sort();
        const toast = new bootstrap.Toast(toastLiveExample);
        toast.show();
        setDisabledButtons(false);
    }

    function reset() {
        createArray(10);
        console.log("start array: ", gArray);
        setDisplayInput(gArray);
        setBeginOutput();
    }

    function run() {
        reset();
        btnRunSort.addEventListener("click", runSort);
        btnReset.addEventListener("click", reset);
    }

    run();
})();