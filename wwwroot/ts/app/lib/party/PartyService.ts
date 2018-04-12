import { Injectable } from "@angular/core";
import { NGXLogger } from "ngx-logger";
import { HttpClient } from "@angular/common/http";
import { Page } from "../PageManager";
import { Observable } from "rxjs/Observable";
import { PartyModel } from "../../../domain/WebApi/PartyModel";

import "rxjs/add/operator/do";
import 'rxjs/add/operator/catch';
import {RoleType} from "../../../domain/Domain/RoleType";
import {MessageDisplayService} from "../MessageDisplayService";

/**
 * party management service.
 */
@Injectable()
export class PartyService {
	/**
     * initialise the party service.
     */
    constructor(
        private readonly messageService: MessageDisplayService,
        private readonly http: HttpClient,
        private readonly logger: NGXLogger) {
    }

    /**
     * load a page of parties.
     * @param page the page number.
     * @param roleType the role type
     * @param search the search text, if any.
     */
    loadPartyPage(page: number, roleType: RoleType, search: string = null): Observable<Page<PartyModel>> {
        const uri = roleType
            ? `api/party/list/role/${roleType}/${page}/${search || ""}`
            : `api/party/list/${page}/${search || ""}`;
        return this.http
            .get<Page<PartyModel>>(uri)
            .catch(_ => this.messageService.observeError(_));
    }

    /**
     * load up the party hints for fund managers.
     * @param hint the hint string.
     */
    loadFundManagerHints(hint: string): Observable<PartyModel[]> {
        this.logger.info(`loading party hints: ${hint}`);
        return this.http
            .get<PartyModel[]>(`api/party/hints/6/${hint}`);
    }

    /**
     * load up the party hints for property managers.
     * @param hint the hint string.
     */
    loadPropertyManagerHints(hint: string): Observable<PartyModel[]> {
        this.logger.info(`loading party hints: ${hint}`);
        return this.http
            .get<PartyModel[]>(`api/party/hints/5/${hint}`);
    }

	/**
	 * merge the supplied party model, creating a new party if the party already exists,
	 * and updating the party otherwise.
	 * Party is merged on the party id.
	 * @param party the party to merge into the database.
	 */
	mergeParty(party: PartyModel): Observable<PartyModel | any> {
		this.logger.info(`merging party: ${party.id}`);
		return this.http
			.post(`api/party/merge`, party);
	}

	/**
	 * merge the supplied party model, creating a new party if the party already exists,
	 * and updating the party otherwise.
	 * Party is merged on the party id.
	 * @param party the party to merge into the database.
	 */
	mergePartyAndDeleteRoles(party: PartyModel): Observable<PartyModel | any> {
		this.logger.info(`merging party: ${party.id}`);
		return this.http
			.post(`api/party/roles/merge`, party);
	}
}