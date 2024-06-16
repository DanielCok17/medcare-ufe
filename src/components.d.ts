/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface MedcareHomescreen {
        "apiBase": string;
        "basePath": string;
    }
    interface MedcareMedicalRecords {
        "apiBase": string;
        "onNavigateHome": () => void;
    }
    interface MedcareRemoveAllergyRecords {
        "apiBase": string;
        "onNavigateHome": () => void;
    }
    interface MedcareUpdateLabResults {
        "apiBase": string;
        "onNavigateHome": () => void;
    }
    interface MedcareVaccinationRecord {
        "apiBase": string;
        "onNavigateHome": () => void;
    }
}
declare global {
    interface HTMLMedcareHomescreenElement extends Components.MedcareHomescreen, HTMLStencilElement {
    }
    var HTMLMedcareHomescreenElement: {
        prototype: HTMLMedcareHomescreenElement;
        new (): HTMLMedcareHomescreenElement;
    };
    interface HTMLMedcareMedicalRecordsElement extends Components.MedcareMedicalRecords, HTMLStencilElement {
    }
    var HTMLMedcareMedicalRecordsElement: {
        prototype: HTMLMedcareMedicalRecordsElement;
        new (): HTMLMedcareMedicalRecordsElement;
    };
    interface HTMLMedcareRemoveAllergyRecordsElement extends Components.MedcareRemoveAllergyRecords, HTMLStencilElement {
    }
    var HTMLMedcareRemoveAllergyRecordsElement: {
        prototype: HTMLMedcareRemoveAllergyRecordsElement;
        new (): HTMLMedcareRemoveAllergyRecordsElement;
    };
    interface HTMLMedcareUpdateLabResultsElement extends Components.MedcareUpdateLabResults, HTMLStencilElement {
    }
    var HTMLMedcareUpdateLabResultsElement: {
        prototype: HTMLMedcareUpdateLabResultsElement;
        new (): HTMLMedcareUpdateLabResultsElement;
    };
    interface HTMLMedcareVaccinationRecordElement extends Components.MedcareVaccinationRecord, HTMLStencilElement {
    }
    var HTMLMedcareVaccinationRecordElement: {
        prototype: HTMLMedcareVaccinationRecordElement;
        new (): HTMLMedcareVaccinationRecordElement;
    };
    interface HTMLElementTagNameMap {
        "medcare-homescreen": HTMLMedcareHomescreenElement;
        "medcare-medical-records": HTMLMedcareMedicalRecordsElement;
        "medcare-remove-allergy-records": HTMLMedcareRemoveAllergyRecordsElement;
        "medcare-update-lab-results": HTMLMedcareUpdateLabResultsElement;
        "medcare-vaccination-record": HTMLMedcareVaccinationRecordElement;
    }
}
declare namespace LocalJSX {
    interface MedcareHomescreen {
        "apiBase"?: string;
        "basePath"?: string;
    }
    interface MedcareMedicalRecords {
        "apiBase"?: string;
        "onNavigateHome"?: () => void;
    }
    interface MedcareRemoveAllergyRecords {
        "apiBase"?: string;
        "onNavigateHome"?: () => void;
    }
    interface MedcareUpdateLabResults {
        "apiBase"?: string;
        "onNavigateHome"?: () => void;
    }
    interface MedcareVaccinationRecord {
        "apiBase"?: string;
        "onNavigateHome"?: () => void;
    }
    interface IntrinsicElements {
        "medcare-homescreen": MedcareHomescreen;
        "medcare-medical-records": MedcareMedicalRecords;
        "medcare-remove-allergy-records": MedcareRemoveAllergyRecords;
        "medcare-update-lab-results": MedcareUpdateLabResults;
        "medcare-vaccination-record": MedcareVaccinationRecord;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "medcare-homescreen": LocalJSX.MedcareHomescreen & JSXBase.HTMLAttributes<HTMLMedcareHomescreenElement>;
            "medcare-medical-records": LocalJSX.MedcareMedicalRecords & JSXBase.HTMLAttributes<HTMLMedcareMedicalRecordsElement>;
            "medcare-remove-allergy-records": LocalJSX.MedcareRemoveAllergyRecords & JSXBase.HTMLAttributes<HTMLMedcareRemoveAllergyRecordsElement>;
            "medcare-update-lab-results": LocalJSX.MedcareUpdateLabResults & JSXBase.HTMLAttributes<HTMLMedcareUpdateLabResultsElement>;
            "medcare-vaccination-record": LocalJSX.MedcareVaccinationRecord & JSXBase.HTMLAttributes<HTMLMedcareVaccinationRecordElement>;
        }
    }
}
