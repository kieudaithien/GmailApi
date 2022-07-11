const controllers = require('./controllers')

async function getCodeVerified() {
    const emailIds =  await controllers.readListMessMail("thienkdt@gmail.com")
    //var codeVerified
    for(var id in emailIds.messages){
        const emailInfo = await controllers.readMail("thienkdt@gmail.com", emailIds.messages[id].id)
        const contentGmail = emailInfo.snippet
        if(contentGmail.includes("Karmaverse") && contentGmail.includes("Verify your email")){
            const removeTextBeforeCode = contentGmail.substring(contentGmail.indexOf("Your verification code is:")+ 27)
            const code = removeTextBeforeCode.substring(0, removeTextBeforeCode.indexOf(" "))
            console.log(code)
            return code
        }
    }
}
getCodeVerified()