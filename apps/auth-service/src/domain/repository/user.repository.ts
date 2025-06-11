/**
 * UserRepository Interface
 * 사용자 도메인 리포지토리 인터페이스
 */
import type { User, SocialType } from '../entity/user.entity';
import type { Email } from '../vo/email.vo';

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  findBySocial(type: SocialType, socialId: string): Promise<User | null>;
  save(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}
