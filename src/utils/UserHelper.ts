export class UserHelper {
    static generateRandomUser() {
        const timestamp = Date.now();
        return {
            username: `testuser_${timestamp}`,
            password: `Password@${timestamp}`
        };
    }
}
