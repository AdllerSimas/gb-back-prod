import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';

export default interface IUsersRepository {

  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;

  findById(id: string): Promise<User | undefined>;

  findByEmail(email: string): Promise<User | undefined>;

  //should be created a DTO because receive more than one response
  create(data: ICreateUserDTO): Promise<User>;

  save(user: User): Promise<User>;
}
