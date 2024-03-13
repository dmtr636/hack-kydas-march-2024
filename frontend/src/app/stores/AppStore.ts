import { MatrixStore } from "src/features/matrix/stores/MatrixStore";
import { UserStore } from "src/features/user/stores/UserStore.ts";
import { MatrixDataStore } from "src/features/matrixdata/stores/MatrixDataStore.tsx";
import { JournalStore } from "src/features/journal/stores/journalStore";
import { MatrixDataStore2 } from "src/features/matrixdata/stores/MatrixDataStore copy";
import { MatrixDataStore3 } from "src/features/matrixdata/stores/MatrixDataStore copy 2";
import { MatrixDataStore4 } from "src/features/matrixdata/stores/MatrixDataStore copy 3";

export const store = {
    user: new UserStore(),
    matrix: new MatrixStore(),
    matrixData: new MatrixDataStore(),
    matrixData2: new MatrixDataStore2(),
    matrixData3: new MatrixDataStore3(),
    matrixData4: new MatrixDataStore4(),

    journal: new JournalStore()
};
