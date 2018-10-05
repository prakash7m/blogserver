import { injectable } from "inversify";

import { Subscriber, ISubscriberModel } from "../models/SubscriberModel";

/**
 * Subscriber service: Basic subscriber operations on the database
 *
 * @export
 * @class SubscriberService
 */
@injectable()
export class SubscriberService {
  /**
   * Creates a new subscriber in the database
   *
   * @param {SubscriberModel} { email, name, subscribed }
   * @returns {Promise<ISubscriberModel[]>}
   * @memberof SubscriberService
   */
  async create({ email, name, subscribed }: ISubscriberModel): Promise<ISubscriberModel> {
    return await Subscriber.create({ email, name, subscribed });
  }

  /**
   * Retrieves the list of subscribers in the database
   *
   * @param {number} [page]
   * @returns {Promise<ISubscriberModel[][]>}
   * @memberof SubscriberService
   */
  async list(page?: number): Promise<ISubscriberModel[]> {
    return await Subscriber.find({}, {_id: true, name: true, email: true, subscribed: true, created: true, updated: true});
  }

  /**
   * Fetches the subscriber information by id
   *
   * @param {string} id
   * @returns {Promise<ISubscriberModel | null>}
   * @memberof SubscriberService
   */
  async fetch(id: string): Promise<ISubscriberModel | null> {
    return await Subscriber.findById(id);
  }

  /**
   * Updates the subscriber on db by id
   *
   * @param {string} id
   * @param {SubscriberUpdateModel} { email, subscribername }
   * @returns {Promise<ISubscriberModel | null>}
   * @memberof SubscriberService
   */
  async update(id: string, { email, name, subscribed }: ISubscriberModel): Promise<ISubscriberModel | null> {
    return await Subscriber.findByIdAndUpdate(id, { email, name, subscribed, updated: Date.now() }, { new: true });
  }

  /**
   * Remove subscriber from db by id
   *
   * @param {string} id
   * @returns {(Promise<ISubscriberModel | null>)}
   * @memberof SubscriberService
   */
  async remove(id: string): Promise<ISubscriberModel | null> {
    return await Subscriber.findByIdAndRemove(id);
  }
}
