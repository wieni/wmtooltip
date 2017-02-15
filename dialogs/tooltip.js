CKEDITOR.dialog.add('tooltip', function (editor) {
    return {
        title: 'Tooltip Properties',
        minWidth: 400,
        minHeight: 200,
        resizable: true,
        contents: [
            {
                id: 'tab-tooltip',
                elements: [
                    {
                        type: 'text',
                        id: 'text',
                        label: 'Text',
                        validate: CKEDITOR.dialog.validate.notEmpty("The text cannot be empty."),

                        setup: function (element) {
                            this.setValue(element.getText());
                        },

                        commit: function (element) {
                            console.log(element);
                            element.setText(this.getValue());
                        }
                    },
                    {
                        type: 'text',
                        id: 'tooltip',
                        label: 'Tooltip Text',
                        validate: CKEDITOR.dialog.validate.notEmpty("The tooltip text cannot be empty."),

                        setup: function (element) {
                            this.setValue(element.getAttribute('data-tooltip'));
                        },

                        commit: function (element) {
                            element.setAttribute('data-tooltip', this.getValue());
                        }
                    }
                ],
            }
        ],
        onShow: function () {
            var selection = editor.getSelection();
            var element = selection.getStartElement();

            // Assume insert.
            var insertMode = true;
            // Get the class list.
            var classList = element.$.classList;

            // Loop the classes.
            for (var i = 0; i < classList.length; i++) {
                // Are we in a fucking js-tooltip?
                if (classList[i] == "js-tooltip") {
                    // Oh HELL NO!
                    insertMode = false;
                }
            }

            // What do we do now.
            if (insertMode) {
                // Make a new element.
                var newelement = editor.document.createElement('span');
                newelement.$.className = 'js-tooltip';
                // replace.
                this.element = newelement;
                this.insertMode = true;
                this.setValueOf('tab-tooltip', 'text', editor.getSelection().getSelectedText().toString());
            } else {
                // Old Dogs.
                this.insertMode = false;
                this.element = element;
                this.setupContent(this.element);
            }
        },
        onOk: function () {
            var dialog = this;
            var tooltip = this.element;
            this.commitContent(tooltip);

            if (this.insertMode) {
                editor.insertElement(tooltip);
            }
        }
    }
});
