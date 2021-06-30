import { Types } from 'mongoose';

export default (
  model: any,
  id: string | Types.ObjectId | string[]
): Promise<boolean> => {
  return new Promise<boolean>((resolve: any) => {
    model.findOne({ _id: id }, (_err: Error, result: any) => {
      if ((Array.isArray(id) && id.length === 0) || result) {
        return resolve(true);
      }
      return resolve(false);
    });
  });
};
