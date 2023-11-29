import { injectable } from 'inversify';
import entryExitSchema, {
  IEntryExitModel
} from '@shared-infra/persistence/mongo/models/EntryExitModel';
import { BaseRepository } from '@shared-infra/persistence/mongo/BaseRepository';
import { IEntryExitRepository } from '../../domain/repository/IEntryExitRepository';

@injectable()
export class EntryExitRepository
  extends BaseRepository<IEntryExitModel>
  implements IEntryExitRepository
{

  constructor() {
    super('entry_exit', entryExitSchema);
  }

}