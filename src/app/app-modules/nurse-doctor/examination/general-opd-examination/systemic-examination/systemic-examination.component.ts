/* 
* AMRIT – Accessible Medical Records via Integrated Technology 
* Integrated EHR (Electronic Health Records) Solution 
*
* Copyright (C) "Piramal Swasthya Management and Research Institute" 
*
* This file is part of AMRIT.
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see https://www.gnu.org/licenses/.
*/


import { Component, OnInit, Input } from '@angular/core';
import { GeneralUtils } from '../../../shared/utility/general-utility';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SetLanguageComponent } from 'app/app-modules/core/components/set-language.component';
import { HttpServiceService } from 'app/app-modules/core/services/http-service.service';

@Component({
  selector: 'nurse-systemic-examination',
  templateUrl: './systemic-examination.component.html',
  styleUrls: ['./systemic-examination.component.css']
})
export class SystemicExaminationComponent implements OnInit {

  generalUtils = new GeneralUtils(this.fb);

  @Input('systemicExaminationForm')
  systemicExaminationForm: FormGroup;

  @Input('visitCategory')
  visitCategory: string;

  displayANC: Boolean;
  displayGeneral: Boolean;
  languageComponent: SetLanguageComponent;
  
  currentLanguageSet: any;

  constructor(private fb: FormBuilder,
    private httpServiceService: HttpServiceService) { }

  ngOnInit() {
    this.displayANC = false;
    this.displayGeneral = false;
    this.fetchLanguageResponse();

    if (this.visitCategory == 'ANC') {
      this.systemicExaminationForm.addControl('obstetricExaminationForANCForm', this.generalUtils.createObstetricExaminationForANCForm());
      this.displayANC = true;
    } else if (this.visitCategory == 'General OPD' || this.visitCategory == 'PNC') {
      this.displayGeneral = true;
    }
  }

  ngOnChanges() {
    this.displayANC = this.visitCategory == 'ANC' ? true : false;
    if (this.displayANC) {
      this.systemicExaminationForm.addControl('obstetricExaminationForANCForm', this.generalUtils.createObstetricExaminationForANCForm());
    } else if (!this.displayANC) {
      this.systemicExaminationForm.removeControl('obstetricExaminationForANCForm');
      if (this.visitCategory == 'General OPD' || this.visitCategory == 'PNC') {
        this.displayGeneral = true;
      }
    }
  }


   //BU40088124 12/10/2021 Integrating Multilingual Functionality --Start--
   ngDoCheck(){
    this.fetchLanguageResponse();
  }

  fetchLanguageResponse() {
    this.languageComponent = new SetLanguageComponent(this.httpServiceService);
    this.languageComponent.setLanguage();
    this.currentLanguageSet = this.languageComponent.currentLanguageObject; 
  }
  //--End--
}
