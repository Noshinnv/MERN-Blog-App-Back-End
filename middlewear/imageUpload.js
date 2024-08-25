export const imageUpload = async (imageName, file) => {//imageName is the name of the image and file is the image
    return await file
        .mv(process.cwd() + "/images/" + imageName)
        .then((data) => true)//if file move to folder
        .catch((e) => {
            console.log(e);
            return false;
        });
};