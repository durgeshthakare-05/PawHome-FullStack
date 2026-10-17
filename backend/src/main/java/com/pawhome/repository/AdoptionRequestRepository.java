package com.pawhome.repository;

import com.pawhome.model.AdoptionRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AdoptionRequestRepository extends JpaRepository<AdoptionRequest, Long> {
    List<AdoptionRequest> findByApplicantName(String applicantName);
    List<AdoptionRequest> findByStatus(String status);
}
