/* eslint-disable  @typescript-eslint/no-explicit-any */
import { injectable, unmanaged } from 'inversify';
import { Model, model, Schema, UpdateQuery } from 'mongoose';
import { AppError } from '@core/error/AppError';
import { left, right } from '@core/result/Result';
import { IBaseRepository } from './IBaseRepository';

@injectable()
export abstract class BaseRepository<IModelEntity>
  implements IBaseRepository<IModelEntity>
{
  private model: Model<IModelEntity>;

  constructor(@unmanaged() modelName: string, @unmanaged() schema: Schema) {
    this.model = model<IModelEntity>(modelName, schema);
  }

  async create(entity: IModelEntity): Promise<any> {
    try {
      const dataToSave = new this.model(entity);
      const result = await dataToSave.save();

      return right(result);
    } catch (err: unknown) {
      return left(new AppError.DatabaseError(err));
    }
  }

  async update(_id: string, entity: UpdateQuery<any>): Promise<any> {
    const result = await this.model.findOneAndUpdate({ _id }, entity, {
      new: true
    });
    return Promise.resolve(result);
  }

  async updateStudent(_id: number, data: any): Promise<any> {
    try {
      const result = await this.model.findOneAndUpdate(
        { roll_number: _id, inTime: null },
        { inTime: data },
        {
          new: true
        }
      );
      return right(result);
    } catch (err: unknown) {
      return left(new AppError.DatabaseError(err));
    }
  }

  async updateSecurity(_id: string, data: string): Promise<any> {
    try {
      const result = await this.model.findOneAndUpdate(
        { guardContact: _id },
        { otp: data },
        {
          new: true
        }
      );
      return right(result);
    } catch (err: unknown) {
      return left(new AppError.DatabaseError(err));
    }
  }

  async get(id: number): Promise<any> {
    try {
      const result = await this.model.find({ roll_number: id });
      return right(result);
    } catch (err: unknown) {
      return left(new AppError.DatabaseError(err));
    }
  }

  async getEntry(id: number): Promise<any> {
    try {
      const result = await this.model.find({ roll_number: id, inTime: null });
      return right(result);
    } catch (err: unknown) {
      return left(new AppError.DatabaseError(err));
    }
  }

  async getLateStudents(): Promise<any> {
    try {
      const result = await this.model.find({ inTime: null });
      return right(result);
    } catch (err: unknown) {
      return left(new AppError.DatabaseError(err));
    }
  }

  async getSecurityGuard(id: string): Promise<any> {
    try {
      const result = await this.model.find({ guardId: id });
      return right(result);
    } catch (err: unknown) {
      return left(new AppError.DatabaseError(err));
    }
  }
}
