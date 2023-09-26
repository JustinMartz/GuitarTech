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

class GuitarTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Guitar guitar;

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
		guitar = em.find(Guitar.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		guitar = null;
	}

	@Test
	void test_Guitar_basic_mappings() {
		assertNotNull(guitar);
		assertEquals("Gibson", guitar.getMake());
		assertTrue(!guitar.isDeleted());
	}
	
	@Test
	void test_Guitar_relational_mappings() {
		assertNotNull(guitar.getOwner());
		assertEquals("jmartz", guitar.getOwner().getUsername());	
	}

}
