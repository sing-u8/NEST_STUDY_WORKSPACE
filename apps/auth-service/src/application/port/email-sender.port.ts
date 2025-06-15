export interface EmailSender {
	send(email: string, code: string): Promise<void>;
}
