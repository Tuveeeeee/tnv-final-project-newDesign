package com.thenetvalue.sbTutorial1.repository;

import com.thenetvalue.sbTutorial1.model.User;

import java.util.*;

public class InMemoryDatabase {
    static Map<Integer, User> users = new HashMap<>();
    //         keys     values
    static int lastIndex = 0;

    public static int addUser(User user) {
        user.setId(++lastIndex);
        users.put(user.getId(), user);
        return 1;
    }

    public static User getUserById(int id) {
        return users.get(id);
    }

    public static List<User> getUsers() {
        Collection<User> usersValues = users.values();
        /*ArrayList<User> usersResult = new ArrayList<>();
        for (User user : usersValues) {
            usersResult.add(user);
        }
        return usersResult;*/
        return new ArrayList<>(usersValues);
    }

    public static int updateUser(int id, User user) {
        /*User userRecuperato = users.get(id);
        userRecuperato.setUsername(user.getUsername());
        userRecuperato.setPassword(user.getPassword());*/
        user.setId(id);
        users.put(id, user);
        return 1;
    }

    public static int deleteUser(int id) {
        //users.put(id, null);
        users.remove(id);
        return 1;
    }
}
