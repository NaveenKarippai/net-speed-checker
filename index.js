#!/usr/bin/env node

//Import modules

var speedChecker = require('speedtest-net');
var progressBar = require('progress');
var chalkColor = require("chalk");

var testRun = speedChecker({maxTime:5000});

var bar, pingTime;

// Fired before download or upload is started on a server
// The server object is passed

testRun.on('testserver',function(server) {
    pingTime = server.bestPing;
});

// Fired when data is downloaded
// The progress in percent is passed

testRun.on('downloadprogress',function(progress){

	if(process.argv[2] == 'download' || process.argv[2] == '-d'){
    	progressIndicate('Download Speed ',progress);
    }
    else if(process.argv[2] == 'upload' || process.argv[2] == '-u'){
    	//
    }
    else if(process.argv[2] == '-ip'){
    	//
    }
    else{
    	progressIndicate('Download Speed ',progress);
    }

});

// Fired when data is uploaded
// The progress in percent is passed

testRun.on('uploadprogress',function(progress){

	if(process.argv[2] == 'download' || process.argv[2] == '-d'){
    	//
    }
    else if(process.argv[2] == 'upload' || process.argv[2] == '-u'){
    	progressIndicate('Upload Speed ',progress);
    }
    else if(process.argv[2] == '-ip'){
    	//
    }
    else{
    	progressIndicate('Upload Speed ',progress);
    }

});

// Fired when tests are done with all relevant information

testRun.on('data',function(data){


	if(process.argv[2] == 'download' || process.argv[2] == '-d'){

    	console.log(chalkColor.blue("Download speed : ") + data.speeds.download + chalkColor.dim(" Mbps"));

    }
    else if(process.argv[2] == 'upload' || process.argv[2] == '-u'){

    	console.log(chalkColor.blue("Upload speed : ") + data.speeds.upload + chalkColor.dim(" Mbps"));

    }
    else if(process.argv[2] == '-ip'){

    	console.log(chalkColor.yellow("IP address : ") + data.client.ip);

    }
    else{

    	console.log(chalkColor.cyan.underline("Summary"));

    	console.log(chalkColor.blue("Download speed : ") + data.speeds.download + chalkColor.dim(" Mbps"));
    	console.log(chalkColor.blue("Upload speed : ") + data.speeds.upload + chalkColor.dim(" Mbps"));
    	console.log(chalkColor.green("Ping time : "),Math.abs(pingTime),chalkColor.dim('ms'));

	    console.log(chalkColor.yellow("IP address : ") + data.client.ip);
	    console.log(chalkColor.yellow("ISP : ") + data.client.isp);
    }

    
	

    
    

});

// Error handling

testRun.on('error',function(error){
	// console.error(err);
 	console.log("No internet connection");
});


//update progress bar

function progressIndicate(task,progress){
    // if its completed, terminate current progress
    if (progress>=100){
        if (bar) bar.terminate();
        bar=null;
        return;
    }
    // if bar object is not created
    if (!bar) {
        var green = '\u001b[42m \u001b[0m',
            red = '\u001b[41m \u001b[0m';
        bar = new progressBar(' '+task+' [:bar] :percent', {
            complete: green,
            incomplete: red,
            clear: true,
            width:50,
            total: 100
        });
    }
    // else update the bar with coming value
    bar.update(progress/100);
}