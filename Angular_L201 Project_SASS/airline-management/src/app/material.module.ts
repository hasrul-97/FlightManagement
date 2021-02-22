import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { MatInputModule } from '@angular/material/input';
// import { MatListModule } from '@angular/material/list';
// import { MatTableModule } from '@angular/material/table';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatSelectModule } from '@angular/material/select';
// import { MatSortModule } from '@angular/material/sort';
// import { MatCardModule } from '@angular/material/card';
// import { MatRadioModule } from '@angular/material/radio';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { MatChipsModule } from '@angular/material/chips';
// import { MatExpansionModule } from '@angular/material/expansion';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatSliderModule } from '@angular/material/slider';
import {
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatCardModule,
    // MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatExpansionModule,
    MatDialogModule,
    MatCheckbox,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSliderModule,
    MatSpinner
} from '@angular/material';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule, MatIconModule, MatCardModule,
        MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,
        MatRadioModule, MatDatepickerModule, MatAutocompleteModule, MatChipsModule,
        MatExpansionModule, MatDialogModule, MatCheckboxModule, MatSliderModule, MatNativeDateModule, MatTableModule, MatProgressSpinnerModule, MatSortModule
    ],

    exports: [
        FormsModule, ReactiveFormsModule, MatIconModule, MatCardModule,
        MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,
        MatRadioModule, MatDatepickerModule, MatAutocompleteModule, MatChipsModule,
        MatExpansionModule, MatDialogModule, MatCheckboxModule, MatSliderModule, MatNativeDateModule, MatProgressSpinnerModule, MatTableModule, MatSortModule
    ]
})
export class MaterialModule { }
