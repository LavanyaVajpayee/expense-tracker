export const getProfileImage=(file:any)=>{
    if(file && typeof file=='string') return file
    if(file && typeof file=='object') return file.uri
    //uri tells us where the file is located
    return require("../assets/images/default_avatar.png")

}