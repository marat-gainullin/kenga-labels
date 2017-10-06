/* global expect */
/* global NaN */
import '../src/layout.css';
import '../src/theme.css';

import Label from '../src/label';
import Ui from 'kenga/utils';
import Font from 'kenga/font';
import Color from 'kenga/color';
import Cursor from 'kenga/cursor';
import Resource from 'septima-remote/resource';

function expectValue(obj, prop, value) {
    obj[prop] = value;
    expect(obj[prop]).toEqual(value);
}

function expectWidget(widget, Font, Color, Cursor) {
    expect('name' in widget).toBeTruthy();
    expectValue(widget, 'name', 'widgetName');
    expect('element' in widget).toBeTruthy();
    expect('parent' in widget).toBeTruthy();
    expectValue(widget, 'parent', new widget.constructor());
    expectValue(widget, 'parent', null);
    expect('left' in widget).toBeTruthy();
    expectValue(widget, 'left', 30);
    expect('width' in widget).toBeTruthy();
    expectValue(widget, 'width', 50);
    expect('top' in widget).toBeTruthy();
    expectValue(widget, 'top', 57);
    expect('height' in widget).toBeTruthy();
    expectValue(widget, 'height', 80);
    expect('enabled' in widget).toBeTruthy();
    expectValue(widget, 'enabled', true);
    expectValue(widget, 'enabled', false);
    expect('visible' in widget).toBeTruthy();
    expectValue(widget, 'visible', true);
    expectValue(widget, 'visible', false);
    expect('opaque' in widget).toBeTruthy();
    expectValue(widget, 'opaque', true);
    expectValue(widget, 'opaque', false);
    expect('cursor' in widget).toBeTruthy();
    expectValue(widget, 'cursor', Cursor.WAIT);
    expect('background' in widget).toBeTruthy();
    expectValue(widget, 'background', new Color('#fcfcfc'));
    expect('foreground' in widget).toBeTruthy();
    expectValue(widget, 'foreground', new Color(12, 45, 78, 35));
    expect('error' in widget).toBeTruthy();
    expectValue(widget, 'error', 'sample validation message');
    widget.error = null;
    expect('contextMenu' in widget).toBeTruthy();
    expectValue(widget, 'contextMenu', new widget.constructor());
    expect('toolTipText' in widget).toBeTruthy();
    expectValue(widget, 'toolTipText', ' sample tooltip');
    expect('focusable' in widget).toBeTruthy();
    expectValue(widget, 'focusable', true);
    expectValue(widget, 'focusable', false);
    expect('font' in widget).toBeDefined();
    expectValue(widget, 'font', new Font('Arial', Font.Style.ITALIC, 14));
    expect(widget.focus).toBeDefined();
    expect(typeof widget.focus).toEqual('function');
    widget.focus();

    expect('onShown' in widget).toBeTruthy();
    expectValue(widget, 'onShown', function () {});
    expect('onHidden' in widget).toBeTruthy();
    expectValue(widget, 'onHidden', function () {});
    expect('onMouseDragged' in widget).toBeTruthy();
    expectValue(widget, 'onMouseDragged', function () {});
    expect('onMouseReleased' in widget).toBeTruthy();
    expectValue(widget, 'onMouseReleased', function () {});
    expect('onFocusLost' in widget).toBeTruthy();
    expectValue(widget, 'onFocusLost', function () {});
    expect('onMousePressed' in widget).toBeTruthy();
    expectValue(widget, 'onMousePressed', function () {});
    expect('onMouseEntered' in widget).toBeTruthy();
    expectValue(widget, 'onMouseEntered', function () {});
    expect('onMouseMoved' in widget).toBeTruthy();
    expectValue(widget, 'onMouseMoved', function () {});
    expect('onActionPerformed' in widget).toBeTruthy();
    expectValue(widget, 'onActionPerformed', function () {});
    expect('onKeyReleased' in widget).toBeTruthy();
    expectValue(widget, 'onKeyReleased', function () {});
    expect('onKeyTyped' in widget).toBeTruthy();
    expectValue(widget, 'onKeyTyped', function () {});
    expect('onMouseWheelMoved' in widget).toBeTruthy();
    expectValue(widget, 'onMouseWheelMoved', function () {});
    expect('onFocusGained' in widget).toBeTruthy();
    expectValue(widget, 'onFocusGained', function () {});
    expect('onMouseClicked' in widget).toBeTruthy();
    expectValue(widget, 'onMouseClicked', function () {});
    expect('onMouseExited' in widget).toBeTruthy();
    expectValue(widget, 'onMouseExited', function () {});
    expect('onKeyPressed' in widget).toBeTruthy();
    expectValue(widget, 'onKeyPressed', function () {});
}

