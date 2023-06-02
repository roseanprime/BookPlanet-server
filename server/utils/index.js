module.exports = {

    role: (req, ...rolesToCheck) => rolesToCheck.includes(req.session.currentUser?.role),

    randomToken: () => {
        let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let randomToken = ''
        for (let i = 32; i > 0; --i) randomToken += str[Math.floor(Math.random() * str.length)]
        return randomToken
    },

    emails: (type, objectNeeded) => {

        if (type === 'email') {
            return {
                from: 'My App Books',
                to: objectNeeded.email,
                subject: 'Welcome to Books, confirm your subscription ',
                text: '',
                html: `'<h1> Welcome to Books</h1><br>
                <a href="http://localhost:5000/confirmation/email/${objectNeeded.tokenConfirmation}">Get confirmed</a>`,
            }
        }
     

        if (type === 'customMessage') {
            console.log(objectNeeded.elm)
            let subject = `Book accepted in BooksApp.`
            let content = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste voluptate nostrum consectetur amet, autem cumque repellat asperiores aperiam aliquid repudiandae ea omnis est quod. Explicabo magnam aliquam maxime fugit ipsam! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae a quos fugit vitae repudiandae voluptates reiciendis mollitia aperiam odio consectetur recusandae beatae, quia asperiores eius esse. Hic incidunt minima tempora?`
            if (objectNeeded.subject !== '') subject = objectNeeded.subject
            if (objectNeeded.answer !== '') content = objectNeeded.answer
            // console.log(objectNeeded.elm)
            return {
                from: 'My project Books',
                to: objectNeeded.elm.user_id.email,
                subject: subject,
                text: content,
                html: content,
            }
        }
    },
}














