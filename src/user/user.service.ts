import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find({});
  }

  async findById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async existsByUsername(username: string) {
    return await this.userRepository.existsBy({ username });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({id});
    if(!user) throw new NotFoundException("User not found");
    if( await this.userRepository.existsBy({updateUserDto.username}) && updateUserDto.username !== user.username)) throw new BadRequestException("username already in use");
    
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(updateUserDto.password, salt);

    user = {
            ...user,
            username = updateUserDto.username,
             email = user.email,
            password = hashedPassword,
            };

    return await this.userRepository.save(user);// `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
