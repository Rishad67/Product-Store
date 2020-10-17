const { parse, join } = require('path');
const { createWriteStream } = require('fs');

const uploadImage = async (ImageResource) => {
    try {
        let { filename, createReadStream, mimetype, encoding } = await ImageResource;

        let readStream = createReadStream();
    
        let { ext, name } = parse(filename);
        name = name.replace(/[^a-zA-Z0-9 ]/gi,'-').replace(' ','_') + '-' + Date.now() + ext;
        let storagePath = join(__dirname,`../../images/${name}`);

        let writeStream = await createWriteStream(storagePath);
        writeStream.on('error', err => console.log(err));
        await readStream.pipe(writeStream);

        return name;
    }
    catch(err) {
        throw err;
    }
}

module.exports = {
    uploadImage: uploadImage
}