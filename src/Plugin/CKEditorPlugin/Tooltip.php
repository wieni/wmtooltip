<?php
/**
* @file
* Definition of \Drupal\wmtooltip\Plugin\CKEditorPlugin\Tooltip.
*/

namespace Drupal\wmtooltip\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "Tooltip Button" plugin.
 *
 * @CKEditorPlugin(
 *   id = "tooltip",
 *   label = @Translation("Tooltip")
 * )
 */
class Tooltip extends CKEditorPluginBase {

    /**
     * Implements \Drupal\ckeditor\Plugin\CKEditorPluginInterface::isInternal().
     */
    public function isInternal() {
        return FALSE;
    }

    /**
     * Returns the buttons that this plugin provides, along with metadata.
     *
     * The metadata is used by the CKEditor module to generate a visual CKEditor
     * toolbar builder UI.
     *
     * @return array
     *   An array of buttons that are provided by this plugin. This will
     *   only be used in the administrative section for assembling the toolbar.
     *   Each button should by keyed by its CKEditor button name, and should
     *   contain an array of button properties, including:
     *   - label: A human-readable, translated button name.
     *   - image: An image for the button to be used in the toolbar.
     *   - image_rtl: If the image needs to have a right-to-left version, specify
     *     an alternative file that will be used in RTL editors.
     *   - image_alternative: If this button does not render as an image, specify
     *     an HTML string representing the contents of this button.
     *   - image_alternative_rtl: Similar to image_alternative, but a
     *     right-to-left version.
     *   - attributes: An array of HTML attributes which should be added to this
     *     button when rendering the button in the administrative section for
     *     assembling the toolbar.
     *   - multiple: Boolean value indicating if this button may be added multiple
     *     times to the toolbar. This typically is only applicable for dividers
     *     and group indicators.
     */
    public function getButtons()
    {
        return [
          'tooltip' => [
            'label' => t('Tooltip'),
            'image' => drupal_get_path('module', 'wmtooltip') . '/icons/tooltip.png'
          ]
        ];
    }

    /**
     * Returns the Drupal root-relative file path to the plugin JavaScript file.
     *
     * Note: this does not use a Drupal library because this uses CKEditor's API,
     * see http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.resourceManager.html#addExternal.
     *
     * @return string|false
     *   The Drupal root-relative path to the file, FALSE if an internal plugin.
     */
    public function getFile()
    {
        return drupal_get_path('module', 'wmtooltip') . '/tooltip.plugin.js';
    }

    /**
     * Returns the additions to CKEDITOR.config for a specific CKEditor instance.
     *
     * The editor's settings can be retrieved via $editor->getSettings(), but be
     * aware that it may not yet contain plugin-specific settings, because the
     * user may not yet have configured the form.
     * If there are plugin-specific settings (verify with isset()), they can be
     * found at
     * @code
     * $settings = $editor->getSettings();
     * $plugin_specific_settings = $settings['plugins'][$plugin_id];
     * @endcode
     *
     * @param \Drupal\editor\Entity\Editor $editor
     *   A configured text editor object.
     * @return array
     *   A keyed array, whose keys will end up as keys under CKEDITOR.config.
     */
    public function getConfig(Editor $editor)
    {
        return [];
    }
}
