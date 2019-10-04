<?php
/**
 * Analog Go Pro Promotional Tab.
 *
 * @package Analog/Admin
 */

namespace Analog\Settings;

defined( 'ABSPATH' ) || exit;

/**
 * GoPro.
 */
class GoPro extends Settings_Page {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->id    = 'gopro';
		$this->label = __( 'Go Pro', 'ang' );
		parent::__construct();

		add_action( 'ang_settings_' . $this->id, [ $this, 'get_pro' ] );
	}

	/**
	 * Get settings array.
	 *
	 * @return array
	 */
	public function get_settings() {
		$settings = apply_filters(
			'ang_gopro_settings',
			array()
		);

		return apply_filters( 'ang_get_settings_' . $this->id, $settings );
	}

	/**
	 * Get Pro Tab Data.
	 */
	public function get_pro() {
		include dirname( __FILE__ ) . '/views/html-admin-settings-gopro.php';
	}

	/**
	 * Output the settings.
	 */
	public function output() {
		$settings = $this->get_settings();

		Admin_Settings::output_fields( $settings );
	}

	/**
	 * Save settings.
	 */
	public function save() {
		$settings = $this->get_settings();

		Admin_Settings::save_fields( $settings );
	}
}

return new GoPro();
