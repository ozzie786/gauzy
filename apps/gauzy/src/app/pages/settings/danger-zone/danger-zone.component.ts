import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DangerZoneMutationComponent } from '../../../@shared/settings/danger-zone-mutation/danger-zone-mutation.component';
import { first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { UsersService } from '../../../@core/services';
import { Store } from '../../../@core/services/store.service';
import { Router } from '@angular/router';

@Component({
	selector: 'ga-danger-zone',
	templateUrl: './danger-zone.component.html',
	styleUrls: ['./danger-zone.component.scss']
})
export class DangerZoneComponent implements OnInit {
	private _ngDestroy$ = new Subject<void>();

	constructor(
		private translate: TranslateService,
		private dialogService: NbDialogService,
		private userService: UsersService,
		private store: Store,
		private toastrService: NbToastrService,
		private router: Router
	) {}

	async deleteAccount() {
		this.dialogService
			.open(DangerZoneMutationComponent, {
				context: {
					recordType: this.getTranslation(
						'NOTES.DANGER_ZONE.RECORD_TYPE'
					)
				}
			})
			.onClose.pipe(takeUntil(this._ngDestroy$))
			.subscribe(async (data) => {
				if (data) {
					try {
						await this.userService
							.getUserById(this.store.userId)
							.then((user) => {
								this.userService.delete(
									this.store.userId,
									data.user
								);

								this.toastrService.primary(
									this.getTranslation(
										'NOTES.DANGER_ZONE.ACCOUNT_DELETED',
										{
											username:
												user.firstName +
												' ' +
												user.lastName
										}
									),
									this.getTranslation('TOASTR.TITLE.SUCCESS')
								);
							})
							.then(() => {
								setTimeout(() => {
									this.router.navigate(['/auth/register']);
								}, 2500);
							});
					} catch (error) {
						this.toastrService.danger(
							this.getTranslation(
								'NOTES.ORGANIZATIONS.DATA_ERROR',
								{
									error: error.error.message || error.message
								}
							),
							this.getTranslation('TOASTR.TITLE.ERROR')
						);
					}
				}
			});
	}

	ngOnInit() {}

	getTranslation(prefix: string, params?: Object) {
		let result = '';
		this.translate.get(prefix, params).subscribe((res) => {
			result = res;
		});
		return result;
	}

	ngOnDestroy() {
		clearTimeout();
		this._ngDestroy$.next();
		this._ngDestroy$.complete();
	}
}
