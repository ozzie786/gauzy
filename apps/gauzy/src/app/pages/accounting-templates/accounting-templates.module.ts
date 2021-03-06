import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	NbLayoutModule,
	NbCardModule,
	NbSelectModule,
	NbButtonModule
} from '@nebular/theme';
import { AceEditorModule } from 'ng2-ace-editor';
import { HeaderTitleModule } from '../../@shared/components/header-title/header-title.module';
import { TranslateModule } from '../../@shared/translate/translate.module';
import { ThemeModule } from '../../@theme/theme.module';
import { AccountingTemplatesComponent } from './accounting-templates.component';

@NgModule({
	imports: [
		NbLayoutModule,
		CommonModule,
		ThemeModule,
		NbCardModule,
		FormsModule,
		ReactiveFormsModule,
		NbSelectModule,
		TranslateModule,
		NbButtonModule,
		AceEditorModule,
		HeaderTitleModule
	],
	providers: [],
	entryComponents: [AccountingTemplatesComponent],
	declarations: [AccountingTemplatesComponent]
})
export class AccountingTemplatesModule {}
