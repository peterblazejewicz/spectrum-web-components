## Description

An **sp-link** allow users to navigate to a different location. They can be presented in-line inside a paragraph or as a standalone text.

### Installation

```
npm install @spectrum-web-components/link

# or

yarn add @spectrum-web-components/link
```

## Example

<!-- prettier-ignore -->
```html
This is an <sp-link href="#">example link</sp-link>.
```

## Variants

### Standard links

Standard links can follow any of the character styles defined in Spectrum. Therefore, they can be displayed in various font sizes and weights. Standard links appear blue, in order to stand out from the rest of the text and be recognized as interactive.

<!-- prettier-ignore -->
```html
This is a <sp-link href="#">standard link</sp-link>.
```

### Quiet links

Quiet links appear with an underline and use the default text color. The subdued appearance is optimal for use in content lower in your application’s hierarchy such as links in a footer.

<!-- prettier-ignore -->
```html
This is a <sp-link quiet href="#">quiet link</sp-link>.
```

### Links over backgrounds

When a link needs to be placed on top of a colored background or a visual, use the over background link. This link uses a white opaque color instead of a blue color and stands out from the rest of the text with the addition of an underline.

```html
<div
    style="background-color: rgb(255, 160, 175); padding: 15px 20px; display: inline-block;"
>
    <p style="color: rgb(240, 240, 240);">
        This
        <sp-link over-background href="#">link</sp-link>
        is over a background.
    </p>
</div>
```

### Download attribute

The download attribute on an `html<a>` tag prompts a user to download a link as opposed to navigating to it. This attribute has
simply been carried forward to `html<sp-link>` to function the same.

While it functions this way without assigning a value, actually assigning the value allows custom naming of the download link in accordance
with normal `html<a>` [rules](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) defined by the browser.

<!-- prettier-ignore -->
```html
This is a <sp-link download="myfile.txt" href="#">download link</sp-link>.
```

## Accessibility

Links are accessible by default, rendered in HTML using the `<a>` element. The correct aria roles will automatically be applied.
