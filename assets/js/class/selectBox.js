class SelectBox {
  constructor(options, value) {
    this.label=options.label;
    this.name=options.name;
    this.isEnabled=options.isEnabled;
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
            id="floatingInput"
            name="${this.name}"
            aria-describedby="floatingInputHelp"
            ${this.isEnabled? "":"disabled"}
            value="${this.value}"
          />
          <label for="floatingInput">${this.label}</label>
          <div id="floatingInputHelp" class="form-text">
            ${this.help==''? '':'<i class="bx bx-info-circle"></i>'+this.help} 
          </div>
        </div>
      </div>
    `;
  }
}