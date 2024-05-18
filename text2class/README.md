# RASA Language Model Tuning Classificator

## Описание классов

Вернет один из следующих классов:
```yaml
  - porno
  - bad_words
  - danger
  - aggression
  - adds
  - sect
  - drugs
  - lgbt
  - normal
```


## Deploy using Docker-Compose

```bash
docker-compose up -d
```

## Deploy in local

- Python 3.9.19

```bash
pip install rasa
```

```bash
rasa train
```

Will be Run on API `localhost:5005`

```bash
rasa run --enable-api --cors "*"
```

## Dirs

`data` - Содержит файлы для обучения модели

`data/ulu.yml` - Намериния и примеры для них

`data/rules.yml` - Правила которые бот всегда должен учитывать (никакие другие действия бот делать не будет)

`data/stories.yml` - Истории взаимодействия с ботом как примеры для работы? Бот следит за историей переписки и ориентируется по истории в этом файле.

---

`config.yml` - Параметры бота

`credentials.yml` - Конфигурация внешних сервисов

`domain.yml` - Входные данные для обучения бота

`endpoints.yml` - Конечные точки

---

`actions/actions.py` - Слкассы действий которые выполняются и результат их отправляются чат-боту

---

## Процесс создания намерения

1. в файле `domain.yml` в поле `intents` регистрируем новое название намерения (например `weather`).
2. В файле `data/nlu.yml` создаем новую запись:

```yaml
- intent: weather
  examples: |
    - how is the weather today ?
    - what is the weather
    - tell me the weather
    - weather
```

3. В файле `data/stories.yml` создаем новую сюжетную линию

```yaml
- story: tell weather
  steps:
    - intent: weather
    - action: utter_weather
```

4. В файле `domain.yml` в поле `responses` определим возврат текста

```yaml
responses:
  utter_weather:
    - text: "The weather is great today"
```

5. Запуск обучения

```bash
rasa train
```

6. Запуск обученного бота

```bash
rasa shell
```

## Использование LLM
> Очень полезно чтобы удалить намерения там где в них нет необходимости.

Использование LLM позволяет не указывать намерения переписки и сразу писать истории в `data/stories.yml`:

```yaml
- story: tell weather
  steps:
    - user: "what is the weather today"
    - action: utter_weather
```

Требуется включить часть конвейера в файле `config.yml`:

```yaml
pipeline:
  - name: WhitespaceTokenizer
  - name: RegexFeaturizer
  - name: LexicalSyntacticFeaturizer
  - name: CountVectorsFeaturizer
  - name: CountVectorsFeaturizer
    analyzer: char_wb
    min_ngram: 1
    max_ngram: 4
  - name: DIETClassifier
    epochs: 100
```

## Регистрация действий для чат-бота

В файле `domain.yml` создаем запись:

```yaml
slots:
  number:
    type: text
    influence_conversation: false
    mappings:
      - type: from_entity
        entity: number
  age:
    type: text
    influence_conversation: false
    mappings:
      - type: from_entity
        entity: number
  
entities:
  - number
  - age
```

В файле `data/nlu.yml` указываем обучающие данные

```yaml
intents:
  - questions
```

```yaml
responses:
  utter_ask_age:
    - text: "what is your age ?"

  utter_ask_number:
    - text: "Enter your phone number !"
```

```yaml
- intent: questions
  examples: |
    - I'm am [27](number) years old
    - My age is [16](number)
    - My phone number is [1234567890](number)
    - This is my phone number [5678995432](number)
```

В файле `data/stories.yml` создаем поле:

```yaml
- story: ask question
    - intent: questions
    - action: utter_ask_age
```

В файле `data/rules.yml' создаем запись:

```yaml
- rule: rule for questions
  steps:
    - intent: greet
    - action: utter_greet
    - intent: question_form
    - active_loop: question_form
```

В файле `domains.yml` указываем запись:

```yaml
forms:
  question_form:
     requested_slots:
      - age
      - number
```

1. В файле `endpoints.yml` указываем

