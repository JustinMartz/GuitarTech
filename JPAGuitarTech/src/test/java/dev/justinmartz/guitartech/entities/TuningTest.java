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

class TuningTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Tuning tuning;

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
		tuning = em.find(Tuning.class, 2);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		tuning = null;
	}

	@Test
	void test_Tuning_basic_mappings() {
		assertNotNull(tuning);
		assertEquals("Eb Standard", tuning.getName());
	}
	
	@Test
	void test_Tuning_relational_mappings() {
		assertNotNull(tuning.getSetups());
		assertTrue(tuning.getSetups().size() > 0);
		assertNotNull(tuning.getGuitars());
		assertTrue(tuning.getGuitars().size() > 0);
	}

}
