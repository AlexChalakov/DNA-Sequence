/*
Everything written down in the minimal demo file, majority in 'data' section
  -[x] done

Read through the testlib file as the comments are the only thing that's important
  -[x] particularly to do with the testlib. functions like testlib.on

Task 1
  -[x] take the patterns and compare them with the data
  -[x] if they are the same, record the pattern match and how many times its been seen
  -[x] use the testlib.frequency table when finished to report the results to the automatic marking
  -[x] FINISH TASK 1

Task 2
  -[x] use whats done for task 1 but need to add testlib.foundMatch( pattern, offset ) 
  -[x] report a matches location where pattern it is found and 
  offset is the number of characters into the .data file the match is 
  (number of characters from the start, so TCACAACTCATT the first AA would be 4 character offset)
  -[x] FINISH TASK 2

Task 3
  -[x] started adapting the code
  -[x] improved pattern taking in ready hook to be available for bigger patterns
  -[] finish combinations function
  -[] refactor the code so that it matches the requirements
*//////////////////////////////////////////////////////////

"use strict";
const { log } = require('console');
const testlib = require('./testlib.js'); //gets library
let paternsAll = [];
let queue = [];
let offset = [];
let symbolsCount = 0;
let freqTable = {};
let nucleotides = {
  R: { 0: 'G', 1: 'A'},
  Y: { 0: 'T', 1: 'C'},
  K: { 0: 'G', 1: 'T'},
  M: { 0: 'A', 1: 'C'},
  S: { 0: 'G', 1: 'C'},
  W: { 0: 'A', 1: 'T'},
  B: { 0: 'G', 1: 'T', 2: 'C'},
  D: { 0: 'G', 1: 'A', 2: 'T'},
  H: { 0: 'A', 1: 'C', 2: 'T'},
  V: { 0: 'G', 1: 'C', 2: 'A'},
  N: { 0: 'A', 1: 'G', 2: 'C', 3: 'T'}
}

//function combinationsMatch(paternsAll, queue) {} task 3 adaption

testlib.on('ready', function (patterns) { //ready hook
  patterns.forEach(element => { //looping through the patterns
    if (paternsAll.length >= symbolsCount) { //find the biggest length
      symbolsCount = element.length; //make the biggest length our pattern
    }

    paternsAll.push(element); //put everything we looped through in the paternsAll array
    freqTable[element] = 0; //initialise the frequency table
  });

  console.log(paternsAll); //simple print to see the patterns
  testlib.runTests();
});

testlib.on('data', function (data) { //data hook
  queue.push(data); //input everything from the .data file into the queue
  offset++; //increment +1 position every time an element located
  let word = queue.join("");  //make the array queue into a string and remove elements we don't need

  if(queue.length >= symbolsCount){ //if the queue length is bigger than the max length of the pattern
    symbolsCount = [...queue]; //assign all elements of queue into the max length variable
  }

  if (queue.length > 1) { //if the queue is 2 or more elements
    paternsAll.forEach(element => {	//scan through the array of patterns
      if (word === element) { //if our string from the data matches our pattern element
        offset -= word.length; //offset = offset - pattern.length
        testlib.foundMatch(element, offset);	//match is found
        freqTable[element]++; //increment count
        offset += word.length; //stabilise the offset
      }
    });
    queue.shift(); //remove unnecessary element from the queue and get the next one, so it goes again through our loop
  }
});

testlib.on('reset', function (data) {	//reset hook
  console.log("RESET");
  testlib.frequencyTable(freqTable); //output the frequency table every time
  queue = []; //reset the variables, so that we get count for every sequence - every line
  offset = [];
  symbolsCount = 0;
  
  paternsAll.forEach(element =>{ //can't just delete them so we have to loop through the object and make all elements 0
    freqTable[element] = 0;
  })
});

testlib.on('end', function (data) {	//end hook
  console.log("END");
  testlib.frequencyTable(freqTable); //end output of frequency table
});

testlib.setup(3); // Runs test 1 (task1.data and task1.seq)