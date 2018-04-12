// TransactionModel

/**
 * Subscription Model  
 */
export class TransactionModel
{
    /**
     * Gets or sets the transaction guid (alternate key for passing  
     * across internet)  
     */
    guid : string;

    /**
     * Gets or sets the start date of the subscription  
     */
    trandate : Date;

    /**
     * Gets or sets the start date of the subscription  
     */
    trantype : string;

    /**
     * Gets or sets the description of the transaction  
     */
    description : string;

    /**
     * Gets or sets the amount of free credits affected by the  
     * transaction  
     */
    freeAmount : number;

    /**
     * Gets or sets the amount of bonus credits affected by the  
     * transaction  
     */
    bonusAmount : number;

    /**
     * Gets or sets the amount of regular credits affected by the  
     * transaction  
     */
    regularAmount : number;
}
