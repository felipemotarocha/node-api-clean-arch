import { AddAccountModel } from '../../../domain/usecases/add-account'
import { Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub {
    async encrypt(value: string) {
      return 'hashed_password'
    }
  }

  return new EncrypterStub()
}

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypterStub()
  const sut = new DbAddAccount(encrypterStub)

  return { sut, encrypterStub }
}

describe('DbAddAccount Usecase', () => {
  test('should call Encrypter with correct password', () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    const accountData: AddAccountModel = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }

    sut.add(accountData)

    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error())),
      )

    const accountData: AddAccountModel = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }

    const promise = sut.add(accountData)

    await expect(promise).rejects.toThrow()
  })
})
