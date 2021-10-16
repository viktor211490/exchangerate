# exchangerate


Разработать веб-приложение на spring framework.

Веб-приложение должно содержать RESTful интерфейс, пользовательского веб-интерфейс. Пользовательский веб-интерфейс должен состоять из одной страницы – страница, показывающая курсы валют, взятые с БД. Страница с курсами валют — выводит валюты и курсы выбранной валюты на текущую дату и несколько предыдущих.

Для хранения данных можно использовать любую базу данных (например, msSQL). Необходимо ее заполнить валютами и значениями за несколько дней.

То есть пользователь заходит на веб-интерфейс, кликает на желаемую валюту и ему подгружаются данные из БД на текущую дату и несколько предыдущих.

Желательно написать несколько юнит тестов.

Рекомендуемые фреймворки: spring mvc, spring boot, spring data.

Много деталей в ТЗ нет, потому что задание творческое, любые детали можете додумывать сами. С реальными заказчиками бывает так же — они не всегда точно знают, что хотят «сделайте демку — а мы посмотрим».

Что хотелось бы увидеть:
* чистый код, покрытый юнит тестами,
* архитектуру, разделенную на слои,
* хороший стиль ОО-проектирования, принципы SOLID.

На веб-интерфейсе красота не требуется, можно просто в таблицу выводить всю информацию.

# В реализован REST клиент. Добавлен веб клиент (Angular CLI). Помимо реализованной главной страницы добавленна страница администатора для редактирования данных.
Даные в базе обновля.тся по средством обращения клинта к АПИ центрабанка, последующей обработки и отправки массива данных на beckend в виде готовой коллекции моделей для сохранения в базе данных.

#Тесты не были реализованы (пока что(
