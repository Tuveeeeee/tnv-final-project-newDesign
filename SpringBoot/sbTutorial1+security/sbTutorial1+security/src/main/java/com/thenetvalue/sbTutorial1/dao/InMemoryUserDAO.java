package com.thenetvalue.sbTutorial1.dao;

import com.thenetvalue.sbTutorial1.model.User;
import com.thenetvalue.sbTutorial1.repository.InMemoryDatabase;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("firstUserDAO")
public class InMemoryUserDAO implements UserDAO {

    @Override
    public int addUser(User user) {
        return InMemoryDatabase.addUser(user);
    }

    @Override
    public User getUserById(int id) {
        return InMemoryDatabase.getUserById(id);
    }

    public int addEmail(int id, String email) {
        User user = InMemoryDatabase.getUserById(id);
        user.setEmail(email);
        return 1;
    }

    @Override
    public List<User> allUsers() {
        return InMemoryDatabase.getUsers();
    }

    @Override
    public int updateUser(int id, User user) {
        return InMemoryDatabase.updateUser(id, user);
    }

    @Override
    public int deleteUser(int id) {
        return InMemoryDatabase.deleteUser(id);
    }

    @Override
    public int register(User newUser){
        return InMemoryDatabase.addUser(newUser);
    }
}
