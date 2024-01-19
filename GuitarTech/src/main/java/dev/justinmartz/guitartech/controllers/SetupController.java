package dev.justinmartz.guitartech.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.justinmartz.guitartech.entities.Setup;
import dev.justinmartz.guitartech.entities.User;

import dev.justinmartz.guitartech.services.SetupService;
import dev.justinmartz.guitartech.services.UserService;

@CrossOrigin({"*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class SetupController {
	@Autowired
	private SetupService setupServ;
	
	@Autowired
	private UserService userServ;
	
	@GetMapping("setups")
	public List<Setup> getAllSetups() {
		// Admin functionality. Should use principal to check if user role is admin first.
		// TODO Set headers
		return setupServ.findAllSetups();
	}
	
	@GetMapping("setups/users")
	public List<Setup> getAllSetupsOfLoggedInUser(Principal principal, HttpServletResponse response) {
		User user = userServ.getLoggedInUser(principal.getName());
		
		if (user != null) {
			response.setStatus(200);
			return setupServ.findAllByUserNotDeleted(user.getId());			
		} else {
			response.setStatus(404);
			return null;
		}
	}
}
