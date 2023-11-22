var nodemailer = require('nodemailer');
const Otps = require('./models/otps');

const transporter = nodemailer.createTransport({
   service: "gmail",
    auth: {
        user: "AddYour",
        pass: "AddYour"
    }
});


const sendOtp = async (email, otp) => {

  const newOtp = new Otps({otpValue: otp, isValid: true, email})
  newOtp.save()
  .then(result => {
    console.log(`Here is ${email} and ${otp}`)
    var mailOptions = {
        from: 'info@dummy',
        to: email,
        subject: 'Here is OTP',
        text: `Your OTP is ${otp}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          throw error
        } else {
          console.log('Email sent: ' + info.response);
          return info.response
        }
      });
  })
  .catch(err => {
      return res.status(400).json({
          statusCode: 400,
          message: 'Bad request'
      })
  })
}

module.exports = {
    sendOtp
}