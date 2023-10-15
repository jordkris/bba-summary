$('#passwordInput').keyup((e)=>{
  $('#passwordOutput').val(CryptoJS.MD5(e.target.value));
})