describe('Labels Api', () => {
    function expectImageParagraph(w, Ui) {
        const h = [Ui.HorizontalPosition.LEFT, Ui.HorizontalPosition.CENTER, Ui.HorizontalPosition.RIGHT];
        const v = [Ui.VerticalPosition.TOP, Ui.VerticalPosition.CENTER, Ui.VerticalPosition.BOTTOM];
        h.forEach(hi => {
            w.horizontalTextPosition = hi;
            expect(w.horizontalTextPosition).toEqual(hi);
            v.forEach(vi => {
                w.verticalTextPosition = vi;
                expect(w.verticalTextPosition).toEqual(vi);

            });
        });
    }

    it('Label.Structure', done => {
        const label1 = new Label('txt', null, 45);
        expectImageParagraph(label1, Ui);
        expect(label1.text).toEqual('txt');
        expect(label1.icon).toBeNull();
        expect(label1.iconTextGap).toEqual(45);
        const label2 = new Label('txt', null);
        expectImageParagraph(label2, Ui);
        expect(label2.text).toEqual('txt');
        expect(label2.icon).toBeNull();
        expect(label2.iconTextGap).toEqual(4);
        const label3 = new Label('txt');
        expectImageParagraph(label3, Ui);
        expect(label3.text).toEqual('txt');
        expect(label3.icon).toBeNull();
        expect(label3.iconTextGap).toEqual(4);
        const label4 = new Label();
        expectImageParagraph(label4, Ui);
        expectWidget(label4, Font, Color, Cursor);
        label4.text = 'Sample label';
        expect(label4.iconTextGap).toEqual(4);
        Resource.Icon.load('base/assets/binary-content.png', loaded => {
            label4.icon = loaded;
            done();
        }, e => {
            done.fail(e);
        });
    });
    it('Label.Markup', done => {
        const label = new Label();
        document.body.appendChild(label.element);
        label.text = 'Sample label';
        expect(label.iconTextGap).toEqual(4);
        Resource.Icon.load('base/assets/binary-content.png', loaded => {
            label.icon = loaded;
            // defaults
            // right text
            expect(label.horizontalTextPosition).toEqual(Ui.HorizontalPosition.RIGHT);
            expect(label.verticalTextPosition).toEqual(Ui.VerticalPosition.CENTER);
            ((() => {
                const image = label.element.firstElementChild;
                const paragraph = label.element.lastElementChild;
                expect(image.offsetLeft).toEqual(0);
                expect(paragraph.offsetLeft).toEqual(16 + 4);
            })());
            // top and bottom
            label.verticalTextPosition = Ui.VerticalPosition.BOTTOM;
            label.verticalTextPosition = Ui.VerticalPosition.TOP;
            // left text
            label.horizontalTextPosition = Ui.HorizontalPosition.LEFT;
            ((() => {
                const image = label.element.lastElementChild;
                const paragraph = label.element.firstElementChild;
                expect(paragraph.offsetLeft).toEqual(0);
                expect(image.offsetLeft).toEqual(paragraph.offsetWidth + 4);
            })());
            // top and bottom
            label.verticalTextPosition = Ui.VerticalPosition.BOTTOM;
            label.verticalTextPosition = Ui.VerticalPosition.TOP;

            // center text
            label.horizontalTextPosition = Ui.HorizontalPosition.CENTER;

            // top and bottom
            label.verticalTextPosition = Ui.VerticalPosition.BOTTOM;
            ((() => {
                const image = label.element.firstElementChild;
                const paragraph = label.element.lastElementChild;
                expect(image.offsetTop).toEqual(0);
                expect(paragraph.offsetTop).toEqual(16 + 4);
            })());
            label.verticalTextPosition = Ui.VerticalPosition.TOP;
            ((() => {
                const image = label.element.lastElementChild;
                const paragraph = label.element.firstElementChild;
                expect(image.offsetTop).toBeGreaterThan(paragraph.offsetTop);
            })());
            // center center
            label.verticalTextPosition = Ui.VerticalPosition.CENTER;

            document.body.removeChild(label.element);
            done();
        }, e => {
            done.fail(e);
        });
    });
});
