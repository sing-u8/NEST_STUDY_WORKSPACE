export interface SocialAuthPort {
	validate(provider: string, accessToken: string): Promise<{
		socialId: string;
		email: string;
		name?: string;
	}>;
}
