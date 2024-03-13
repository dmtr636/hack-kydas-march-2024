package app.admin.data;

import app.core.exceptions.ApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

@Component
@RequiredArgsConstructor
public class DataInitializer implements ApplicationRunner {
    private final DataSource dataSource;
    private final UserInitializer userInitializer;
    private final MatrixInitializer matrixInitializer;
    private final CategoryInitializer categoryInitializer;
    private final LocationInitializer locationInitializer;
    private final UserSecurityContextInitializer userSecurityContextInitializer;

    @Override
    public void run(ApplicationArguments args) throws ApiException {
        if (!userInitializer.isAdminUserExists()) {
            initializeData();
        }
    }

    private void initializeData() throws ApiException {
        userInitializer.createUsers();
        userSecurityContextInitializer.authenticateUserById(1L);
        matrixInitializer.createMatrices();
        matrixInitializer.activateMatrices();
        initializeMatrixData();
        categoryInitializer.createCategories();
        locationInitializer.createLocations();
    }

    private void initializeMatrixData() {
        ResourceDatabasePopulator resourceDatabasePopulator = new ResourceDatabasePopulator(
            false,
            false,
            "UTF-8",
            new ClassPathResource("sql/baseline_matrix_1.sql"),
            new ClassPathResource("sql/baseline_matrix_2.sql"),
            new ClassPathResource("sql/baseline_matrix_3.sql"),
            new ClassPathResource("sql/discount_matrix_1.sql"),
            new ClassPathResource("sql/discount_matrix_2.sql"),
            new ClassPathResource("sql/discount_matrix_3.sql")
        );
        resourceDatabasePopulator.execute(dataSource);
    }
}
