import { tooltipContentDefaults } from 'Client/scripts/defaults'

export default function parseContent(content) {
  let parsedContent = content

  // Very old content type
  if (content.content_type == 'plain-text') {
    parsedContent = parseLegacyPlainTextFormat(content)
  }

  // Squares content type
  if (content.squares_settings) {
    parsedContent = parseLegacySquaresFormat(content)
  }

  return parsedContent
}

function parseLegacyPlainTextFormat(content) {
  return [{
    type: 'Paragraph',
    text: content.plain_text
  }]
}
function parseLegacySquaresFormat(content) {
  let elements = []

  // Squares content type
  // converts squares option type to the new type
  for (let container of content.squares_settings.containers) {
    if (container.settings?.elements) {
      for (let elementOptions of container.settings.elements) {
        if (elementOptions.settings.name == 'Paragraph' && elementOptions.options?.text) {
          elements.push(parseLegacySquaresParagraph(elementOptions))
        }
        if (elementOptions.settings.name == 'Heading') {
          elements.push(parseLegacySquaresHeading(elementOptions))
        }
        if (elementOptions.settings.name == 'Image') {
          elements.push(parseLegacySquaresImage(elementOptions))
        }
        if (elementOptions.settings.name == 'Button') {
          elements.push(parseLegacySquaresButton(elementOptions))
        }
        if (elementOptions.settings.name == 'YouTube') {
          elements.push(parseLegacySquaresYouTube(elementOptions))
        }
        if (elementOptions.settings.name == 'Video') {
          elements.push(parseLegacySquaresVideo(elementOptions))
        }
      }
    }
  }

  return elements
}
function parseLegacySquaresParagraph(elementOptions) {
  let newElement = {
    type: 'Paragraph',
    text: elementOptions.options?.text?.text || tooltipContentDefaults.paragraph.text,
    other: {
      id: elementOptions.options?.general?.id || tooltipContentDefaults.paragraph.other.id,
      classes: elementOptions.options?.general?.classes || tooltipContentDefaults.paragraph.other.classes,
      css: elementOptions.options?.general?.css || tooltipContentDefaults.paragraph.other.css,
    },
    style: {
      fontFamily: elementOptions.options?.font?.font_family || tooltipContentDefaults.paragraph.style.fontFamily,
      fontSize: elementOptions.options?.font?.font_size || tooltipContentDefaults.paragraph.style.fontSize,
      fontWeight: elementOptions.options?.font?.font_weight || tooltipContentDefaults.paragraph.style.fontWeight,
      fontStyle: elementOptions.options?.font?.font_style || tooltipContentDefaults.paragraph.style.fontStyle,
      lineHeight: elementOptions.options?.font?.line_height || tooltipContentDefaults.paragraph.style.lineHeight,
      color: elementOptions.options?.font?.text_color || tooltipContentDefaults.paragraph.style.color,
      textAlign: elementOptions.options?.font?.text_align || tooltipContentDefaults.paragraph.style.textAlign,
      textDecoration: elementOptions.options?.font?.text_decoration || tooltipContentDefaults.paragraph.style.textDecoration,
      textTransform: elementOptions.options?.font?.text_transform || tooltipContentDefaults.paragraph.style.textTransform,
      textShadow: elementOptions.options?.font?.text_shadow || tooltipContentDefaults.paragraph.style.textShadow
    },
    boxModel: {
      width: 'auto',
      height: 'auto',
      margin: {
        top: elementOptions.options?.layout?.box_model?.margin?.top || tooltipContentDefaults.paragraph.boxModel.margin.top,
        bottom: elementOptions.options?.layout?.box_model?.margin?.bottom || tooltipContentDefaults.paragraph.boxModel.margin.bottom,
        left: elementOptions.options?.layout?.box_model?.margin?.left || tooltipContentDefaults.paragraph.boxModel.margin.left,
        right: elementOptions.options?.layout?.box_model?.margin?.right || tooltipContentDefaults.paragraph.boxModel.margin.right
      },
      padding: {
        top: elementOptions.options?.layout?.box_model?.padding?.top || tooltipContentDefaults.paragraph.boxModel.padding.top,
        bottom: elementOptions.options?.layout?.box_model?.padding?.bottom || tooltipContentDefaults.paragraph.boxModel.padding.bottom,
        left: elementOptions.options?.layout?.box_model?.padding?.left || tooltipContentDefaults.paragraph.boxModel.padding.left,
        right: elementOptions.options?.layout?.box_model?.padding?.right || tooltipContentDefaults.paragraph.boxModel.padding.right
      },
    }
  }
  return newElement
}
function parseLegacySquaresHeading(elementOptions) {
  let newElement = {
    type: 'Heading',
    text: elementOptions.options?.heading?.text || tooltipContentDefaults.heading.text,
    heading: elementOptions.options?.heading?.heading || tooltipContentDefaults.heading.heading,
    other: {
      id: elementOptions.options?.general?.id || tooltipContentDefaults.heading.other.id,
      classes: elementOptions.options?.general?.classes || tooltipContentDefaults.heading.other.classes,
      css: elementOptions.options?.general?.css || tooltipContentDefaults.heading.other.css,
    },
    style: {
      fontFamily: elementOptions.options?.font?.font_family || tooltipContentDefaults.heading.style.fontFamily,
      fontSize: elementOptions.options?.font?.font_size || tooltipContentDefaults.heading.style.fontSize,
      fontWeight: elementOptions.options?.font?.font_weight || tooltipContentDefaults.heading.style.fontWeight,
      fontStyle: elementOptions.options?.font?.font_style || tooltipContentDefaults.heading.style.fontStyle,
      lineHeight: elementOptions.options?.font?.line_height || tooltipContentDefaults.heading.style.lineHeight,
      color: elementOptions.options?.font?.text_color || tooltipContentDefaults.heading.style.color,
      textAlign: elementOptions.options?.font?.text_align || tooltipContentDefaults.heading.style.textAlign,
      textDecoration: elementOptions.options?.font?.text_decoration || tooltipContentDefaults.heading.style.textDecoration,
      textTransform: elementOptions.options?.font?.text_transform || tooltipContentDefaults.heading.style.textTransform,
      textShadow: elementOptions.options?.font?.text_shadow || tooltipContentDefaults.heading.style.textShadow
    },
    boxModel: {
      width: 'auto',
      height: 'auto',
      margin: {
        top: elementOptions.options?.layout?.box_model?.margin?.top || tooltipContentDefaults.heading.boxModel.margin.top,
        bottom: elementOptions.options?.layout?.box_model?.margin?.bottom || tooltipContentDefaults.heading.boxModel.margin.bottom,
        left: elementOptions.options?.layout?.box_model?.margin?.left || tooltipContentDefaults.heading.boxModel.margin.left,
        right: elementOptions.options?.layout?.box_model?.margin?.right || tooltipContentDefaults.heading.boxModel.margin.right
      },
      padding: {
        top: elementOptions.options?.layout?.box_model?.padding?.top || tooltipContentDefaults.heading.boxModel.padding.top,
        bottom: elementOptions.options?.layout?.box_model?.padding?.bottom || tooltipContentDefaults.heading.boxModel.padding.bottom,
        left: elementOptions.options?.layout?.box_model?.padding?.left || tooltipContentDefaults.heading.boxModel.padding.left,
        right: elementOptions.options?.layout?.box_model?.padding?.right || tooltipContentDefaults.heading.boxModel.padding.right
      },
    }
  }

  return newElement
}
function parseLegacySquaresImage(elementOptions) {
  let newElement = {
    type: 'Image',
    url: elementOptions.options?.image?.url || tooltipContentDefaults.image.url,
    linkUrl: elementOptions.options?.image?.link_to || tooltipContentDefaults.image.linkUrl,
    other: {
      id: elementOptions.options?.general?.id || tooltipContentDefaults.image.other.id,
      classes: elementOptions.options?.general?.classes || tooltipContentDefaults.image.other.classes,
      css: elementOptions.options?.general?.css || tooltipContentDefaults.image.other.css,
    },
    boxModel: {
      width: 'auto',
      height: 'auto',
      margin: {
        top: elementOptions.options?.layout?.box_model?.margin?.top || tooltipContentDefaults.image.boxModel.margin.top,
        bottom: elementOptions.options?.layout?.box_model?.margin?.bottom || tooltipContentDefaults.image.boxModel.margin.bottom,
        left: elementOptions.options?.layout?.box_model?.margin?.left || tooltipContentDefaults.image.boxModel.margin.left,
        right: elementOptions.options?.layout?.box_model?.margin?.right || tooltipContentDefaults.image.boxModel.margin.right
      },
      padding: {
        top: elementOptions.options?.layout?.box_model?.padding?.top || tooltipContentDefaults.image.boxModel.padding.top,
        bottom: elementOptions.options?.layout?.box_model?.padding?.bottom || tooltipContentDefaults.image.boxModel.padding.bottom,
        left: elementOptions.options?.layout?.box_model?.padding?.left || tooltipContentDefaults.image.boxModel.padding.left,
        right: elementOptions.options?.layout?.box_model?.padding?.right || tooltipContentDefaults.image.boxModel.padding.right
      },
    }
  }

  return newElement
}
function parseLegacySquaresButton(elementOptions) {
  let newElement = {
    type: 'Button',
    text: elementOptions.options?.button?.text || tooltipContentDefaults.button.text,
    url: elementOptions.options?.button?.link_to || tooltipContentDefaults.button.url,
    newTab: elementOptions.options?.button?.new_tab || tooltipContentDefaults.button.newTab,
    other: {
      id: elementOptions.options?.general?.id || tooltipContentDefaults.button.other.id,
      classes: elementOptions.options?.general?.classes || tooltipContentDefaults.button.other.classes,
      css: elementOptions.options?.general?.css || tooltipContentDefaults.button.other.css,
    },
    style: {
      backgroundColor: elementOptions.options?.button?.bg_color || tooltipContentDefaults.button.style.backgroundColor,
      borderRadius: elementOptions.options?.button?.border_radius || tooltipContentDefaults.button.style.borderRadius,

      fontFamily: elementOptions.options?.font?.font_family || tooltipContentDefaults.button.style.fontFamily,
      fontSize: elementOptions.options?.font?.font_size || tooltipContentDefaults.button.style.fontSize,
      fontWeight: elementOptions.options?.font?.font_weight || tooltipContentDefaults.button.style.fontWeight,
      fontStyle: elementOptions.options?.font?.font_style || tooltipContentDefaults.button.style.fontStyle,
      lineHeight: elementOptions.options?.button?.height || tooltipContentDefaults.button.style.lineHeight,
      color: elementOptions.options?.button?.text_color || tooltipContentDefaults.button.style.color,
      textAlign: elementOptions.options?.font?.text_align || tooltipContentDefaults.button.style.textAlign,
      textDecoration: elementOptions.options?.font?.text_decoration || tooltipContentDefaults.button.style.textDecoration,
      textTransform: elementOptions.options?.font?.text_transform || tooltipContentDefaults.button.style.textTransform,
      textShadow: elementOptions.options?.font?.text_shadow || tooltipContentDefaults.button.style.textShadow
    },
    boxModel: {
      width: 'auto',
      height: 'auto',
      margin: {
        top: elementOptions.options?.layout?.box_model?.margin?.top || tooltipContentDefaults.button.boxModel.margin.top,
        bottom: elementOptions.options?.layout?.box_model?.margin?.bottom || tooltipContentDefaults.button.boxModel.margin.bottom,
        left: elementOptions.options?.layout?.box_model?.margin?.left || tooltipContentDefaults.button.boxModel.margin.left,
        right: elementOptions.options?.layout?.box_model?.margin?.right || tooltipContentDefaults.button.boxModel.margin.right
      },
      padding: {
        top: elementOptions.options?.layout?.box_model?.padding?.top || tooltipContentDefaults.button.boxModel.padding.top,
        bottom: elementOptions.options?.layout?.box_model?.padding?.bottom || tooltipContentDefaults.button.boxModel.padding.bottom,
        left: elementOptions.options?.layout?.box_model?.padding?.left || tooltipContentDefaults.button.boxModel.padding.left,
        right: elementOptions.options?.layout?.box_model?.padding?.right || tooltipContentDefaults.button.boxModel.padding.right
      },
    }
  }

  if (newElement.newTab === 1) newElement.newTab = true
  if (newElement.newTab === 0) newElement.newTab = false

  return newElement
}
function parseLegacySquaresVideo(elementOptions) {
  let newElement = {
    type: 'Video',
    linkUrl: elementOptions.options?.video?.link_to || tooltipContentDefaults.video.linkUrl,
    src: {
      mp4: elementOptions.options?.video?.mp4_url || tooltipContentDefaults.video.src.mp4,
      ogv: elementOptions.options?.video?.ogv_url || tooltipContentDefaults.video.src.ogv,
      webm: elementOptions.options?.video?.webm_url || tooltipContentDefaults.video.src.webm,
    },
    autoplay: elementOptions.options?.video?.autoplay || tooltipContentDefaults.video.autoplay,
    loop: elementOptions.options?.video?.loop || tooltipContentDefaults.video.loop,
    controls: elementOptions.options?.video?.controls || tooltipContentDefaults.video.controls,
    other: {
      id: elementOptions.options?.general?.id || tooltipContentDefaults.video.other.id,
      classes: elementOptions.options?.general?.classes || tooltipContentDefaults.video.other.classes,
      css: elementOptions.options?.general?.css || tooltipContentDefaults.video.other.css,
    },
    boxModel: {
      width: 'auto',
      height: 'auto',
      margin: {
        top: elementOptions.options?.layout?.box_model?.margin?.top || tooltipContentDefaults.video.boxModel.margin.top,
        bottom: elementOptions.options?.layout?.box_model?.margin?.bottom || tooltipContentDefaults.video.boxModel.margin.bottom,
        left: elementOptions.options?.layout?.box_model?.margin?.left || tooltipContentDefaults.video.boxModel.margin.left,
        right: elementOptions.options?.layout?.box_model?.margin?.right || tooltipContentDefaults.video.boxModel.margin.right
      },
      padding: {
        top: elementOptions.options?.layout?.box_model?.padding?.top || tooltipContentDefaults.video.boxModel.padding.top,
        bottom: elementOptions.options?.layout?.box_model?.padding?.bottom || tooltipContentDefaults.video.boxModel.padding.bottom,
        left: elementOptions.options?.layout?.box_model?.padding?.left || tooltipContentDefaults.video.boxModel.padding.left,
        right: elementOptions.options?.layout?.box_model?.padding?.right || tooltipContentDefaults.video.boxModel.padding.right
      },
    }
  }

  return newElement
}
function parseLegacySquaresYouTube(elementOptions) {
  let width = tooltipContentDefaults.youtube.boxModel.width

  if (elementOptions.options?.youtube?.iframe_auto_width === 0) {
    width = elementOptions.options?.youtube?.iframe_width || tooltipContentDefaults.youtube.boxModel.width
  }

  let newElement = {
    type: 'YouTube',
    embedCode: elementOptions.options?.youtube?.embed_code || tooltipContentDefaults.youtube.embedCode,
    allowFullscreen: elementOptions.options?.youtube?.allow_fullscreen || tooltipContentDefaults.youtube.allowFullscreen,
    other: {
      id: '',
      classes: '',
      css: '',
    },
    style: {},
    boxModel: {
      width: width,
      height: elementOptions.options?.youtube?.iframe_height || tooltipContentDefaults.youtube.boxModel.height,
      margin: {
        top: elementOptions.options?.layout?.box_model?.margin?.top || tooltipContentDefaults.youtube.boxModel.margin.top,
        bottom: elementOptions.options?.layout?.box_model?.margin?.bottom || tooltipContentDefaults.youtube.boxModel.margin.bottom,
        left: elementOptions.options?.layout?.box_model?.margin?.left || tooltipContentDefaults.youtube.boxModel.margin.left,
        right: elementOptions.options?.layout?.box_model?.margin?.right || tooltipContentDefaults.youtube.boxModel.margin.right
      },
      padding: {
        top: elementOptions.options?.layout?.box_model?.padding?.top || tooltipContentDefaults.youtube.boxModel.padding.top,
        bottom: elementOptions.options?.layout?.box_model?.padding?.bottom || tooltipContentDefaults.youtube.boxModel.padding.bottom,
        left: elementOptions.options?.layout?.box_model?.padding?.left || tooltipContentDefaults.youtube.boxModel.padding.left,
        right: elementOptions.options?.layout?.box_model?.padding?.right || tooltipContentDefaults.youtube.boxModel.padding.right
      },
    }
  }

  if (newElement.allowFullscreen === 1) newElement.allowFullscreen = true
  if (newElement.allowFullscreen === 0) newElement.allowFullscreen = false

  return newElement
}