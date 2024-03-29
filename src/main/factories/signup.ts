import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AddAccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeSignUpController = (): SignUpController => {
  const salt = 12

  const bcryptAdapter = new BcryptAdapter(salt)

  const addAccountMongoRepository = new AddAccountMongoRepository()

  const emailValidator = new EmailValidatorAdapter()
  const addAccount = new DbAddAccount(bcryptAdapter, addAccountMongoRepository)

  return new SignUpController(emailValidator, addAccount)
}
