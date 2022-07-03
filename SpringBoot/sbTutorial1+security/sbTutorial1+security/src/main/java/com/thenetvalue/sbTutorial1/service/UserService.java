package com.thenetvalue.sbTutorial1.service;

import com.thenetvalue.sbTutorial1.dao.UserDAO;
import com.thenetvalue.sbTutorial1.dao.UserRepositoryDAO;
import com.thenetvalue.sbTutorial1.model.Ruolo;
import com.thenetvalue.sbTutorial1.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.thenetvalue.sbTutorial1.dao.InMemoryUserDAO;

import java.util.List;

@Service
public class UserService {
    UserRepositoryDAO userDAO;
    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    public UserService(@Qualifier("dbUserDAO") UserRepositoryDAO userDAO) {
        this.userDAO = userDAO;
    }

    public User addUser(String name, String surname, String username, String password) {
        User user = new User();
        user.setName(name);
        user.setSurname(surname);
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(Ruolo.ROLE_USER.name());
        user.setAuthorities(Ruolo.ROLE_USER.getAuthorities());
        user.setEnabled(true);
        userDAO.save(user);
        return user;
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
