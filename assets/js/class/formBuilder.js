class FormBuilder {
  constructor(data, apiResponse, table) {
    this.data=data;
    this.apiResponse=apiResponse;
    this.table=table;
  }
  generate() {
    let value;
    let output=`<form id="formBbaModal"><div class="row">`;
    this.data.forEach((input) => {
      value=this.apiResponse[input.key];
      switch (input.type) {
        case 'InputBox':
          output+=new InputBox(input.key, input.options, value).generate();
          break;
        case 'SelectBox':
          output+=new SelectBox(input.key, input.options, value).generate();
          $(`#${input.options.id}`).selectpicker();
        default:
        // no action
      }
    });
    return output+`</div></form>`;
  }
}