package app.price;

import app.core.exceptions.ApiException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static app.core.endpoints.Endpoints.MATRICES_ENDPOINT;
import static app.core.endpoints.Endpoints.PRICE_ENDPOINT;

@RequiredArgsConstructor
@RestController
@RequestMapping(PRICE_ENDPOINT)
public class PriceController {
    private final PriceService service;

    @GetMapping
    public PriceResponse getPrice(@Valid @RequestBody PriceRequest request) throws ApiException {
        return service.getPrice(request);
    }
}
