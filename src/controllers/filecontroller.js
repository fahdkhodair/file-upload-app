
import { asyncHandler, successHandler, errorHandler } from "../utils/asynchandler.js";
import FileModel from "../models/File.model.js";

export const uploadFile = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const file = req.file;

    if (!name || !file) {
        throw new errorHandler("Name and file are required", 400);
    }

    const fileData = await FileModel.create({
        name,
        path: file.path,
        size: file.size,
        type: file.mimetype,
        user: req.user._id,
        isPublic: false,
        isDeleted: false
    });

    successHandler(
        res,
        {
            message: "File uploaded successfully",
            data: fileData
        },
        201
    );
});


export const getAllFiles = asyncHandler(async (req, res) => {
    const files = await FileModel.find();
    successHandler(res, { message: "Files fetched successfully", data: files }, 200);
})
export const getFileById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const file = await FileModel.findById(id);
    successHandler(res, { message: "File fetched successfully", data: file }, 200);
})
export const updateFile = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if(!name) {
        throw new Error("Name is required");
    }
    const fileData = await FileModel.findByIdAndUpdate(id, { name });
    successHandler(res, { message: "File updated successfully", data: fileData }, 200);
})
export const deleteFile = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const file = await FileModel.findByIdAndDelete(id);
    successHandler(res, { message: "File deleted successfully", data: file }, 200);
})
