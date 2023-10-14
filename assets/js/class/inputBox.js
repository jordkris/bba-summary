class InputBox {
  constructor(id, options, value) {
    this.id=id;
    this.label=options.label;
    this.type=options.type;
    this.isEnabled=options.isEnabled;
    this.isReadOnly=options.isReadOnly;
    this.help=options.help;
    this.value=value;
  }
  generate() {
    return `
      <div class="col-lg-6">
        <div class="form-floating">
          <input
            type="${this.type}"
            class="form-control"
            id="${this.id}"
            name="${this.id}"
            aria-describedby="floatingInputHelp"
            ${this.isEnabled? "":"disabled"}
            ${this.isReadOnly? "readonly":""}
            value="${this.value}"
          />
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