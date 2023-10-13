class FormBuilder {
  constructor(data, apiResponse) {
    this.data=data;
    this.apiResponse=apiResponse;
  }
  generate() {
    let value;
    let output=`<form ><div class="row">`;
    this.data.forEach((input) => {
      value=this.apiResponse[input.key];
      switch (input.type) {
        case "InputBox":
          output+=new InputBox(input.options, value).generate();
          break;
        default:
          output+=`<div class="col-lg-6">${input.value}</div>`;
      }
    });
    return output+`</div></form>`;
  }
}