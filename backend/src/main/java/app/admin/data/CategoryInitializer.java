package app.admin.data;

import app.admin.category.Category;
import app.admin.category.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@RequiredArgsConstructor
public class CategoryInitializer {

    private final CategoryService service;

    public void createCategories() {
        Map<String, List<String>> map = new LinkedHashMap<>();
        map.put("Бытовая электроника", List.of("Товары для компьютера", "Фототехника", "Телефоны", "Планшеты и электронные книги", "Оргтехника и расходники", "Ноутбуки", "Настольные компьютеры", "Игры, приставки и программы", "Аудио и видео"));
        map.put("Готовый бизнес и оборудование", List.of("Готовый бизнес", "Оборудование для бизнеса"));
        map.put("Для дома и дачи", List.of("Мебель и интерьер", "Ремонт и строительство", "Продукты питания", "Растения", "Бытовая техника", "Посуда и товары для кухни"));
        map.put("Животные", List.of("Другие животные", "Товары для животных", "Птицы", "Аквариум", "Кошки", "Собаки"));
        map.put("Личные вещи", List.of("Детская одежда и обувь", "Одежда, обувь, аксессуары", "Товары для детей и игрушки", "Часы и украшения", "Красота и здоровье"));
        map.put("Недвижимость", List.of("Недвижимость за рубежом", "Квартиры", "Коммерческая недвижимость", "Гаражи и машиноместа", "Земельные участки", "Дома, дачи, коттеджи", "Комнаты"));
        map.put("Работа", List.of("Резюме", "Вакансии"));
        map.put("Транспорт", List.of("Автомобили", "Запчасти и аксессуары", "Грузовики и спецтехника", "Водный транспорт", "Мотоциклы и мототехника"));
        map.put("Услуги", List.of("Предложения услуг"));
        map.put("Хобби и отдых", List.of("Охота и рыбалка", "Спорт и отдых", "Коллекционирование", "Книги и журналы", "Велосипеды", "Музыкальные инструменты", "Билеты и путешествия"));

        List<Category> categories = new ArrayList<>();
        categories.add(new Category().setName("Все категории"));

        map.forEach((key, value) -> {
            categories.add(new Category().setName(key).setParentCategoryId(1L));
            Long parentId = (long) categories.size();
            value.forEach(category -> {
                categories.add(new Category().setName(category).setParentCategoryId(parentId));
            });
        });

        service.createAll(categories);
    }
}
