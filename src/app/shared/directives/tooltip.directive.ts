import {
	Directive,
	HostListener,
	ElementRef,
	Input,
	Renderer2
} from '@angular/core';

@Directive({
	selector: '[tooltip]'
})
export class TooltipDirective {
	@Input('tooltip') tooltipTitle: string;
	tooltip: HTMLElement;

	constructor(private el: ElementRef, private renderer: Renderer2) {}

	@HostListener('mouseenter') onMouseEnter() {
		if (!this.tooltip) {
			this.show();
		}
	}
	@HostListener('mouseleave') onMouseLeave() {
		if (this.tooltip) {
			this.hide();
		}
	}

	private show() {
		this.create();
		this.setPosition();
		this.renderer.addClass(this.tooltip, 'ng-tooltip-show');
	}

	private hide() {
		this.renderer.removeClass(this.tooltip, 'ng-tooltip-show');
		window.setTimeout(() => {
			this.renderer.removeChild(document.body, this.tooltip);
			this.tooltip = null;
		}, 300);
	}

	private create() {
		this.tooltip = this.renderer.createElement('span');

		this.renderer.appendChild(
			this.tooltip,
			this.renderer.createText(this.tooltipTitle)
		);

		this.renderer.appendChild(document.body, this.tooltip);
		this.renderer.addClass(this.tooltip, 'ng-tooltip');
	}

	private setPosition() {
		const hostPos = this.el.nativeElement.getBoundingClientRect();
		const tooltipPos = this.tooltip.getBoundingClientRect();
		const scrollPos =
			window.pageYOffset ||
			document.documentElement.scrollTop ||
			document.body.scrollTop ||
			0;
		const offset = 10;
		const top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
		const left = hostPos.right + offset;
		this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
		this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
	}
}
