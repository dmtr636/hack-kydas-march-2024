package app.core.exceptions;

import java.util.Map;

public class ThrottledException extends ApiException {

    public ThrottledException(int retryDelaySeconds) {
        this.setData(Map.of("retryDelaySeconds", retryDelaySeconds));
    }

}
