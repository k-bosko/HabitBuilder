function EnableDisableTextBox() {
  var chkOwn = document.getElementById("own");
  var fileUpload = document.getElementById("img");
  fileUpload.disabled = chkOwn.checked ? false : true;
  if (!fileUpload.disabled) {
    fileUpload.focus();
  }
}
