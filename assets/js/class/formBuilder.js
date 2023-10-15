class FormBuilder {
  constructor(data, apiResponse, table) {
    this.data=data;
    this.apiResponse=apiResponse;
    this.table=table;
  }
  async generate() {
    let value;
    let output=`<form id="formBbaModal"><div class="row">`;
    for (let input of this.data) {
      value=this.apiResponse[input.key];
      switch (input.type) {
        case 'InputBox':
          output+=new InputBox(input.key, input.options, value).generate();
          break;
        case 'SelectBox':
          output+=await (new SelectBox(input.key, input.options, value)).generate();
        default:
        // no action
      }
    }
    return output+`</div></form>`;
  }
}