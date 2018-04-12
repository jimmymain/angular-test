import { Injectable } from "@angular/core";
import * as _ from "lodash";

/**
 * an error handling service that set(s)
 * errors on an angular 2 form coordinator, or on a json instance.
 */
@Injectable()
export class ExpiryService 
{
	/**
     * return true if the entity is expired.
     * @param unit the entity.
     */
	isEntityExpired(entity: { expiryDate?: Date }) {
		const expired = entity.expiryDate !== null && (new Date(entity.expiryDate) < new Date());
		return expired;
	}

    /**
     * remove the supplied entity (it is marked expired)
     * @param entity the entity to remove.
     */
	removeEntity(entity: { expiryDate?: Date }) {
        if (this.isEntityExpired(entity)) {
            entity.expiryDate = null;
        } else {
            const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
            entity.expiryDate = yesterday;
        }
    }
}