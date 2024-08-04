const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to read and display the content of the file
function readFile() {
    fs.readFile('./message.txt', 'utf-8', (err, data) => {
        if (err) throw err;
        console.log('Current file content:');
        console.log(data);
    });
}

// Ask the user for input
rl.question('Enter the data to append: ', (input) => {
    // Append the user input to the file
    fs.appendFile('./message.txt', `\n${input}`, (err) => {
        if (err) throw err;
        console.log('Data appended successfully.');

        // Read and display the updated file content
        readFile();

        // Close the readline interface
        rl.close();
    });
});
fs.readFile('./message.txt','utf-8',(err,data)=>{
    if(err) throw err;
    console.log(data);
});//utf-8 is the encoding type
