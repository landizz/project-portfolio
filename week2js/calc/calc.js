/*

Change dots to commas (.=,)
Order of operations 
    parenthesis
    multiplication and divison
    Addition and subtraction

Regex to extract operations and the numbers associated with the operation
Ex. 1+2*3(5+3)
Raise error with anything beside allowed characters.
Create a list, each number and operator with each their own element as input.
Identify operators by priority and their associated numbers
Identify their position in the list
Calculate the sum from highest priority and down.
Make sure that numbers next to parenthesis have a implied multiplication.

Make sure subtraction is handled correctly.

Can let regex stand for input validation only.

Then by for loop or if statements, find operators, note their position in list.
and depending on the operator select associated numbers between operators.
Can be done the same between parenthesis.

Chatgpt suggested that I use stacks, I separate the numenors and operators into two stacks
Popping operators and the respective numbers calclulate and push it back.

While popping the input, once I come across a operator.
Based on the priority I know...

I can iterate on the order of priority, and inside that loop
I can iterate over the input, popping the OOP and numbers associated.

OPP is handled left to right on the same level

1*2+4-(10/2)*2

1,2,4,10,2,2
*,+,-,(,/,),*
10,2
/
5
1,2,4,5,2
*,+,-,*

OPPfunction
list <- call pfunction - calls whatever operater inside
list <- call dfunction 10/2 return 5
list <- call mfunction 1*2 return 2, 5*2 return 10
list <- call afunction 2+4 return 6
list <- call sfunction 6-10 return -4

return sum as -4

below function will be copied for all operator types.

simplifyfunction
for each list
if (
    pop items in parenthesis
    note position
    if )
        call calculation and insert return in position
    
*/

const parser_regex = /(\d+(\.\d+|\,\d+)?)|([+\-*/])|([()])/g; //A regex expression to validate the users input
const parser_decimal = /,/g;

const inputObj = document.getElementById("userInput"); 
const sumBox = document.getElementById("totalOutput");

const additionButton = document.getElementById("additionButton");
const subtractionButton = document.getElementById("subtractionButton")
const multiplicationButton = document.getElementById("multiplicationButton");
const divisonalButton = document.getElementById("divisonalButton");
const OPButton = document.getElementById("OPButton");
const CPButton = document.getElementById("CPButton");
const equalButton = document.getElementById("equalButton");
const clearButton = document.getElementById("cButton");

const oneButton = document.getElementById("oneButton");
const twoButton = document.getElementById("twoButton");
const threeButton = document.getElementById("threeButton");
const fourButton = document.getElementById("fourButton");
const fiveButton = document.getElementById("fiveButton");
const sixButton = document.getElementById("sixButton");
const sevenButton = document.getElementById("sevenButton");
const eightButton = document.getElementById("eightButton");
const nineButton = document.getElementById("nineButton");
const zeroButton = document.getElementById("zeroButton");



oneButton.addEventListener("click", function(event) {
    event.preventDefault();
    inputObj.value += "1";
})

twoButton.addEventListener("click", function(event) {
    event.preventDefault();
    inputObj.value += "2";
    
})

threeButton.addEventListener("click", function(event) {
    event.preventDefault();
    inputObj.value += "3";
})

fourButton.addEventListener("click", function(event) {
    event.preventDefault();
    inputObj.value += "4";
})

fiveButton.addEventListener("click", function(event) {
    event.preventDefault();
    inputObj.value += "5";
})

sixButton.addEventListener("click", function(event) {
    event.preventDefault();
    inputObj.value += "6";
})

sevenButton.addEventListener("click", function(event) {
    event.preventDefault();
    inputObj.value += "7";
})

eightButton.addEventListener("click", function(event) {
    event.preventDefault();
    inputObj.value += "8";
})

nineButton.addEventListener("click", function(event) {
    event.preventDefault();
    inputObj.value += "9";
})

zeroButton.addEventListener("click", function(event) {
    event.preventDefault();
    inputObj.value += "0";
})

