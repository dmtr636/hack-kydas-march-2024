package app.core.exceptions;

import java.util.Map;

public class RelatedObjectNotFoundException extends ApiException {
    public RelatedObjectNotFoundException(String fieldName) {
        this.setData(Map.of(fieldName, "NotFound"));
    }
}
