(function () {
    CKEDITOR.plugins.add('tooltip', {
        requires: 'widget,dialog',
        icons: 'tooltip',
        init: function (editor) {

            CKEDITOR.dialog.add('tooltip', this.path + 'dialogs/tooltip.js');

            var pluginDirectory = this.path;
            editor.addContentsCss( pluginDirectory + 'css/tooltip.css' );

            var deleteCommand = new CKEDITOR.command( editor, {
                exec: function( editor ) {
                    var selection = editor.getSelection();
                    var selectedText = selection.getSelectedText();
                    var selectedElement = selection.getStartElement();
                    if (selectedElement) {
                        selectedElement.remove();
                    }
                    editor.insertText(selectedText);
                }
            } );

            editor.addCommand('tooltip', new CKEDITOR.dialogCommand('tooltip'));
            editor.addCommand('tooltipdelete', deleteCommand );

            editor.ui.addButton('tooltip', {
                label: 'Tooltip',
                command: 'tooltip',
                icon: this.path + 'icons/tooltip.png'
            });

            if ( editor.contextMenu ) {
                // Add the group.
                editor.addMenuGroup( 'tooltipGroup' );

                // Add the edit item
                editor.addMenuItem( 'tooltipItem', {
                    label: 'Edit Tooltip',
                    icon: this.path + 'icons/tooltip.png',
                    command: 'tooltip',
                    group: 'tooltipGroup'
                });

                // Add the delete item.
                editor.addMenuItem( 'tooltipDeleteItem', {
                    label: 'Delete Tooltip',
                    icon: this.path + 'icons/tooltip.png',
                    command: 'tooltipdelete',
                    group: 'tooltipGroup'
                });

                editor.contextMenu.addListener( function( element ) {
                    if ( element.getAscendant( 'span', true ) && element.$.className == 'js-tooltip' ) {
                        return { tooltipItem: CKEDITOR.TRISTATE_OFF, tooltipDeleteItem: CKEDITOR.TRISTATE_OFF };
                    }
                });
            }
        }
    });
})();
