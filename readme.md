# WM Tooltip

Small ckeditor plugin for Drupal 8 that will add widget button to
create and manage tooltips in HTML wysiwygs.

## Caveat

Be sure to add `<span data-text data-link class="">` ... to the allowed HTML of your text format in Drupal.

## What will this do?

Select a word in your html, click the tooltip button, fill in the fields, ok.

The result will be that the selected text is now wrapped in a "span" with class="tooltip" and a number of data attribtues.

Your Javascript developer should be able to handle it from there.
