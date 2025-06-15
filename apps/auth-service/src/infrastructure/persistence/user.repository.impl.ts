import type { UserRepository } from '@authService/domain/repository/user.repository';
import type { User, SocialType } from '@authService/domain/entity/user.entity';
import type { Email } from '@authService/domain/vo/email.vo';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async findById(id: string): Promise<User | null> {
    return this.users.find(u => u.id === id) ?? null;
  }

  async findByEmail(email: Email): Promise<User | null> {
    return this.users.find(u => u.email.value === email.value) ?? null;
  }

  async findBySocial(type: SocialType, socialId: string): Promise<User | null> {
    return this.users.find(u => u.socialType === type && u.socialId === socialId) ?? null;
  }

  async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async update(user: User): Promise<User> {
    const idx = this.users.findIndex(u => u.id === user.id);
    if (idx >= 0) this.users[idx] = user;
    return user;
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter(u => u.id !== id);
  }
}
