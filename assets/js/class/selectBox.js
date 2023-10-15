class SelectBox {
  constructor(id, options, value) {
    this.id=id;
    this.label=options.label;
    this.name=options.name;
    this.isEnabled=options.isEnabled;
    this.isReadOnly=options.isReadOnly;
    this.optionsTable=options.optionsTable;
    this.value=value;
    this.help=options.help;
  }
  async generate() {
    let optionsData=await new Promise((resolve, reject) => {
      $.ajax({
        url: baseUrl+'/api/getAll',
        type: "GET",
        beforeSend: (request) => {
          request.setRequestHeader("session", session);
          request.setRequestHeader("table", this.optionsTable);
        },
        success: (response) => {
          if (response.status==200) {
            resolve(response.output);
          } else {
            reject(response.message);
          }
        }, error: (error) => {
          reject(error);
        }
      });
    });

    let selectOption='';
    optionsData.forEach((option) => {
      selectOption+=`<option value="${option.id}" ${option.id==this.value? 'selected':''}>${option.name}</option>`;
    });
    return `
      <div class="col-lg-6">
        <div class="form-floating">
          <select id="${this.id}" class="form-select" ${this.isEnabled? "":"disabled"} ${this.isReadOnly? "readonly":""} name="${this.id}">
            <option value=""></option>
            ${selectOption}
          </select>
          <label>${this.label}</label>
          <div class="form-text">
            ${this.help==''? '':'<i class="bx bx-info-circle"></i>'+this.help} 
          </div>
          <div class="dropdown-divider"></div>
        </div>
      </div>
    `;
  }

}