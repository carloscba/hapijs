const fs = require('fs');


const sourceData = 'inactivos-PA'

const userList = require(`./data/database/${sourceData}`)

let list = ''

userList.RECORDS.map((user, index) => {
    list += (`${user.firstname} <${user.email}>\n`)
})

const finalPath = `./data/mailgunlist/${sourceData}.txt`

fs.writeFile(finalPath, list, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log(`The file ${finalPath} was saved!`);
}); 