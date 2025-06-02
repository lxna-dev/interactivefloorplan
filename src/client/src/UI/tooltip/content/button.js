import { deepExtend } from 'Editor/scripts/utilities'
import { tooltipContentDefaults } from 'Client/scripts/defaults'

export default class Button {
  constructor(options) {
    this.options = deepExtend({}, tooltipContentDefaults.button, options)
  }
  css() {
    let css = `
    background-color: ${this.options.style.backgroundColor};
    border-radius: ${this.options.style.borderRadius}px;

    font-family: ${this.options.style.fontFamily};
    font-weight: ${this.options.style.fontWeight};
    font-size: ${this.options.style.fontSize}px;
    line-height: ${this.options.boxModel.height}px;
    color: ${this.options.style.color};

    width: ${this.options.boxModel.width == 'auto' ? this.options.boxModel.width : this.options.boxModel.width + 'px'};
    height: ${this.options.boxModel.height == 'auto' ? this.options.boxModel.height : this.options.boxModel.height + 'px'};

    text-align: center;
    display: ${this.options.style.display};
    padding: 0 20px;
    `

    return css
  }

  wrapCss() {
    let css = `
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
    let blank = this.options.newTab ? 'target="_blank"' : ''
    return `
    <div style="${this.wrapCss()}">
      <a href="${this.options.url}" ${blank} style="${this.css()} ${this.options.other.css}" id="${this.options.other.id}" class="${this.options.other.classes}" onclick="eval(${this.options.script.replace('<br>', '')})">${this.options.text}</a>
    </div>
    `
  }
}