import { deepExtend, isNumber } from 'Editor/scripts/utilities'
import { tooltipContentDefaults } from 'Client/scripts/defaults'

export default class Paragraph {
  constructor(options) {
    this.options = deepExtend({}, tooltipContentDefaults.paragraph, options)
  }
  css() {
    let css = `
    font-family: ${this.options.style.fontFamily};
    font-size: ${this.options.style.fontSize}px;
    line-height: ${
      isNumber(this.options.style.lineHeight) ? this.options.style.lineHeight + 'px' : this.options.style.lineHeight
    };
    color: ${this.options.style.color};

    text-align: ${this.options.style.textAlign};

    width: ${this.options.boxModel.width == 'auto' ? this.options.boxModel.width : this.options.boxModel.width + 'px'};
    height: ${
      this.options.boxModel.height == 'auto' ? this.options.boxModel.height : this.options.boxModel.height + 'px'
    };

    margin-top: ${this.options.boxModel.margin.top}px;
    margin-bottom: ${this.options.boxModel.margin.bottom}px;
    margin-left: ${this.options.boxModel.margin.left}px;
    margin-right: ${this.options.boxModel.margin.right}px;

    padding-top: ${this.options.boxModel.padding.top}px;
    padding-bottom: ${this.options.boxModel.padding.bottom}px;
    padding-left: ${this.options.boxModel.padding.left}px;
    padding-right: ${this.options.boxModel.padding.right}px;
    `

    return css
  }
  html() {
    return `<div style="${this.css()} ${this.options.other.css}" id="${this.options.other.id}" class="${
      this.options.other.classes
    }">${this.options.text}</div>`
  }
}
