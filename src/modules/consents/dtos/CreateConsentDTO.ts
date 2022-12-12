type Permission = {};
export interface CreateConsentDTO {
  loggedUser: {
    CPF: string;
  };
  businessEntity: {
    CNPJ: string;
  };
  permissions: string[];
  expirationDateTime: string;
  transactionFromDateTime: string;
  transactionToDateTime: string;
}
