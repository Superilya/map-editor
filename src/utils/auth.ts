class Auth {
    private key = 'uuid';

    get uuid(): string | null {
        return localStorage.getItem(this.key);
    }

    set uuid(token: string | null) {
        if (!token) {
            localStorage.removeItem(this.key);
        }

        localStorage.setItem(this.key, token || '');
    }
}

export const auth = new Auth();
