package dev.justinmartz.guitartech.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@GetMapping("setups/sorted")
	public List<Setup> getSortedSetupsOfLoggedInUser(Principal principal, HttpServletResponse response) {
		User user = userServ.getLoggedInUser(principal.getName());
		
		if (user != null) {
			response.setStatus(200);
			return setupServ.findAllSorted(user.getId());
		} else {
			response.setStatus(404);
			return null;
		}
	}
	
	@GetMapping("setups/tunings/{tuningId}")
	public List<Setup> getSetupsByTuning(@PathVariable int tuningId, Principal principal, HttpServletResponse response) {
		User user = userServ.getLoggedInUser(principal.getName());
		
		if (user != null) {
			response.setStatus(200);
			return setupServ.findByTuningAndUser(tuningId, user.getId());
		} else {
			response.setStatus(404);
			return null;
		}	
	}
	
	@PostMapping("setups")
	public Setup createNewSetup(Principal principal, @RequestBody Setup setup, HttpServletResponse response, HttpServletRequest request) {
		Setup newSetup = setupServ.createNewSetup(setup, principal.getName());
		if (newSetup == null) {
			response.setStatus(400);
		} else {
			response.setStatus(201);
			StringBuffer url = request.getRequestURL().append("/" + newSetup.getId());
			response.setHeader("Location", url.toString());
		}
		
		return newSetup;
	}
}
