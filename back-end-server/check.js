const mailjet = require ('node-mailjet')
.connect('954d5d1eaf2c2f6ed800fca137d5412c', 'fddf279acacaa33e31079eaac5855ea5')
const request = mailjet
.post("send", {'version': 'v3.1'})
.request({
  "Messages":[
    {
      "From": {
        "Email": "ranarohit800870@gmail.com",
        "Name": "Ganesh"
      },
      "To": [
        {
          "Email": "ranarohit800870@gmail.com",
          "Name": "Ganesh"
        }
      ],
      "Subject": "Greetings from Mailjet.",
      "TextPart": "My first Mailjet email",
      "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
      "CustomID": "AppGettingStartedTest"
    }
  ]
})
// request
//   .then((result) => {
//     console.log(result.body)
//   })
//   .catch((err) => {
//     console.log(err.statusCode)
//   })
