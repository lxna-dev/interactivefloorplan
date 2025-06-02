import { deepExtend } from 'Editor/scripts/utilities'
import { tooltipContentDefaults } from 'Client/scripts/defaults'

export default class Image {
  constructor(options) {
    this.options = deepExtend({}, tooltipContentDefaults.image, options)
  }
  css() {
    let css = `
    width: ${this.options.boxModel.width == 'auto' ? this.options.boxModel.width : this.options.boxModel.width + 'px'};
    height: ${this.options.boxModel.height == 'auto' ? this.options.boxModel.height : this.options.boxModel.height + 'px'};

    max-width: 100%;

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
  isValidHttpUrl(string) {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }
  html() {
    let html = `
    <div style="${this.css()} ${this.options.other.css}">
    <img src="${this.options.url}" style="width: 100%" id="${this.options.other.id}" class="${this.options.other.classes}">
    </div>
    `

    // validate link URL
    if (this.isValidHttpUrl(this.options.linkUrl)) {
      html = `<a href="${this.options.linkUrl}">${html}</a>`
    }


    return html
  }
}