import { HttpError } from '../middleware/errorHandler';
import User from '../models/Users';

class UserService {
    async getUserById(userId: string) {
        try {
            const user = await User.findById(userId)
            if (!user) {
                throw new HttpError('User not found', 404)
            }

            return { username: user.username, firstname: user.firstname, lastname: user.lastname, email: user.email, _id: user.id };
        } catch (error) {
            throw error
        }
    }
}

export default new UserService();