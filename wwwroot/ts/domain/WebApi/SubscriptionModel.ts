import { TransactionModel } from "./TransactionModel";
// SubscriptionModel

/**
 * Subscription Model  
 */
export class SubscriptionModel
{
    /**
     * Gets or sets the guid for the subscription  
     */
    id : string;

    /**
     * Gets or sets the start date of the subscription  
     */
    startDate : Date;

    /**
     * Gets or sets the end date of the subscription  
     */
    endDate : Date;

    /**
     * Gets or sets the transactions .  
     */
    transactions : TransactionModel[];

    /**
     * Gets or sets the balance of free credits after the last  
     * transaction  
     */
    freeBalance : number;

    /**
     * Gets or sets the balance of bonus credits after the last  
     * transaction  
     */
    bonusBalance : number;

    /**
     * Gets or sets the balance of regular credits after the last  
     * transaction  
     */
    regularBalance : number;
}
