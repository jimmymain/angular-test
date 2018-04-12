import { Coordinates } from "./Coordinates";
// BannerModel

/**
 * An enquiry model.  
 */
export class BannerModel
{
    /**
     * Gets or sets the guid of the enquiry  
     */
    guid : string;

    /**
     * Gets or sets the creation time stamp  
     */
    createdOn : Date;

    /**
     * Gets or sets the location (Center) of the search  
     */
    location : Coordinates;

    /**
     * Gets or sets the friendly name of the location (City /  
     * Suburb)  
     */
    locationName : string;

    /**
     * Gets or sets the search radius (in Km)  
     */
    radius : number;

    /**
     * Gets or sets the enumeration of property types. Posible  
     * values are All, Office, Industrial, etc.  
     */
    bannerType : string;
}
