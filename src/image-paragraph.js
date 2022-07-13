import Ui from 'kenga/utils';
import Widget from 'kenga/widget';

function iconByString(aValue) {
    const img = document.createElement('img');
    img.src = aValue;
    return img;
}

class ImageParagraph extends Widget {
    constructor(aElement, text, image, iconTextGap) {
        if (arguments.length < 4)
            iconTextGap = '4px';
        if (arguments.length < 3)
            image = null;
        if (arguments.length < 2)
            text = '';

        super(aElement);
        const self = this;

        if (typeof image === 'string') {
          image = iconByString(image)
          image.classList.add('p-image');
        }

        let horizontalTextPosition = Ui.HorizontalPosition.RIGHT;
        let verticalTextPosition = Ui.VerticalPosition.CENTER;

        const paragraph = document.createElement('p');
        paragraph.classList.add('p-paragraph');
        this.element.appendChild(paragraph);

        this.element.classList.add('p-image-paragraph');

        function applyPosition() {
            self.element.classList.remove('p-image-paragraph-column');
            self.element.classList.remove('p-image-paragraph-row');
            self.element.classList.remove('p-image-paragraph-row-top');
            self.element.classList.remove('p-image-paragraph-row-bottom');
            if (image) {
                image.style.marginLeft = '';
                image.style.marginRight = '';
                image.style.marginTop = '';
                image.style.marginBottom = '';
            }
            if (horizontalTextPosition === Ui.HorizontalPosition.CENTER) {
                self.element.classList.add('p-image-paragraph-column');
                if (verticalTextPosition === Ui.VerticalPosition.TOP) {
                    if (image) {
                        self.element.insertBefore(paragraph, image);
                        if (iconTextGap && text)
                            image.style.marginTop = iconTextGap;
                    }
                } else if (verticalTextPosition === Ui.VerticalPosition.BOTTOM || verticalTextPosition === Ui.VerticalPosition.CENTER) {
                    if (image) {
                        self.element.insertBefore(image, paragraph);
                        if (iconTextGap && text)
                            image.style.marginBottom = iconTextGap;
                    }
                } // else // value of 'verticalTextPosition' is unknown
            } else {
                self.element.classList.add('p-image-paragraph-row');
                if (horizontalTextPosition === Ui.HorizontalPosition.LEFT) {
                    if (image) {
                        self.element.insertBefore(paragraph, image);
                        if (iconTextGap && text)
                            image.style.marginLeft = iconTextGap;
                    }
                } else if (horizontalTextPosition === Ui.HorizontalPosition.RIGHT) {
                    if (image) {
                        self.element.insertBefore(image, paragraph);
                        if (iconTextGap && text)
                            image.style.marginRight = iconTextGap;
                    }
                } // else // value of 'horizontalTextPosition' is unknown
                if (verticalTextPosition === Ui.VerticalPosition.TOP) {
                    self.element.classList.add('p-image-paragraph-row-top');
                } else if (verticalTextPosition === Ui.VerticalPosition.BOTTOM) {
                    self.element.classList.add('p-image-paragraph-row-bottom');
                } // else // value of 'verticalTextPosition' is unknown
            }
        }

        function applyText() {
            paragraph.innerText = text != null ? text : ''; // Some browsers treat null here as value to be converted to string as 'null'. Mobile Edge, for example.
        }

        applyPosition();
        applyText();

        Object.defineProperty(this, 'icon', {
            get: function () {
                return image;
            },
            set: function (aValue) {
                if (image !== aValue) {
                    if (image) {
                        self.element.removeChild(image);
                        image.classList.remove('p-image');
                    }
                    image = typeof aValue === 'string' ? iconByString(aValue) : aValue;
                    if (image) {
                        image.classList.add('p-image');
                        self.element.appendChild(image);
                        applyPosition();
                    }
                }
            }
        });
        Object.defineProperty(this, 'text', {
            get: function () {
                return text;
            },
            set: function (aValue) {
                if (text !== aValue) {
                    text = aValue;
                    applyText();
                }
            }
        });
        Object.defineProperty(this, 'iconTextGap', {
            get: function () {
                return iconTextGap;
            },
            set: function (aValue) {
                iconTextGap = typeof aValue === 'number' ? `${aValue}px` : aValue;
                applyPosition();
            }
        });
        /**
         * Horizontal position of the text relative to the icon.
         */
        Object.defineProperty(this, 'horizontalTextPosition', {
            get: function () {
                return horizontalTextPosition;
            },
            set: function (aValue) {
                if (horizontalTextPosition !== aValue) {
                    horizontalTextPosition = aValue;
                    applyPosition();
                }
            }
        });

        /**
         * Vertical position of the text relative to the icon.
         */
        Object.defineProperty(this, 'verticalTextPosition', {
            get: function () {
                return verticalTextPosition;
            },
            set: function (aValue) {
                if (verticalTextPosition !== aValue) {
                    verticalTextPosition = aValue;
                    applyPosition();
                }
            }
        });
    }
}

export default ImageParagraph;
