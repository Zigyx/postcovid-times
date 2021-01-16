(function($) {

	var	$window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Dimensiones.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '381px',   '480px'  ],
		});

	// habilitacion de solucion de Internet explorer.
		if (browser.name == 'ie')
			$body.addClass('is-ie');

	// reproduccion de animaciones .
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Formulario.

		// envios sin entrada.
			$('form').on('click', '.submit', function(event) {

				// detener el envio.
					event.stopPropagation();
					event.preventDefault();

				// Envio de formulario.
					$(this).parents('form').submit();

			});

	// Sidebar.
		if ($sidebar.length > 0) {

			var $sidebar_a = $sidebar.find('a');

			$sidebar_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// determina enlaces externos
						if ($this.attr('href').charAt(0) != '#')
							return;

					// desactiva todos los links.
						$sidebar_a.removeClass('active');

					// activar o desactivar enlace .
						$this
							.addClass('active')
							.addClass('active-locked');

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// Determinar seccion para un enlace mas que nada largo.
						if ($section.length < 1)
							return;

					// función de scroll.
						$section.scrollex({
							mode: 'middle',
							top: '-20vh',
							bottom: '-20vh',
							initialize: function() {

								// Desactivar o activar esta sección.
									$section.addClass('inactive');

							},
							enter: function() {

								// Activa la sección o la desactiva.
									$section.removeClass('inactive');

								// cuando no hay links bloqueados se puede activar esta sección o desactivarla.
									if ($sidebar_a.filter('.active-locked').length == 0) {

										$sidebar_a.removeClass('active');
										$this.addClass('active');

									}

								// cuando el link bloqueado es de esta sección se puede desbloquear.
									else if ($this.hasClass('active-locked'))
										$this.removeClass('active-locked');

							}
						});

				});

		}

	// eventos scroll.
		$('.scrollex').scrollex({
			speed: 1000,
			offset: function() {

			
					if (breakpoints.active('<=large')
					&&	!breakpoints.active('<=xsmall')
					&&	$sidebar.length > 0)
						return $sidebar.height();

				return 0;

			}
		});

	// Contenedores.
		$('.contenedor > section')
			.scrollex({
				mode: 'middle',
				top: '-10vh',
				bottom: '-10vh',
				initialize: function() {

					
						$(this).addClass('inactive');

				},
				enter: function() {

					
						$(this).removeClass('inactive');

				}
			})
			.each(function() {

				var	$this = $(this),
					$image = $this.find('.imagen'),
					$img = $image.find('img'),
					x;

				// asignacion de imagenes.
					$image.css('background-image', 'url(' + $img.attr('src') + ')');

				// cambio de posicion del fondo.
					if (x = $img.data('position'))
						$image.css('background-position', x);

				// Hide <img>.
					$img.hide();

			});

	// caracteristicas.
		$('.features')
			.scrollex({
				mode: 'middle',
				top: '-20vh',
				bottom: '-20vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			});

})(jQuery);