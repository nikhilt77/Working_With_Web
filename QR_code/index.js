// Purpose: To create a QR code image and save it in the current directory
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
inquirer
    .prompt([{
        message: "Enter the URL",
        name: "URL"
    },
    ])
    .then((answers)=>{
        const url=answers.URL;
        var qr_svg = qr.image(url);
        qr_svg.pipe(fs.createWriteStream('qr_image.png'));
        fs.writeFile("message.txt",url,(err)=>{
            if(err) throw err;
            console.log("The file has been saved");
        });
    })
    .catch((error)=>{
        if(error.isTtyError){
            console.log("Prompt couldn't be rendered in the current environment");
        }
        else{
            console.log("Something went wrong");
        }
    });
