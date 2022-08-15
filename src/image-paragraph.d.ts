import Widget from 'kenga/widget'
import Utils from 'kenga/utils'

export default class ImageParagraph extends Widget {
  text: string
  /**
   * An element (e.g. img) or uri to an icon.
   */
  icon: HTMLElement | string
  /**
   * Gap value in pixel between icon and text.
   */
  iconTextGap: number
  /**
   * Horizontal position of the text relative to the icon.
   */
  horizontalTextPosition: Utils.HorizontalPosition
  /**
   * Vertical position of the text relative to the icon.
   */
  verticalTextPosition: Utils.VerticalPosition
}
