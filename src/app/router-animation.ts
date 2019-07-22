import {
	trigger,
	transition,
	style,
	query,
	group,
	animateChild,
	animate,
	keyframes,
} from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('Login => Registration', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
					width: '100%',
					height: '100%',
					opacity: 1
        })
      ]),
      query(':enter', [
        style({ left: '100%', opacity: 0 })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('600ms ease-out', style({ left: '-100%', opacity: 0}))
        ]),
        query(':enter', [
          animate('600ms ease-out', style({ left: '0%', opacity: 1}))
        ])
      ]),
      query(':enter', animateChild()),
		]),
		transition('Registration => Login', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
					width: '100%',
					height: '100%',
					opacity: 1
        })
      ]),
      query(':enter', [
        style({ left: '-100%', opacity: 0 })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('600ms ease-out', style({ left: '100%', opacity: 0 }))
        ]),
        query(':enter', [
          animate('600ms ease-out', style({ left: '0%', opacity: 1 }))
        ])
      ]),
      query(':enter', animateChild()),
    ])
	]);
	
	