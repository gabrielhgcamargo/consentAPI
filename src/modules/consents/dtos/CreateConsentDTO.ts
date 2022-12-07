type Permission = {};
export interface CreateConsentDTO {
  loggedUser: {
    CPF: string;
    name: string;
    email: string;
    password: string;
  };
  businessEntity: {
    CNPJ: string;
    name: string;
  };
  permissions: any;
  expirationDateTime: string;
  transactionFromDateTime: string;
  transactionToDateTime: string;
}
