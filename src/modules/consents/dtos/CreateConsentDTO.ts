type Permission = {};
export interface CreateConsentDTO {
  loggedUser: {
    CPF: string;
  };
  businessEntity: {
    CNPJ: string;
  };
  permissions: any;
  expirationDateTime: string;
  transactionFromDateTime: string;
  transactionToDateTime: string;
}
