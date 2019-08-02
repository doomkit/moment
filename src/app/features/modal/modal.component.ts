import { Component, ViewChild, Input, ElementRef, Output, EventEmitter, OnInit, ComponentFactoryResolver, Type, Renderer2, AfterContentInit } from '@angular/core';
import { ModalDirective } from './modal.directive';
import { CreateIssueComponent } from './modal-views/create-issue/create-issue.component';
import { ModalType } from '../../core/enums/modal-type';
import { UpdateIssueComponent } from './modal-views/update-issue/update-issue.component';
import { Issue } from '../../core/models/issue';
import { WorkerViewComponent } from './modal-views/worker-view/worker-view.component';

@Component({
  selector: 'app-modal',
  template: `
		<div #container class="overlay">
			<div class="modal">
				<ng-template modal-host></ng-template>
			</div>
		</div>
  `,
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit, AfterContentInit {

	@Input() innerComponentType: ModalType;
	@Input() issue: Issue;
	@ViewChild(ModalDirective, { static: true }) modalHost: ModalDirective;
	@ViewChild('container', { static: true }) container: ElementRef;
	@Output() afterClose: EventEmitter<any> = new EventEmitter<any>();

	innerComponent: any;

	constructor(
		private componentFactoryResolver: ComponentFactoryResolver,
		private renderer: Renderer2
	) {}

	ngOnInit(): void {
		this.loadComponent();
	}

	ngAfterContentInit(): void {
		if (this.innerComponentType === ModalType.UPDATE || this.innerComponentType === ModalType.WORKER) {
			this.innerComponent.issue = this.issue;
		}
	}
	
	public closeModal(canceled: boolean) {
		this.container.nativeElement.style.animationName = 'fadeOut';
		this.container.nativeElement.addEventListener('animationend', () => {
					this.afterClose.emit(this.innerComponent.onClose(canceled));
			}, false);
	}

	loadComponent(): void {
		let viewContainerRef = this.modalHost.viewContainerRef;
		viewContainerRef.clear();
		const factory = this.componentFactoryResolver.resolveComponentFactory(this.modalTypeResolver(this.innerComponentType));
		let insertRes = this.modalHost.viewContainerRef.createComponent(factory);
		this.innerComponent = insertRes.instance;
		this.renderer.listen(this.innerComponent.closeButton.nativeElement, 'click', (event) => {
			this.closeModal(true);
		});
		this.renderer.listen(this.innerComponent.submitButton.nativeElement, 'click', (event) => {
			this.closeModal(false);
		})
	}

	private modalTypeResolver(type: ModalType): Type<{}> {
		switch(type) {
			case ModalType.CREATE: {
				return CreateIssueComponent;
			}
			case ModalType.UPDATE: {
				return UpdateIssueComponent;
			}
			case ModalType.WORKER: {
				return WorkerViewComponent;
			}
			default: {
				console.error('Unknown modal type!');
			}
		}
	}

}