additionButton.addEventListener("click", function(event) {
    event.preventDefault();
    inputObj.value += "+";
})

subtractionButton.addEventListener("click", function(event) {
    event.preventDefault();
    inputObj.value += "-";
})

multiplicationButton.addEventListener("click", function(event) {
    event.preventDefault();
    inputObj.value += "*";
    
})

divisonalButton.addEventListener("click", function(event) {
    event.preventDefault();
    inputObj.value += "/";
})

OPButton.addEventListener("click", function(event) {
    event.preventDefault();
    inputObj.value += "(";

})

CPButton.addEventListener("click", function(event) {
    event.preventDefault();
    inputObj.value += ")";

})

equalButton.addEventListener("click", function(event) {
    event.preventDefault();
    parser(inputObj.value);

})

clearButton.addEventListener("click", function() {
    sumBox.value = '' //Clears the output element.
})


inputObj.addEventListener("keydown", function(event){
    if (event.key === "Enter"){
        event.preventDefault();  // By default "Enter" refreshes the page. (Because the HTML form or input type)
        console.log("Enter key pressed, and function called");
        parser(inputObj.value);//Appends the value of input element to a array object.
    }
});


/*
Above is all the DOM handling
Below is all the logic for the calculator

*/

function parser(rawInput){
    console.log("Parser function called");
    inputObj.value = ''; // Clears the users input element.
//Must use regex to split input string into a array element divided by numbers and operators.
    rawInput = rawInput.replace(parser_decimal, ".");
    stackedInput = rawInput.match(parser_regex);
    console.log(stackedInput);
    sumBox.value = mainEval(stackedInput);

};

function mainEval(evaluation){
    while (evaluation.length > 1){
        debugger;
        console.log(evaluation, evaluation.length);
        if (evaluation.includes('(') == false){
            if (evaluation.includes('*') == false && evaluation.includes('/') == false){
                console.log("Level 3 called on eval:", evaluation);
                evaluation = level3Eval(evaluation);
            }
            else {
                console.log("Level 2 called on eval:", evaluation);
                evaluation = level2Eval(evaluation);
            }
        }
        else {
            console.log("Level 1 called on eval:", evaluation);
            evaluation = level1Eval(evaluation);
        }
      //  console.log("Main evaluation returned: ", evaluation);
    }
    
    if (evaluation != null){
        return evaluation;
    }
    else {
        console.log(evaluation)
        return null;
    }
}

function level1Eval(evaluation){
    let x = 0;
    let OPPosition = 0;
    let CPPosition = 0;
    let subEval = false;
    let tempEval = [];
    console.log('Level 1 started');

    for (let i in evaluation){
        switch (evaluation[x]) {
            case '(':
                subEval = true; //Defines that we are now inside the parenthesis
                OPPosition = x;
                break;
            case ')':
       //         console.log("Parenthesis closed, sending ", tempEval, "To mainEval");
                subEval = false; //We are now closing the parenthesis and need to evaluate it.
                CPPosition = x;
                tempEval = mainEval(tempEval);
                evaluation.splice(OPPosition, CPPosition-OPPosition+1, tempEval[0]); //oppEval will calculate inside the parenthesis
                console.log(evaluation);
                x = 0;
                //call opp eval on temp and splice the return value into evaluation on position x.
                // This should ensure that if more parenthesis are to come, they will be handled correctly.
                break;
            default:
       //         console.log(i, x);
                if (subEval == true){
                    tempEval.push(evaluation[x]); //As long as we are inside the parenthesis, push to a tempEval for evaluation
                    console.log("Push: ", evaluation[x], 'into ', tempEval);
                }
           
            }
            x++;
    }

    return evaluation;
}

