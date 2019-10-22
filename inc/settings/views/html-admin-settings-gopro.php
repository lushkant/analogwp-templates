<?php
/**
 * Admin View: Go Pro Tab Settings
 *
 * @package Analog
 * @since 1.3.8
 */

namespace Analog\Settings\views;
?>

<div class="gopro-content">
	<h1 class="tab-heading"><?php _e( 'Access an interconnected library of Template Kits, blocks and additional design control with Style kits Pro.', 'ang' ); ?></h1>
	<ul>
		<li><?php _e( 'Template Kits with theme builder templates.', 'ang' ); ?></li>
		<li><?php _e( 'Blocks Library.', 'ang' ); ?></li>
		<li><?php _e( 'Global design control.', 'ang' ); ?></li>
		<li><?php _e( 'Advanced Style Kit control.', 'ang' ); ?></li>
	</ul>
	<a href="<?php echo esc_url( 'https://analogwp.com/style-kits-pro' ); ?>" class="ang-button" target="_blank"><?php _e( 'Explore Style Kits Pro', 'ang' ); ?></a>
	<img src="<?php echo esc_url( ANG_PLUGIN_URL . 'assets/img/gopro_frames.png' ); ?>" alt="">
</div>
