const SFTP = require('ssh2-sftp-client')
const utils = require('../utils');
const { join } = require('path');



const constants = require('../../constants')
const helper = require('./helper')
const { Parser } = require('json2csv');
const fs = require('fs')
const {SFTPUploadFile, SFTPGetFile} = require("./helper");

async function uploadFile({body}, logger) {
    const {sftpOptions, report} = body
    const orgId = "/data/andreyexsftp/upload"
    const folder = sftpOptions.folder
    let fileName = report.name
    const format = report.format

    if (body) {
        const client = new SFTP()
        const pathFolder = join(folder)
        const orgPath = join( orgId,`${folder}`)
        await helper.SFTPCreateConnection(client, sftpOptions)
        // await helper.generateFile(client, report, orgPath)
        const exist = await helper.SFTPList(client, orgId, pathFolder)
        if (!exist) {
          await  helper.SFTPCreateFolder(client, orgPath)
        }
        await helper.generateFile(client, report, orgPath)
        // await helper.SFTPUploadFile(client, path, `${orgPath}/${fileName}.${format}` )
        await client.end()
        // await helper.deleteFile(path)
        return fileName
        // return helper.SFTPCreateConnection(client, sftpOptions)
        //     // .then(() => helper.SFTPList(client, path)
        //     // .then((list) => {
        //     //     if(helper.checkDir(list)) {
        //     //         return Promise.resolve()
        //     //     }
        //     //     return helper.SFTPCreateFolder(client, orgPath);
        //     // }))
        //     .then(() => helper.generateFile(report)
        //         .then((path) => helper.SFTPUploadFile(client, path, `/data/andreyexsftp/upload/${fileName}.csv`)
        //             .then(() => {
        //                 client.end();
        //                 return fileName;
        //             }))
        //         .catch((error) => {
        //             client.end();
        //             return Promise.reject(error)
        //         })
        //     );
    }
    return Promise.reject()
}

module.exports = {
    uploadFile
}
