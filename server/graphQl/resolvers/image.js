const { parse, join } = require('path');
const { createWriteStream } = require('fs');

const uploadImage = async (ImageResource) => {
    try {
        let { filename, createReadStream } = await ImageResource;

        let readStream = createReadStream();
    
        let { ext, name } = parse(filename);
        name = name.replace(/[^a-zA-Z ]/gi,'-').replace(' ','_') + '-' + Date.now() + ext;
        let storagePath = join(__dirname,`../../image/${name}`);
    
        let writeStream = await createWriteStream(storagePath);
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