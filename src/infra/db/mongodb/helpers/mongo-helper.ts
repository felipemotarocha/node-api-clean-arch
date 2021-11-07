import { Collection, MongoClient } from 'mongodb'
import { AccountModel } from '../../../../domain/models/account'

export const MongoHelper = {
  client: (null as unknown) as MongoClient,

  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  },

  async disconnect(): Promise<void> {
    await this.client.close()
  },

  getCollection<T>(name: string): Collection<T> {
    return this.client.db().collection(name)
  },

  map<T>(collection: any): T {
    const { _id, ...collectionWithoutId } = collection
    return {
      id: _id,
      ...collectionWithoutId,
    }
  },
}
