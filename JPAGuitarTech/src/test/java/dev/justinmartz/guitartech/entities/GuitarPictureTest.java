package dev.justinmartz.guitartech.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class GuitarPictureTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private GuitarPicture guitarPicture;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPAGuitarTech");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		guitarPicture = em.find(GuitarPicture.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		guitarPicture = null;
	}

	@Test
	void test_GuitarPicture_basic_mappings() {
		assertNotNull(guitarPicture);
		assertEquals("lpc.jpg", guitarPicture.getFilename());
	}
	
	@Test
	void test_GuitarPicture_relational_mappings() {
		assertNotNull(guitarPicture.getGuitar());
		assertEquals("Les Paul Custom", guitarPicture.getGuitar().getModel());
	}

}
