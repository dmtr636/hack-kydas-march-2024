package app.admin.location;

import app.admin.category.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final LocationRepository repository;

    public List<Location> getAll() {
        return repository.findAll();
    }

    public Optional<Location> getById(Long id) {
        return repository.findById(id);
    }

    public List<Location> getChildLocations(Long locationId) {
        return repository.findAllByParentLocationId(locationId);
    }

    public Location create(Location location) {
        return repository.save(location);
    }

    public List<Location> createAll(List<Location> locations) {
        return repository.saveAll(locations);
    }
}
