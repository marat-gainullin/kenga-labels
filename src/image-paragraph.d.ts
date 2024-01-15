import Widget from 'kenga/widget'

export default class ImageParagraph extends Widget {
  text: string
  /**
   * An element (e.g. img) or uri to an icon.
   */
  icon: HTMLElement | string
  /**
   * Gap value in pixel between icon and text.
   */
  iconTextGap: number | string
  /**
   * Horizontal position of the text relative to the icon.
   */
  horizontalTextPosition: 'center' | 'left' | 'right'

  /**
   * Vertical position of the text relative to the icon.
   */
  verticalTextPosition: 'center' | 'top' | 'bottom'
}
