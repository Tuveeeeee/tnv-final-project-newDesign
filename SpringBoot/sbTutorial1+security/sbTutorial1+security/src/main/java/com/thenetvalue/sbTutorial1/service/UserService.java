package com.thenetvalue.sbTutorial1.service;

import com.thenetvalue.sbTutorial1.dao.UserDAO;
import com.thenetvalue.sbTutorial1.dao.UserRepositoryDAO;
import com.thenetvalue.sbTutorial1.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    UserRepositoryDAO userDAO;

    @Autowired
    public UserService(@Qualifier("dbUserDAO") UserRepositoryDAO userDAO) {
        this.userDAO = userDAO;
    }

    public String addUser(User user) {
        User resultUser = userDAO.save(user);
        if (resultUser != null) {
            return "Utente salvato correttamente";
        } else {
            return "Errore nel salvataggio dell'utente";
        }
    }

    public User getUser(int id) {
        return userDAO.findById(id).get();
    }

    public Iterable<User> getUserByUsernameContains(String username) {
        return userDAO.findByUsernameLike(username);
    }

    public String getUserByUsernameAndPassowrd (String username, String password) {
        List<User> user = userDAO.findByUsernameAndPassword(username, password);

        if (user == null){
            return "Utente non trovato";
        } else {
            return "Utente trovato";
        }
    }

    public Iterable<User> allUsers() {
        return userDAO.findAll();
    }

    public String updateUser(int id, User user) {
        User userRecuperato = userDAO.findById(id).get();
        if (userRecuperato == null) {
            return "Utente non trovato!";
        }
        user.setId(id);
        User resultUser = userDAO.save(user);
        if (resultUser != null) {
            return "Utente aggiornato correttamente";
        } else {
            return "Errore nell'aggiornamento dell'utente";
        }
    }

    public String deleteUser(int id) {
        User userRecuperato = userDAO.findById(id).get();
        if (userRecuperato == null) {
            return "Utente non trovato!";
        } else {
            userDAO.delete(userRecuperato);
            return "Utente cancellato correttamente";
        }
    }

    public User register (User newUser){
        return userDAO.save(newUser);
    }
}
