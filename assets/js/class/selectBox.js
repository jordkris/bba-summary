class SelectBox {
  constructor(id, options, value) {
    this.id=id;
    this.label=options.label;
    this.name=options.name;
    this.isEnabled=options.isEnabled;
    this.isReadOnly=options.isReadOnly;
    this.options=options.options;
    this.value=value;
    this.help=options.help;
  }
  generate() {
    let selectOption='';
    this.options.forEach((option) => {
      selectOption+=`<option value="${option.value}" ${option.value==this.value? 'selected':''}>${option.label}</option>`;
    });
    return `
      <div class="col-lg-6">
        <div class="form-floating">
          <select id="${this.id}" class="form-select" ${this.isEnabled? "":"disabled"} ${this.isReadOnly? "readonly":""} name="${this.id}">
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