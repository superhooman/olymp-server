const sharp = require('sharp');
const uuidv4 = require('uuid/v4');
const path = require('path');

class Resize {
    constructor(folder) {
        this.folder = folder;
    }
    async save(buffer) {
        const id = uuidv4();

        let result = {}

        const set = [{
                suffix: 'small',
                size: [320, 320]
            },
            {
                suffix: 'medium',
                size: [720, 720]
            },
            {
                suffix: 'large',
                size: [1280, 1280]
            }
        ]

        for (let i of set) {
            const filename = Resize.filename(id, i.suffix);
            const filepath = this.filepath(filename);
            
            await sharp(buffer)
                .resize(i.size[0], i.size[1], {
                    fit: sharp.fit.inside,
                    withoutEnlargement: true
                })
                .jpeg({
                    quality: 90
                })
                .toFile(filepath);
            result[i.suffix] = filename
        }
        return result;
    }
    static filename(id, suffix) {
        return `${id}_${suffix}.jpg`;
    }
    filepath(filename) {
        return path.resolve(`${this.folder}/${filename}`)
    }
}
module.exports = Resize;