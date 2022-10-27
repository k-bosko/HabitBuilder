function EnableDisableTextBox() {
    let chkOwn = document.getElementById("own");
    let fileUpload = document.getElementById("img");
    fileUpload.disabled = chkOwn.checked ? false : true;
    if (!fileUpload.disabled) {
        fileUpload.focus();
    }
}
