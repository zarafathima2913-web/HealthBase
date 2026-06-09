import { fileDB } from '../utils/fileDB.js';

export const onboardUser = async (req, res) => {
  try {
    const user = fileDB.findUserById(req.user.id);

    if (user) {
      // Keep existing data, update with new onboarding data
      const updatedUser = fileDB.saveUser({
        ...user,
        ...req.body,
        isOnboarded: true,
      });

      const { password, ...safeUser } = updatedUser;
      res.status(200).json(safeUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPatients = async (req, res) => {
  try {
    const patients = fileDB.getUsers().filter(u => u.role === 'user');
    const safePatients = patients.map(({ password, ...safe }) => safe);
    res.status(200).json(safePatients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = fileDB.findUserById(req.params.id);
    if (user) {
      const { password, ...safeUser } = user;
      res.status(200).json(safeUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
