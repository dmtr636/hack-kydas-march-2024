package app.segment;

import app.core.exceptions.ApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static app.core.endpoints.Endpoints.SEGMENTS_ENDPOINT;

@RestController
@RequiredArgsConstructor
@RequestMapping(SEGMENTS_ENDPOINT)
public class SegmentController {
    private final SegmentService service;

    @GetMapping()
    public List<Integer> getALl() throws ApiException {
        return service.getSegmentIds();
    }
}
