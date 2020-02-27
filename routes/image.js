const router = require('express').Router();
const verify = require("../utils/verifyToken");
const upload = require('../utils/upload');
const response = require('../utils/response');
const Resize = require('../utils/resize');
const path = require("path")
const Image = require("../models/Image");

    /**
    * Recieve all images
    *
    * @param  {Number} page number of page
    * @param  {Number} limit amount of images per page
    * @return {Array} array of image sets
    */

router.get("/", verify, async (req, res) => {
    const images = await Image.find({})
    response(res, images)
})

    /**
    * Upload an image
    *
    * @param  {File} image image
    * @return {Object} set of images with different sizes
    */

router.post("/", [upload.single('image'), verify], async (req, res) => {
    if(!req.user.admin){
        return response(res, null, 2)
    }
    const imagePath = path.join(__dirname, '../', '/static/images');
    const fileUpload = new Resize(imagePath);
    if (!req.file) return response(res, null, 5, req)
    const set = await fileUpload.save(req.file.buffer);
    const image = new Image(set);
    try {
        const savedImage = await image.save();
        response(res, savedImage)
    } catch (err) {
        response(res, null, 3, req)
    }
})

    /**
    * Remove an image
    *
    * @param  {String} id ID of an image
    */

router.delete("/:id", verify, (req, res) => {
    if(!req.user.admin){
        return response(res, null, 2)
    }
    if(!req.params.id) return response(res, null, 6, req)
    Image.remove({ _id: req.params.id }, function(err) {
        if (err) return response(res, null, 3, req)
        response(res, 'done')
    });
})

module.exports = router;