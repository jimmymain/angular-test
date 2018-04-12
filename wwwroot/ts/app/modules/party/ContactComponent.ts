import { Component, OnInit, ViewChild } from "@angular/core";
import { NGXLogger } from "ngx-logger";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { PartyService } from "../../lib/party/PartyService";
import { MessageDisplayService } from "../../lib/MessageDisplayService";
import { PartyModel } from "../../../domain/WebApi/PartyModel";
import { IRole, IRole as IRole1 } from "../../../domain/WebApi/IRole";
import { ExpiryService } from "../../lib/ExpiryService";
import { RoleTypeProvider } from "../../../domain/Domain/RoleType";
import { ApplicationSettings } from "../../components/ApplicationSettings";

import * as _ from "lodash";
import 'rxjs/add/operator/catch';

@Component({
    templateUrl: `./ts/app/modules/party/ContactComponent.html`,
})
export class ContactComponent implements OnInit {
    form: FormGroup;
    contact: PartyModel;
    selectedRole: IRole;

    constructor(
        private readonly settings: ApplicationSettings,
        private readonly partyService: PartyService,
        private readonly expiryService: ExpiryService,
        private readonly roleTypeProvider: RoleTypeProvider,
        private readonly fb: FormBuilder,
        private readonly messageDisplayService: MessageDisplayService,
        private readonly logger: NGXLogger) {
    }

	/**
     * initialisation
     */
    ngOnInit() {
        this.form = this.fb.group({});
    }

	/**
	 * select the supplied role.
	 * @param role the role.
	 */
    roleSelected(role: IRole1) {
        this.selectedRole = null;
        setTimeout(() => this.selectedRole = role);
    }

	/**
	 * select the supplied contact
	 * @param contact the contact.
	 */
    selectParty(contact: PartyModel) {
        this.contact = contact;
        this.selectedRole = null;
    }

	/**
	 * save the party.
	 */
    save() {
        _.remove(this.contact.roles, role => this.expiryService.isEntityExpired(role));
        _.merge(this.contact, this.form.value.party);
        _.merge(
            this.contact.roles,
            _.cloneDeepWith(
                this.form.value.roles,
                (value, key) => (key === "percentSplit")
                    ? parseFloat(String(value).match(/[^% ]+/)[0])
                    : undefined));
        this.partyService
            .mergePartyAndDeleteRoles(this.contact)
            .catch(_ => this.messageDisplayService.observeError(_))
            .subscribe(() => {
                this.messageDisplayService.showSuccessMessage("update successful");
            });
    }

    /**
     * noop
     */
    submit() {
    }
}