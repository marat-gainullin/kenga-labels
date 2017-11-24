# Kenga labels
Kenga "image with text" widgets.

## Install
To install `kenga-labels` package to your project, type the following command:
`npm install kenga-labels --save`

## Using
The simple way to use a `Label` is to write something like `const l = new Label('Hello!');`
The label holds property 'icon', which can be assigned to any DOM element (typically 'IMG').

## Architecture
This package contains a base class for image with text widgets, - `ImagePagaraph`.
Such widgets are combinations of text and image. They hold property 'icon', which can be assigned to any DOM element.
Typically it is 'IMG' element. Image paragarph govens text placement against icon element. It can be placed to the 'left, 'right', 'center', 'top' and 'bottom'.
To get rid of literal contants in your code, you can use kenga constants `VerticalPosition.*` and `HorizontalPosition` from `kenga/utils` module.
