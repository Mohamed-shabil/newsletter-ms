const express = require('express')
const bodyParser = require('body-parser')
//const request = require('request')
const https = require('https');

app = express();

app.use(bodyParser.urlencoded ({extended:true}));

app.use(express.static("public"));

app.get('/',(req,res)=>{
    res.sendFile(__dirname +'/index.html')
})

app.post('/',(req,res)=>{
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const mail = req.body.email;

    var data = {
        members: [{
            email_address: mail,
            status:'subscribed',
            merge_fields:{
                FNAME : firstName,
                LNAME : lastName,
            }
        }

    ]} ;

    const jsonData = JSON.stringify(data)

    const url = "https://us14.api.mailchimp.com/3.0/lists/5400a86999"
    const options = {
        method:'POST',
        auth:'shabil:ad75eae3ed02f9f524d16f0b6803ce8e-us14'

    }

    // request sending to mailchimp server
    const request = https.request(url,options,(response)=>{

        if (response.statusCode === 200) {
            res.sendFile(__dirname+'/success.html')
        }else{
            res.sendFile(__dirname+'/failure.html')
        }

        response.on('data',(data)=>{
            console.log(JSON.parse(data));  

        })
    })

    request.write(jsonData)
    request.end();
    
})
// api Key ad75eae3ed02f9f524d16f0b6803ce8e-us14
// list id 5400a86999

app.listen(process.env.PORT || 3000,()=>{
    console.log('listening on port 3000')
})