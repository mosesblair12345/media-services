const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.DB_CONNECTION)

const welcomeSchema = new mongoose.Schema({
    consoleScreen: String,
    phoneNumber: String
});
const breakingNewsSchema = new mongoose.Schema({
    consoleScreen: String,
    phoneNumber: String
});
const airtimeSchema = new mongoose.Schema({
    consoleScreen: String,
    phoneNumber: String
});
const skizaSchema = new mongoose.Schema({
    consoleScreen: String,
    phoneNumber: String
});
const breakingNewsSubscribe= new mongoose.Schema({
    consoleScreen: String,
    phoneNumber: String
});
const breakingNewsUnsubscribe= new mongoose.Schema({
    consoleScreen: String,
    phoneNumber: String
});
const airtimeBalance = new mongoose.Schema({
   consoleScreen: String,
   phoneNumber: String
});
const airtimeTopup= new mongoose.Schema({
    consoleScreen: String,
    phoneNumber: String
});
const skizaSubscription = new mongoose.Schema({
    consoleScreen:String,
    phoneNumber: String
});

const Welcome=mongoose.model('Welcome',welcomeSchema);
const BreakingNews=mongoose.model('BreakingNews',breakingNewsSchema);
const Airtime=mongoose.model('Airtime',airtimeSchema);
const Skiza=mongoose.model('Skiza',skizaSchema);
const BreakingNewsSubscribe=mongoose.model('BreakingNewsSubscribe',breakingNewsSubscribe);
const BreakingNewsUnsubscribe=mongoose.model('BreakingNewsUnsubscribe',breakingNewsUnsubscribe);
const AirtimeBalance=mongoose.model('AirtimeBalance',airtimeBalance);
const AirtimeTopup=mongoose.model('AirtimeTopup',airtimeTopup);
const SkizaSubscription=mongoose.model('SkizaSubscription',skizaSubscription);


app.post("/ussd",(req,res)=>{
    const {
        sessionId,
        serviceCode,
        phoneNumber,
        text,
    } = req.body;
    let response = '';

    if (text == '') {
        // welcome console
        const message = new Welcome({
            consoleScreen: "welcome console",
            phoneNumber: phoneNumber,
        })
        message.save();
        
        response = `CON Welcome to media services. 
        Please select an option
        1. Breaking news Subscription
        2. Airtime Top up
        3. Skiza Subscription`;
    }
    if(text == '1') {
        // breaking news console
        const message = new BreakingNews({
            consoleScreen: "breaking news console",
            phoneNumber: phoneNumber,
        })
        message.save();

        response = `CON 
        1. Subscribe
        2. UnSubscribe`;
    }
    if(text == '2') {
        // airtime console
        const message = new Airtime({
            consoleScreen: "airtime console",
            phoneNumber: phoneNumber,
        })
        message.save();

        response = `CON 
        1.Show Balance
        2.Airtime topup`;
    }
    if(text == '3') {
        // skiza console
        const message = new Skiza({
            consoleScreen: "skiza console",
            phoneNumber: phoneNumber,
        })
        message.save();

        response = `CON 
        1.Subscribe`;
    }
    if(text == "1*1"){
        // breaking news subscribe console
        const message = new BreakingNewsSubscribe({
            consoleScreen: "breaking news subscribe console",
            phoneNumber: phoneNumber,
        })
        message.save();

        response = `END You have successfully subscribed`
    }
    if(text == "1*2"){
        // breaking news unsubscribe console
        const message = new BreakingNewsUnsubscribe({
            consoleScreen: "breaking news unsubscribe console",
            phoneNumber: phoneNumber,
        })
        message.save();

        response = `END You have successfully unsubscribed`
    }
    if(text == "2*1"){
        // airtime balance console
        const message = new AirtimeBalance({
            consoleScreen: "airtime balance console",
            phoneNumber: phoneNumber,
        })
        message.save();

        response = `END Your balance is Ksh 10`
    }
    if(text == "2*2"){
         // airtime topup console
         const message = new AirtimeTopup({
            consoleScreen: "airtime topup console",
            phoneNumber: phoneNumber,
        })
        message.save();

        response = `END You have successfully top up`
    }
    if(text == "3*1"){
        // skiza subscription console
        const message = new SkizaSubscription({
            consoleScreen: "skiza subscription console",
            phoneNumber: phoneNumber,
        })
        message.save();

        response = `END You have successfully subscribed`
    }

    res.set('Content-Type: text/plain');
    res.send(response)
})

app.listen(port,(req,res)=>{
    console.log(`Server running on port ${port}`);
})