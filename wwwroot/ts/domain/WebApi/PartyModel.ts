import { SubscriptionModel } from "./SubscriptionModel";
import { BannerModel } from "./BannerModel";
import { PartyType } from "../Domain/PartyType";
// PartyModel

/**
 * the party details.  
 */
export class PartyModel
{
    /**
     * Gets or sets the id.  
     */
    id : number;

    /**
     * Gets or sets the identifier for the party.  
     */
    guid : string;

    /**
     * Gets or sets the display name.  
     */
    displayName : string;

    /**
     * Gets or sets the name.  
     */
    name : string;

    /**
     * Gets or sets the given name.  
     */
    givenName : string;

    /**
     * Gets or sets the surname.  
     */
    surname : string;

    /**
     * Gets or sets the PhoneNumber.  
     */
    landline : string;

    /**
     * Gets or sets the mobile.  
     */
    mobile : string;

    /**
     * Gets or sets the Email address.  
     */
    email : string;

    /**
     * Gets or sets the address.  
     */
    address : string;

    /**
     * Gets or sets the brokerage.  
     */
    brokerage : string;

    /**
     * Gets or sets the subscription for this party  
     */
    subscription : SubscriptionModel;

    /**
     * Gets or sets the roles that this party fulfills  
     */
    roles : any[];

    /**
     * Gets or sets the banner that this party has subscribed  
     */
    banners : BannerModel[];

    /**
     * Gets or sets the party type.  
     */
    partyType : PartyType;
}
