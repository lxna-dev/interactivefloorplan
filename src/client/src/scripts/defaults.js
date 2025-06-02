import * as utilities from 'Editor/scripts/utilities'

export const artboardDefaults = {
  id: 'default-id', // UUID generated in the editor
  type: 'artboard',
  title: 'Artboard', // from the editor
  background_type: 'color', // none / color / image
  background_color: '#ffffff',
  image_url: '', // [optional] overrides config.image.url
  width: 848, // [optional] overrides config.general.width
  height: 480, // [optional] overrides config.general.height
  use_image_size: false, // [optional] overrides config.general.use_image_size
  children: [],
}

export const objectDefaults = {
  id: 'spot-0',
  title: 'Object',

  // spot, rect, oval, poly, text, svg, svg-single, group
  type: 'spot',

  x: 0,
  y: 0,
  width: 44,
  height: 44,
  static: false,
  children: [],
  parent_id: '',
  single_object: false,

  default_style: {
    opacity: 1,

    background_type: 'color', // color / image
    background_color: '#000000',
    background_opacity: 0.4,

    // border
    border_radius: 4,
    border_width: 0,
    border_style: 'solid',
    border_color: '#ffffff',
    border_opacity: 1,

    // background image
    background_image_url: '',
    background_image_opacity: 1,
    background_image_scale: 1, // 0-2
    background_image_offset_x: 0,
    background_image_offset_y: 0,

    // poly-specific
    stroke_color: '#ffffff',
    stroke_opacity: 0.75,
    stroke_width: 0,
    stroke_dasharray: '0',
    stroke_linecap: 'round',

    // spot-specific
    use_icon: true,
    icon_size: 44,
    icon_type: 'library', // or 'custom'
    icon_svg:
      '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>',
    icon_fill: '#000000',
    icon_url: '',
    icon_is_pin: true,
    icon_shadow: false,

    parent_filters: [],

    // SVG-specific
    filters: [],
  },
  mouseover_style: {
    opacity: 1,

    background_type: 'color', // color / image
    background_color: '#000000',
    background_opacity: 0.8,

    // background image
    background_image_url: '',
    background_image_opacity: 1,
    background_image_scale: 1,
    background_image_offset_x: 0,
    background_image_offset_y: 0,

    // border
    border_radius: 4,
    border_width: 0,
    border_style: 'solid',
    border_color: '#ffffff',
    border_opacity: 1,

    // poly-specific
    stroke_color: '#ffffff',
    stroke_opacity: 0.75,
    stroke_width: 0,
    stroke_dasharray: '0',
    stroke_linecap: 'round',

    // spot-specific
    icon_fill: '#000000',

    parent_filters: [],

    // SVG-specific
    filters: [],
  },
  tooltip: {
    enable_tooltip: true,
  },
  tooltip_style: {
    border_radius: 10,
    padding: 15,
    background_color: '#222222',
    background_opacity: 1,
    position: 'top',
    width: 225,
    auto_width: true,
    offset_x: 0,
    offset_y: 0,
  },
  tooltip_content: [],
  text: {
    text: 'Text',
    font_family: 'sans-serif',
    font_size: 16,
    font_weight: 400,
    text_color: '#000000',
    text_opacity: 1,
  },
  actions: {
    click: 'no-action', // no-action, run-script, follow-link, change-artboard
    link: '#',
    open_link_in_new_window: true,
    script: '',
    artboard: '',
  },

  // Image background
  x_image_background: -1,
  y_image_background: -1,
  width_image_background: 44,
  height_image_background: 44,

  // Poly
  points: [],

  // SVG
  svg: {
    html: '',
    tagName: '',
    properties: [],
    viewBox: '',
  },
}

