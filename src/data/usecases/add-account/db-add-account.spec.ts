import { AddAccountModel } from '../../../domain/usecases/add-account'
import { DbAddAccount } from './db-add-account'

describe('DbAddAccount Usecase', () => {
  test('should call Encrypter with correct password', () => {
    class EncrypterStub {
      async encrypt(value: string) {
        return 'hashed_password'
      }
    }

    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)

    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    const accountData: AddAccountModel = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }

    sut.add(accountData)

    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
