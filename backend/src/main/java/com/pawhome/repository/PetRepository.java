package com.pawhome.repository;

import com.pawhome.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findByStatus(String status);
    List<Pet> findByType(String type);
}
