package com.thenetvalue.sbTutorial1.controller;

import com.thenetvalue.sbTutorial1.model.User;
import com.thenetvalue.sbTutorial1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin ("http://localhost:4200")
@RequestMapping("/")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    //CRUD operations (Create Read Update Delete)

    @PostMapping("/register/}")
    public User register(@RequestBody User newUser){
        return userService.register(newUser);
    }

   /*
   @PostMapping("/")
    public String addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") int identificativo) {
        return userService.getUser(identificativo);
    } */ 
/* */
    //@GetMapping("/username/{username}/password/{password}")

    @GetMapping("/username/{username}")
    public Iterable<User> getUserByUsernameContains(@PathVariable("username") String username) {
        return userService.getUserByUsernameContains(username);
    }

    @GetMapping("/username/{username}/password/{password}")
    public String getUserByUsernameAndPassword(@PathVariable("username") String username, 
                                                        @PathVariable("password") String Password) {
        return userService.getUserByUsernameAndPassowrd(username, Password);
    }

    //allUsers - GET
    @GetMapping("/")
    public Iterable<User> allUsers() {
        return userService.allUsers();
    }

    //updateUser - PUT
    @PutMapping("/{id}")
    public String updateUser(@PathVariable("id") int id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    //deleteUser - DELETE
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable("id") int id) {
        return userService.deleteUser(id);
    }
}
