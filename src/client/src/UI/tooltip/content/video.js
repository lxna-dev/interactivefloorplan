import { deepExtend, isValidHttpUrl } from 'Editor/scripts/utilities'
import { tooltipContentDefaults } from 'Client/scripts/defaults'

export default class Video {
  constructor(options) {
    this.options = deepExtend({}, tooltipContentDefaults.video, options)
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
    let videoTagAtts = '';

    if (this.options.autoplay) {
      videoTagAtts += ' autoplay ';
    }
    if (this.options.loop) {
      videoTagAtts += ' loop ';
    }
    if (this.options.controls) {
      videoTagAtts += ' controls ';
    }

    let html = `<video ${videoTagAtts} 
      style="${this.css()} ${this.options.other.css}" 
      id="${this.options.other.id}" 
      class="${this.options.other.classes}">

    <source src="${this.options.src.mp4}" type="video/mp4">
    <source src="${this.options.src.webm}" type="video/webm">
    <source src="${this.options.src.ogv}" type="video/ogv">
    
    </video>`;

    // validate link URL
    if (isValidHttpUrl(this.options.linkUrl)) {
      html = `<a href="${this.options.linkUrl}">${html}</a>`
    }

    return html
  }
}