function level2Eval(evaluation){
    let x = 0;
    let tempEval = [];
    console.log('Level 2 started');

    for (const i in evaluation){
        switch (evaluation[x]) {
            case '*':
                tempEval = evaluation[x-1] * evaluation[x+1];
                console.log('Found: * Eval: ', evaluation[x-1], evaluation[x], evaluation[x+1])
                evaluation.splice(x-1, 3, tempEval);
    //            console.log('Result: ', tempEval);
      //          console.log('New eval: ', evaluation);
                break;
            case '/':
                tempEval = evaluation[x-1] / evaluation[x+1];
                console.log('Found: / Eval: ', evaluation[x-1], evaluation[x], evaluation[x+1])
                evaluation.splice(x-1, 3, tempEval);
   //             console.log('Result: ', tempEval);
   //             console.log('New eval: ', evaluation);
                break;
            default:
                break;
        }
        x++;
    }
    return evaluation;

}

function level3Eval(evaluation){
    let x = 0;
    let tempEval = [];
    console.log('Level 3 started');

    for (const i in evaluation){
        switch (evaluation[x]) {
            case '+':
                tempEval = +evaluation[x-1] + +evaluation[x+1];
                console.log('Found: + Eval: ', evaluation[x-1], evaluation[x], evaluation[x+1])
                evaluation.splice(x-1, 3, tempEval);
   //             console.log('Result: ', tempEval);
    //            console.log('New eval: ', evaluation);
                level3Eval(evaluation);
                break;
            case '-':
                tempEval = evaluation[x-1] - evaluation[x+1];
                console.log('Found: - Eval: ', evaluation[x-1], evaluation[x], evaluation[x+1])
                evaluation.splice(x-1, 3, tempEval);
  //              console.log('Result: ', tempEval);
  //              console.log('New eval: ', evaluation);
                level3Eval(evaluation);
                break;
        }
        x++;
    }
    return evaluation;
}





/*
function main(){
    const testCase1 = ['1', '+', '5'];
    const testCase2 = ['10.5', '*', '30', '/', '5'];
    const testCase3 = ['10', '-', '2', '+', '(', '10', '/', '2', ')', '*', '10'];
    const testCase4 = ['1', '+', '5.5', '-', '2', '+', '(', '2', '*', '10', ')', '/', '10'];
    const testCase5 = ['1', '+', '2', '+', '(', '2', '+', '3', ')', '-', '(', '5', '+', '5', ')'];


    console.log('Testcase 1: ', mainEval(testCase1));
    console.log('Testcase 2: ', mainEval(testCase2));
    console.log('Testcase 3: ', mainEval(testCase3));
    console.log('Testcase 4: ', mainEval(testCase4));
    console.log('Testcase 5: ', mainEval(testCase5));



}
main(); 



function runTests() {
    const testCases = [
        { input: ['3', '+', '5'], expected: 8 },
        { input: ['10', '-', '7'], expected: 3 },
        { input: ['4', '*', '6'], expected: 24 },
        { input: ['20', '/', '5'], expected: 4 },

        // Operator precedence
        { input: ['3', '+', '5', '*', '2'], expected: 13 },
        { input: ['10', '/', '2', '*', '4'], expected: 20 },
        { input: ['10', '+', '10', '/', '2'], expected: 15 },

        // Parentheses
        { input: ['3', '*', '(', '4', '+', '2', ')'], expected: 18 },
        { input: ['2', '*', '(', '3', '+', '(', '2', '*', '5', ')', ')'], expected: 26 },

        // Nested expressions and complex cases
        { input: ['2', '+', '3', '*', '(', '4', '/', '2', '+', '5', ')'], expected: 21 },
        { input: ['(', '1', '+', '2', ')', '*', '(', '2', '+', '3', ')'], expected: 15 },
        { input: ['10', '-', '(', '3', '+', '(', '4', '*', '2', ')', ')'], expected: 1 },
    ];

    testCases.forEach((testCase, index) => {
        const result = mainEval(testCase.input);
        console.log(`Test Case ${index + 1}: ${testCase.input.join(' ')} = ${result[0]}`);
        console.log(result[0] == testCase.expected ? 'PASSED' : `FAILED (Expected: ${testCase.expected}, Got: ${result[0]})`);
    });
}

runTests();

*/