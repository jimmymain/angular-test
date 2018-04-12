import { Injectable } from "@angular/core";
import { IRole } from "../WebApi/IRole";

export enum RoleType {
    /**
     * a guest role.
     */
    Casual = 0,

    /**
     * a broker role.
     */
    Broker = 1,

    /**
     * an administrator
     */
    Administrator = 2,

    /**
     * the auctioneer role.
     */
    Auctioneer = 3,

    /**
     * the corporate role.
     */
    Corporate = 4,

    /**
     * the corporation is a property Manager.
     */
    PropertyManager = 5,

    /**
     * the corporation is a property fund.
     */
    FundManager = 6,

    /**
     * a data capturer
     */
    DataCapturer = 7,
}

/**
 * not sure there's a better way?
 * https://github.com/Microsoft/TypeScript/issues/3279
 */
@Injectable()
export class RoleTypeProvider {
    roleTypes = {
        Casual:
            {
                name: "Casual User",
                type: RoleType.Casual
            },
        Broker:
            {
                name: "Broker",
                type: RoleType.Broker
            },
        Administrator:
            {
                name: "Administrator",
                type: RoleType.Administrator
            },
        Auctioneer:
            {
                name: "Auctioneer",
                type: RoleType.Auctioneer
            },
        Corporate:
            {
                name: "Corporate User",
                type: RoleType.Corporate
            },
        PropertyManager:
            {
                name: "Property Manager",
                type: RoleType.PropertyManager
            },
        FundManager:
            {
                name: "Fund Manager",
                type: RoleType.FundManager
            },
        DataCapturer:
            {
                name: "Data Capturer",
                type: RoleType.DataCapturer
            }
    };
    roleKeys = Object.keys(this.roleTypes);
    roleName(role: IRole) {
		return this.roleTypes[RoleType[role.roleType]].name;
    }
}