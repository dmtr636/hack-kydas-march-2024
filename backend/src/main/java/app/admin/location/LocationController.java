package app.admin.location;

import app.core.exceptions.ApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static app.core.endpoints.Endpoints.LOCATIONS_ENDPOINT;

@RestController
@RequiredArgsConstructor
@RequestMapping(LOCATIONS_ENDPOINT)
public class LocationController {
    private final LocationService service;

    @GetMapping()
    public List<Location> getALl() throws ApiException {
        return service.getAll();
    }
}
