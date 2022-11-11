let Client = require('ssh2-sftp-client');
const {Parser} = require("json2csv");
const fs = require("fs");
const xlsx = require("xlsx");
const {parse} = require('csv-parse')
const csvtojson=require("csvtojson");
const crypto = require("crypto");
const Stream = require("stream");

const regex = new RegExp("[^\",]+")

// async function SFTPCreateConnection(client, SFTPconfig) {
//     const creds = await decryptCredentials(SFTPconfig.credentials)
//     const [username, password] = creds.split(':')
//     return new Promise((resolve, reject) => {
//         client.connect({
//             host: SFTPconfig.host,
//             port: SFTPconfig.port,
//             username,
//             password
//         }).then(()=>resolve()).catch((err) => reject(err));
//     })
// }
async function SFTPCreateConnection(client, SFTPconfig) {
    return client.connect({
        host: '192.168.100.74',
        port: 22,
        username: 'andreyexsftp',
        password: '0228',
    });
}

async function SFTPList(client, remoteDir, folder) {
    let fileObjects;
    try {
        fileObjects = await client.list(remoteDir);
    } catch (err) {
        console.log('Listing failed:', err);
    }
    let exist = false;

    for (const file of fileObjects) {
        if (file.type === 'd' && file.name === folder) {
            exist = true;
        }
    }
    return exist;
}

async function CSVToJSON(data) {
    csvtojson({
        output: "json"
    })
        .fromString(data)
        .then((csvRow)=>{
            console.log(csvRow)
        })
}


async function decryptCredentials(encryptedData) {
  try{
      const _key = 'exB+hoG2zIfII1KilEZha8Y2BKO2Q2c8n946kR4Ke/c='
      const key = Buffer.from(_key, "base64")
      const algorithm = 'aes-256-cbc'
      const buf = new Buffer(encryptedData, 'base64');
      const iv = buf.slice(0,16)
      const crypt = buf.toString('base64', 16);

      const decipher = crypto.createDecipheriv(algorithm, key, iv)
      decipher.setAutoPadding(false);
      let dec = decipher.update(crypt, 'base64', 'utf-8');
      dec += decipher.final('utf-8')
    return dec
} catch (err) {
      return err
  }
}




// async function generateCSV(report) {
//     return new Promise(async (resolve, reject) => {
//         const data = report.data
//         const json2csv = new Parser({delimiter: report.delimiter, quote: ""});
//         const csv = await json2csv.parse(data)
//         // const path = `./${report.name}.csv`
//         await fs.writeFile(`./${report.name}.csv`, csv, (err) => {
//             if (err) reject(err)
//     })
//         return resolve(`./${report.name}.csv`)
// })}

async function generateXLSX(report) {
    return new Promise(async (resolve, reject) => {
       //  const workSheet = xlsx.utils.json_to_sheet(report.data);
       //  const workBook = xlsx.utils.book_new();
       //
       // await xlsx.utils.book_append_sheet(workBook,workSheet, report.name)
       // await xlsx.write(workBook, {bookType: "xlsx", type: 'buffer'})
       // await xlsx.write(workBook, {bookType: 'xlsx', type: "binary"})
       // await xlsx.writeFile(workBook, `./${report.name}.xlsx`)
       //  return resolve(`./${report.name}.xlsx`)

        await CSVToJSON(report.data)
        resolve('go')
})}
async function generateTXT(report) {
    return new Promise(async (resolve, reject) => {
            const data = report.data
            await fs.writeFile(`./files/${report.name}.txt`, JSON.stringify(data), (err) => {
                    if (err) reject(err)
                }
            )
        return resolve(`./files/${report.name}.txt`)
        }
    )
}

async function deleteFile(path) {
    return new Promise(async (resolve, reject) => {
        await fs.unlink(path, (err) => {
            if (err) reject(err)
        })
        return resolve()
    })}

async function generateAndUpload(client, report, orgPath) {
    let newData
    console.log(report)
    if(report.delimiter !== ',') {
        newData = report.data.replaceAll(new RegExp(/,/g), report.delimiter)

    }
    console.log(newData)
    return SFTPUploadFile(client, report, newData, orgPath)

}

async function generateFile(client, report, orgPath) {
    // return new Promise(async (resolve, reject) => {
        switch (report.format) {
            case 'csv' || 'txt':
               await generateAndUpload(client, report, orgPath)
                break
            case 'xlsx' || 'xls':
                await generateXLSX(report)
                break
            case 'txt':
                await generateTXT(report)
                break
            default: return new Error()
        }
    // })


}

function SFTPUploadFile(client, report, path, file) {
    return client.append(Buffer.from(path), `${file}/${report.name}.${report.format}`)
}

async function SFTPGetFile(client, path, path2) {
    return client.get(path, path2)
}


function SFTPCreateFolder(client, path, recursive = false) {
   return client.mkdir(path, recursive)
}


module.exports = {
    SFTPList,
    deleteFile,
    SFTPGetFile,
    generateFile,
    SFTPUploadFile,
    generateAndUpload,
    SFTPCreateFolder,
    decryptCredentials,
    SFTPCreateConnection
}
