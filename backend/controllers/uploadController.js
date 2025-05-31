import User from "../models/User.js";
import cloudinary from "../utils/cloudinary.js";


export const uploadFile = async (req, res, next) => {

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" })
    }

    const stream = cloudinary.uploader.upload_stream(
        { folder: "dugsiiye_uploads", resource_type: "auto" },
        async (error, result) => {
            if (error) return next(error);

            await User.findByIdAndUpdate(req.user._id, { profile: result.secure_url })


            return res.status(201).json({
                success: true,
                fileUrl: result.secure_url
            })
        }
    )
    stream.end(req.file.buffer)
}