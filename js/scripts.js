WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function() {
	// Main slider
	let mainSlider = document.querySelector('.main_slider .swiper')

	if (mainSlider) {
		new Swiper('.main_slider .swiper', {
			loop: true,
			speed: 750,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			lazy: true,
			on: {
				init: swiper => {
					setTimeout(() => $(swiper.el).find('.count .total').text(swiper.snapGrid.length))
				},
				activeIndexChange: swiper => {
					setTimeout(() => $(swiper.el).find('.count .current').text((swiper.realIndex + 1)))
				}
			}
		})
	}


	// Video gallery
	const videoGallerySliders = [],
		videoGallery = document.querySelectorAll('.video_gallery .swiper')

	videoGallery.forEach((el, i) => {
		el.classList.add('video_gallery_s' + i)

		let options = {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			lazy: true,
			lazyPreloadPrevNext: 1,
			loopAdditionalSlides: 1,
			breakpoints: {
				0: {
					spaceBetween: 20,
					slidesPerView: 1
				},
				480: {
					spaceBetween: 44,
					slidesPerView: 1
				},
				768: {
					spaceBetween: 44,
					slidesPerView: 2
				},
				1280: {
					spaceBetween: 60,
					slidesPerView: 2
				}
			}
		}

		videoGallerySliders.push(new Swiper('.video_gallery_s' + i, options))
	})


	// Photo gallery
	const photoGallerySliders = [],
		photoGallery = document.querySelectorAll('.photo_gallery .swiper')

	photoGallery.forEach((el, i) => {
		el.classList.add('photo_gallery_s' + i)

		let options = {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			lazy: true,
			lazyPreloadPrevNext: 1,
			loopAdditionalSlides: 1,
			slidesPerView: 'auto',
			breakpoints: {
				0: {
					spaceBetween: 20
				},
				480: {
					spaceBetween: 46
				},
				1280: {
					spaceBetween: 40
				}
			}
		}

		photoGallerySliders.push(new Swiper('.photo_gallery_s' + i, options))
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: 'Закрыть',
		NEXT: 'Следующий',
		PREV: 'Предыдущий',
		MODAL: 'Вы можете закрыть это модальное окно нажав клавишу ESC'
	}

	Fancybox.defaults.tpl = {
		closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg><use xlink:href="images/sprite.svg#ic_close"></use></svg></button>',

		main: `<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">
			<div class="fancybox__backdrop"></div>
			<div class="fancybox__carousel"></div>
			<div class="fancybox__footer"></div>
		</div>`,
	}


	// Modals
	$('.modal_btn').click(function(e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: document.getElementById(e.target.getAttribute('data-modal')),
			type: 'inline'
		}])
	})


	// Zoom images
	Fancybox.bind('.fancy_img', {
		Image: {
			zoom: false
		},
		Thumbs: {
			autoStart: false
		}
	})


	// Mob. menu
	$('.mob_header .mob_menu_btn, header .mob_close_btn, .overlay').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').toggleClass('active')
		$('body').toggleClass('lock')
		$('header').toggleClass('show')

		$('.mob_header .mob_menu_btn').hasClass('active')
			? $('.overlay').fadeIn(300)
			: $('.overlay').fadeOut(300)
	})


	// 'Up' button
	$('.buttonUp .btn').click((e) => {
		e.preventDefault()

		document.getElementsByTagName('body')[0].scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		}, 1000)
	})


	// Phone input mask
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			IMask(el, {
				mask: '+{7} (000) 000-00-00',
				lazy: true
			})
		})
	}


	// Smooth scrolling to anchor
	const scrollBtns = document.querySelectorAll('.scroll_btn')

	if (scrollBtns) {
		scrollBtns.forEach(element => {
			element.addEventListener('click', e => {
				e.preventDefault()

				let anchor = element.getAttribute('data-anchor')

				document.getElementById(anchor).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				}, 1000)
			})
		})
	}


	// Product anchors
	const anchors = document.querySelectorAll('.anchor_block'),
		buttons = document.querySelectorAll('.anchors .btn'),
		roller = document.querySelector('.anchors .roller')

	function updateActiveAnchor() {
		let closestAnchor = null,
			closestDistance = Infinity

		anchors.forEach(anchor => {
			const rect = anchor.getBoundingClientRect(),
				distance = Math.abs(rect.top)

			// Если блок виден и ближе к верху экрана
			if (rect.top <= window.innerHeight && rect.bottom >= 0 && distance < closestDistance) {
				closestDistance = distance
				closestAnchor = anchor
			}
		})

		// Если найден ближайший блок
		if (closestAnchor) {
			const activeButton = document.querySelector(`.anchors .btn[data-anchor="${closestAnchor.id}"]`)

			// Убираем активность у всех кнопок
			buttons.forEach(button => button.classList.remove('active'))

			// Активируем кнопку для ближайшего блока
			if (activeButton) {
				activeButton.classList.add('active')
				roller.style.left = activeButton.offsetLeft + 'px'
				roller.style.width = activeButton.offsetWidth + 'px'
			}
		}
	}

	// Отслеживаем прокрутку страницы
	window.addEventListener('scroll', updateActiveAnchor)

	// Вызываем функцию при загрузке страницы, чтобы установить начальное состояние
	window.addEventListener('load', updateActiveAnchor)


	// Categories
	$('.categories .mob_btn').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active')
		$('.categories .data').toggleClass('show')
	})


	if (is_touch_device()) {
		const subMenus = document.querySelectorAll('header .menu .sub_menu')

		// Submenu on the touch screen
		$('header .menu_item > a.sub_link').addClass('touch_link')

		$('header .menu_item > a.sub_link').click(function (e) {
			const dropdown = $(this).next()

			if (dropdown.css('visibility') === 'hidden') {
				e.preventDefault()

				subMenus.forEach(el => el.classList.remove('show'))
				dropdown.addClass('show')

				BODY.style = 'cursor: pointer;'
			}
		})

		// Close the submenu when clicking outside it
		document.addEventListener('click', e => {
			if ($(e.target).closest('.menu').length === 0) {
				subMenus.forEach(el => el.classList.remove('show'))

				BODY.style = 'cursor: default;'
			}
		})
	}


	// Animation
	const animationBoxes = document.querySelectorAll('.animate')

	function scrollTracking(entries) {
		for (const entry of entries) {
			if (entry.target.classList.contains('animate')) {
				if (entry.intersectionRatio >= 0.2 && !entry.target.classList.contains('animated')) {
					entry.target.classList.add('animated')
				}
			}
		}
	}

	const animationObserver = new IntersectionObserver(scrollTracking, {
		threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
	})

	animationBoxes.forEach(element => animationObserver.observe(element))


	// Custom select - Nice select
	const selects = document.querySelectorAll('select:not(.skip)')

	if (selects) {
		selects.forEach(el => {
			NiceSelect.bind(el, {
				placeholder: el.getAttribute('data-placeholder')
			})

			el.addEventListener('change', () => el.classList.add('selected'))
		})
	}
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})



// Init map
function initMap() {
	ymaps.ready(() => {
		let myMap = new ymaps.Map('map', {
			center: [55.509987, 37.553747],
			zoom: 16,
			controls: []
		})

		let myPlacemark = new ymaps.Placemark([55.509987, 37.553747], {}, {
			iconLayout : 'default#image',
			iconImageHref : 'images/ic_map_marker.svg',
			iconImageSize : [91, 133],
			iconImageOffset : [-46, -133],
		})

		myMap.geoObjects.add(myPlacemark)

		// myMap.controls.add('zoomControl', {
		// 	position : {
		// 		right : '20px',
		// 		top   : '20px'
		// 	}
		// })

		myMap.behaviors.disable('scrollZoom')
	})
}