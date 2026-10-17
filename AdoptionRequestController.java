package com.pawhome.controller;

import com.pawhome.model.AdoptionRequest;
import com.pawhome.repository.AdoptionRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "*")
public class AdoptionRequestController {

    @Autowired
    private AdoptionRequestRepository requestRepository;

    @GetMapping
    public List<AdoptionRequest> getAllRequests() {
        return requestRepository.findAll();
    }

    @PostMapping
    public AdoptionRequest createRequest(@RequestBody AdoptionRequest request) {
        request.setStatus("PENDING");
        return requestRepository.save(request);
    }

    @PutMapping("/{id}/status")
    public AdoptionRequest updateStatus(@PathVariable Long id, @RequestParam String status) {
        AdoptionRequest req = requestRepository.findById(id).orElseThrow();
        req.setStatus(status);
        return requestRepository.save(req);
    }
}
