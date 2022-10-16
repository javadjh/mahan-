export const extractFileName = (contentDispositionValue) => {
    let filename = "";
    if (contentDispositionValue && contentDispositionValue.indexOf('attachment') !== -1) {
        let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        let matches = filenameRegex.exec(contentDispositionValue);
        if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
        }
    }
    return filename;
}
