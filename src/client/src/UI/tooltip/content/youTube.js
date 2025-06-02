import { deepExtend } from 'Editor/scripts/utilities'
import { tooltipContentDefaults } from 'Client/scripts/defaults'

export default class YouTube {
  constructor(options) {
    this.options = deepExtend({}, tooltipContentDefaults.youtube, options)
  }
  css() {
    let css = `
    width: ${this.options.boxModel.width == 'auto' ? this.options.boxModel.width : this.options.boxModel.width + 'px'};
    height: ${this.options.boxModel.height == 'auto' ? this.options.boxModel.height : this.options.boxModel.height + 'px'};

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
    let embedCode = this.options.embedCode

    // Allow fullscreen
    embedCode = embedCode.replace('allowfullscreen', '')
    if (this.options.allowFullscreen && embedCode.indexOf('allowfullscreen') == -1) {
      embedCode = embedCode.replace('></iframe>', ' allowfullscreen></iframe>')
    }

    // Set width
    if (this.options.boxModel.width == 'auto') {
      embedCode = embedCode.replace(/width="\d+"/g, 'width="100%"')
    } else {
      embedCode = embedCode.replace(/width="\d+"/g, 'width="' + this.options.boxModel.width + 'px"')
    }

    // Set height
    embedCode = embedCode.replace(/height="\d+"/g, 'height="' + this.options.boxModel.height + 'px"')

    return `<div style="${this.css()} ${this.options.other.css}" id="${this.options.other.id}" class="${this.options.other.classes}">${embedCode}</div>`
  }
}