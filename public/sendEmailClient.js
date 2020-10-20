let replay = (name) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <title>Email</title>
    </head>
    <body style="background-color:#2c2c2c;color:white;">
            <div class="card bg-dark text-center text-success" style=" padding:30px;margin:0 auto;">
                    <section style="margin:0 auto;">
                    <h3 style="background-color:#2c2c2c;color:white;font-size:10pt;Text-align:center;">
                    <img src="https://i.ebayimg.com/images/g/f-kAAOSwDrNZPqU2/s-l300.jpg" style="float-left;width:100px;height:100px;" alt="logo"/>
                    <h1 style="color:pink;font-size:12pt;float:right;"> ACS Apotheke Team </h1>
                    <u> <h2 style="color:blue;">Hello ${name}</h2>Your email is confirmed successfully</u>
                    
                    <h1 style="color:green;"> Your Email verified successfully</h1>
                    <br>
                    <p style="color:white"> Thank you for your message</p><br>
                    <p style="color:white">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   
                   </p>
                    <p class="p-2"> Visit Us Soon .....</p><br>
                    <p class="p-2"> Our Address is: musterstreert 33,56565 Mustercity </p><br>
                     Our Website :<button type="button"><a href="http://localhost:5000">ACS Apotheka</button>                     
                    <br>
                </section>
                <a target="_blank" href="http://localhost:5000" style="background-color:#2f2f2f;margin:0 auto;">Enjoy in our site</a>           
            </div>
          </h3> 
    
    </body>
    
    </html>`
}

module.exports = replay;