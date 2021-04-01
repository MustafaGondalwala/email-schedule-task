const nodemailer = require('nodemailer');
const {
  addMailResponse
} = require('./helper/schedule/scheduleHelper')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
          user: process.env.GMAIL_EMAIL,   //put your mail here
          pass: process.env.GMAIL_PASSWORD  //password here
        }
});

sendMail = async (data) => {
      const mailOptions = { 
        from: data.from,       // sender address
        to: data.to,          // reciever address
        subject: data.subject,    
        html: '<p>'+data.message+'</p>'
      }
      return new Promise( async (resolve,reject)=>{
        await transporter.sendMail(mailOptions,async function(error, info){
          if (error) {
              await addMailResponse({
                scheduleId:data._id,
                status:false,
                response:error
              })
              resolve(false); // or use rejcet(false) but then you will have to handle errors
          } 
          else {
              console.log('Email sent: ' + info.response);
              await addMailResponse({
                scheduleId:data._id,
                status:false,
                response:JSON.stringify(info.response)
              })
              resolve(true);
          }
        });
      })
}

getSkipLimitFromBody = (body) => {
  const skip = body.skip !== undefined ? body.skip : 0
  const limit = body.limit !== undefined ? body.limit : 10
  return {skip,limit}
}

getFilterValues = (values,body) => {
  const sendValues = {}
  values.map(item => {
    sendValues[item] = body[item] == undefined && body[item] !== "" ? null : body[item]
  })
  return sendValues
}



TE = function (err, code,log) {
  // TE stands for Throw Error, showing error in development mode only
  let _err;
  switch (true) {
    case typeof err.code === "number" && err.code === 11000:
      _err = "Record already exist.";
      break;
    default:
      _err = err;
      break;
  }
  if (process.env.NODE_ENV === "development") {
    console.error(log)
  }
  throw new Error(_err,code);
};

ReE = function (res, err, code, log) {
  // Error Web Response
  //showing log in development mode only
  if (process.env.NODE_ENV === "development") {
    console.error(`Error logged from API :${log}`);
  }
  let send_data = { success: false };
  if (typeof code !== "undefined") res.statusCode = code;

  if (err instanceof Error && typeof err.message != "undefined") {
    err = err.message;
  } else {
    send_data = { ...send_data, ...err }; //merge the objects
    return res.json(send_data);
  }
  console.log(err)
  return res.json({ success: false, message: err },code);
};

ReS = function (res, data, code) {
  // Success Web Response
  let send_data = { success: true };
  if (typeof data === "object") {
    send_data = Object.assign(data, send_data); //merge the objects
  }

  if (typeof code !== "undefined") res.statusCode = code;

  return res.json(send_data);
};
