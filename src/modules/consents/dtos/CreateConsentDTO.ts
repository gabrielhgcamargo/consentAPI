export interface CreateConsentDTO {
    loggedUser: string,
    businessEntity: string,
    permissions: object,
    expirationDateTime: string,
    transactionFromDateTime: string,
    transactionToDateTime: string
}