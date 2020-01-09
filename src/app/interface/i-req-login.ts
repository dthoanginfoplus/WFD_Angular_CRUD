import {Iuser} from './iuser';

export interface IReqLogin {
  auth?: string;
  token?: string;
  dataUser?: Iuser;
}
