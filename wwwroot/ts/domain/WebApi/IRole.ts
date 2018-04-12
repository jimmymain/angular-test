import {RoleType} from "../Domain/RoleType";

export interface IRole {
	roleType: RoleType;
	expiryDate?: Date;
}