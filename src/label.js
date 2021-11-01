import ImageParagraph from './image-paragraph';

class Label extends ImageParagraph {
    constructor(text, icon, iconTextGap) {
        if (arguments.length < 3)
            iconTextGap = '4px';
        if (arguments.length < 2)
            icon = null;
        if (arguments.length < 1)
            text = '';
        super(document.createElement('div'), text, icon, iconTextGap);
        const self = this;
        this.opaque = false;
    }
}

export default Label;