export const tooltipContentDefaults = {
  paragraph: {
    type: 'Paragraph',
    text: '',
    other: {
      id: '',
      classes: '',
      css: '',
    },
    style: {
      fontFamily: 'sans-serif',
      fontSize: 14,
      lineHeight: 22,
      color: '#ffffff',
      textAlign: 'left',
    },
    boxModel: {
      width: 'auto',
      height: 'auto',
      margin: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
  },
  heading: {
    type: 'Heading',
    text: '',
    heading: 'h3',
    other: {
      id: '',
      classes: '',
      css: '',
    },
    style: {
      fontFamily: 'sans-serif',
      fontSize: 20.8,
      lineHeight: 'normal',
      color: '#ffffff',
      textAlign: 'left',
    },
    boxModel: {
      width: 'auto',
      height: 'auto',
      margin: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
  },
  button: {
    type: 'Button',
    text: 'Button',
    url: '#',
    script: '',
    newTab: false,
    other: {
      id: '',
      classes: '',
      css: '',
    },
    style: {
      backgroundColor: '#2196f3',
      borderRadius: 10,

      fontFamily: 'sans-serif',
      fontWeight: 700,
      fontSize: 14,
      lineHeight: 44,
      color: '#ffffff',

      display: 'inline-block',
    },
    boxModel: {
      width: 'auto',
      height: 44,
      margin: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
  },
  image: {
    type: 'Image',
    url: '',
    linkUrl: '',
    other: {
      id: '',
      classes: '',
      css: '',
    },
    boxModel: {
      width: 'auto',
      height: 'auto',
      margin: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
  },
  video: {
    type: 'Video',
    src: {
      webm: 'http://webcraftplugins.com/uploads/example_video.webm',
      mp4: 'http://webcraftplugins.com/uploads/example_video.mp4',
      ogv: 'http://webcraftplugins.com/uploads/example_video.ogv',
    },
    linkUrl: '',
    autoplay: false,
    loop: false,
    controls: true,
    other: {
      id: '',
      classes: '',
      css: '',
    },
    style: {},
    boxModel: {
      width: 'auto',
      height: 'auto',
      margin: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
  },
  youtube: {
    type: 'YouTube',
    embedCode:
      '<iframe width="100%" height="315" src="https://www.youtube.com/embed/6NC_ODHu5jg" frameborder="0" allowfullscreen></iframe>',
    allowFullscreen: false,
    other: {
      id: '',
      classes: '',
      css: '',
    },
    style: {},
    boxModel: {
      width: 'auto',
      height: 'auto',
      margin: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
  },
}

export const imageMapDefaults = {
  version: '6.0.34',
  id: 0,
  general: {
    name: 'Untitled',
    shortcode: '',
    responsive: true,
    ui_theme: 'light', // light, dark
  },
  fullscreen: {
    enable_fullscreen_mode: false,
    start_in_fullscreen_mode: false,
  },
  objectConfig: {
    pageload_animation: 'none', // none, grow, fade, fall-down, flash
    glowing_objects: false,
    glowing_objects_color: '#ffffff',
    glow_opacity: 0.5,
    stop_glowing_on_mouseover: true,
    scale_spots: true,
  },
  tooltips: {
    enable_tooltips: true,
    show_tooltips: 'mouseover', // mouseover, click
    sticky_tooltips: false,
    constrain_tooltips: true,
    tooltip_animation: 'none', // none, fade, grow
    fullscreen_tooltips: 'mobile-only', // none, mobile-only, always
    fullscreen_background: '#ffffff',
    fullscreen_background_opacity: 0.75,
  },
  zooming: {
    enable_zooming: false,
    max_zoom: 4,
    limit_max_zoom_to_image_size: false,
    enable_zoom_buttons: true,
    enable_navigator: true,
    hold_ctrl_to_zoom: true,
    zoom_on_object_click: false,
  },
  object_list: {
    enable_object_list: false,
    menu_style: 'default', // default, on-top, detached
    menu_position: 'left', // left/right
    enable_search: true,
    group_by_artboard: false,
    flat_hierarchy: true,
    show_groups: true,
    show_only_objects_from_active_artboard: false,
    hide_static_objects: true,
  },
  custom_code: {
    custom_css: '',
    custom_js: '',
    preview_custom_css: false,
  },
  defaults: {
    objectDefaults: utilities.deepExtend({}, objectDefaults),
  },
  artboards: [],
}
