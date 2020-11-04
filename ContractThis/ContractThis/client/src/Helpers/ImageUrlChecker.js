//Image Route handling helpers

const ImageChecker = {
    convertPath(url) {
        if (url !== "" && url !== undefined && url !== null){
            if (url.toLowerCase().startsWith("http") || url.toLowerCase().startsWith("www")){
                return url
            }
        else {
            const adjustedUrl = ImageChecker.getImageUrl(url)
            return adjustedUrl
        }        
        }
    },
    getImageUrl(url) {
        const getUrl = `/api/image/${url}`
        return(getUrl)
    }
}


export default ImageChecker
